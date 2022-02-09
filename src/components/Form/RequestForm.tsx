/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import {
  Button,
  Form,
  Input,
  message,
  Tooltip,
  Select,
  Upload,
  Modal
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { CATEGORY } from 'data/category';
import { RequestFormBody } from './const';
import { GoogleMapContent } from 'components/GoogleMap/GoogleMap';
import { InfoSvg } from 'components/Svg/InfoSvg';
import Flex from 'components/Flex/Flex';
import { EditableTagGroup } from 'components/Tag/Hashtag';
import { useUpdateProvide } from 'hooks/provide/useUpdateProvide';
import { useUpdateRequest } from 'hooks/request/useUpdateRequest';
import {
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQueryLargeDesktop,
  useMedia,
  MOBILE_WIDTH
} from 'styles/variables';
import { useUploadProvideImage } from 'hooks/provide/useUploadProvideImage';
import { useUploadRequestImage } from 'hooks/request/useUploadRequestImage';

interface RequestFormModalProps {
  visible?: boolean;
  onClose?: () => void;
  requestData?: any;
}

const RegisterLocationFormSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.75rem 2.75rem 1.5rem 2.75rem;
  position: relative;
  height: 100%;
  overflow: scroll;
`;

export const RequestFormModal = ({
  visible,
  onClose,
  requestData
}: RequestFormModalProps) => {
  const [tags, setTags] = useState<string[]>(requestData.hashtag ?? []);

  const [location, setLocation] = useState<any>();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const [form] = Form.useForm();

  const { execute: uploadProvideImage } = useUploadProvideImage();
  const { execute: uploadRequestImage } = useUploadRequestImage();

  const {
    data: provide,
    loading: provideLoading,
    execute: updateProvide
  } = useUpdateProvide();

  const {
    data: request,
    loading: requestLoading,
    execute: updateRequest
  } = useUpdateRequest();

  const reset = () => {
    form.resetFields();
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    setImageUrl(requestData.imageUrl);
    if (requestData.type === 'provide') {
      form.setFieldsValue({
        type: requestData.type,
        title: requestData.title,
        location: requestData.location,
        message: requestData.message,
        serviceCharge: requestData.serviceCharge,
        payment: requestData.payment,
        category: requestData.category,
        hashtag: requestData.hashtag,
        image: requestData.imageUrl
      });
    } else {
      form.setFieldsValue({
        type: requestData.type,
        title: requestData.title,
        location: requestData.location,
        message: requestData.message,
        price: requestData.price,
        serviceCharge: requestData.serviceCharge,
        payment: requestData.payment,
        category: requestData.category,
        hashtag: requestData.hashtag,
        image: requestData.imageUrl,
        number: requestData.number
      });
    }
  }, [requestData, form]);

  useEffect(() => {
    form.setFieldsValue({
      location: location,
      hashtag: tags
    });
  }, [form, location, tags]);

  const onFinish = async (value) => {
    setIsSubmitting(true);

    const data = {
      userId: window.localStorage.getItem('id'),
      title: value.title,
      location: {
        name: location ? location.name : requestData.name,
        lat: location ? location.geometry.location.lat() : requestData.latitude,
        lng: location ? location.geometry.location.lng() : requestData.longitude
      },
      description: value.message,
      serviceCharge: value.serviceCharge,
      payment: value.payment,
      category: value.category,
      hashtag: tags
    };

    var formData = new FormData();
    formData.append('img', value.image.file.originFileObj);
    try {
      requestData.type === 'provide'
        ? uploadProvideImage(formData).then((res) => {
            updateProvide(requestData.provideId, {
              ...data,
              imageUrl: res.data
            });
          })
        : uploadRequestImage(formData).then((res) => {
            updateRequest(requestData.requestId, {
              ...data,
              number: value.number,
              price: value.price,
              imageUrl: res.data
            });
          });
    } catch (e) {
      message.error('ไม่สามารถโพสต์ขอความช่วยเหลือได้');
    } finally {
      form.resetFields();
      setIsSubmitting(false);
      message.success('สำเร็จ');
      onClose();
    }
  };

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = (info) => {
    // Change condition
    if (info.file.status === 'done') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'uploading') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageUrl(imageUrl);
      });
    }
  };

  useEffect(() => {
    if (requestData) {
      setLocation(requestData.location);
    }
  }, [requestData]);

  return (
    <Modal
      visible={visible}
      onCancel={() => {
        onClose();
        form.resetFields();
      }}
      width={isMobile ? '80%' : '800px'}
      afterClose={reset}
      footer={null}
      maskClosable={false}
      centered
      css={css`
        .ant-modal-content {
          height: 950px;

          ${mediaQueryLargeDesktop} {
            height: 850px;
          }

          ${mediaQueryMobile} {
            height: 480px;
          }
        }
      `}
    >
      <RegisterLocationFormSection>
        <Global
          styles={css`
            .ant-col-8 {
              max-width: 24%;
            }

            .ant-form-item-control-input-content {
              display: flex;
              align-items: center;
            }
            .ant-modal-body {
              height: 100%;
            }
          `}
        />
        <Text fontSize="24px" marginTop="10px" marginBottom="20px">
          ขอความช่วยเหลือ
        </Text>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{
            type: requestData.type,
            title: requestData.title,
            location: requestData.location,
            message: requestData.description,
            price: requestData.price,
            serviceCharge: requestData.serviceCharge,
            payment: requestData.payment,
            category: requestData.category,
            hashtag: requestData.hashtag,
            image: requestData.imageUrl,
            number: requestData.number
          }}
          css={css`
            .ant-form-item-control-input {
              width: 460px;

              ${mediaQueryMobile} {
                width: 100%;
              }
            }
          `}
        >
          <Form.Item
            name="type"
            label="รูปแบบความช่วยเหลือ"
            rules={[
              {
                required: true,
                message: 'กรุณากรอกรูปแบบความช่วยเหลือ'
              }
            ]}
          >
            <Select disabled defaultValue={requestData.type}>
              <Select.Option value="provide">ให้ความช่วยเหลือ</Select.Option>
              <Select.Option value="request">ขอความช่วยเหลือ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="title"
            label="ชื่อ"
            rules={[
              {
                required: true,
                message: 'กรุณากรอกชื่อความช่วยเหลือที่คุณต้องการ'
              }
            ]}
          >
            <Input
              defaultValue={requestData.title}
              placeholder="ชื่อ"
              style={{ height: '40px', borderRadius: '12px' }}
            />
          </Form.Item>

          <Form.Item
            name="location"
            label="สถานที่"
            rules={[
              {
                required: true,
                message: 'กรุณากรอกสถานที่ที่คุณสามารถให้ความช่วยเหลือได้'
              }
            ]}
          >
            <GoogleMapContent
              requestLocation={requestData.location}
              setRequestLocation={setLocation}
            />
          </Form.Item>
          <div
            style={{
              color: '#606060',
              position: 'relative',
              left: '24%',
              width: '470px',
              marginBottom: '20px'
            }}
          >
            {location?.formatted_address ?? requestData.location.name}
          </div>
          <Form.Item name="message" label="ข้อความ">
            <Input.TextArea
              placeholder="ข้อความ"
              defaultValue={requestData.description}
              style={{ borderRadius: '12px' }}
            />
          </Form.Item>
          {requestData.type === 'request' ? (
            <Form.Item
              name="number"
              label="จำนวน"
              rules={[
                {
                  required: true,
                  message: 'กรุณากำหนดจำนวนสินค้า'
                }
              ]}
            >
              <Input
                defaultValue={requestData.number}
                placeholder="จำนวนสินค้า"
                min="0"
                type="number"
                style={{ height: '40px', borderRadius: '12px' }}
              />
            </Form.Item>
          ) : null}

          {requestData.type === 'request' ? (
            <Form.Item
              name="price"
              label="ราคาสินค้าสูงสุด"
              rules={[
                {
                  required: true,
                  message: 'กรุณากำหนดขอบเขตราคาสินค้าสูงสุดที่คุณสามารถจ่ายได้'
                }
              ]}
            >
              <Input
                defaultValue={
                  requestData.price
                    ? `${requestData.price} บาท`
                    : requestData.price
                }
                type="number"
                min="0"
                placeholder="ขอบเขตราคาสินค้า"
                style={{ height: '40px', borderRadius: '12px' }}
              />
            </Form.Item>
          ) : null}

          {/* <Flex justify="center" itemAlign="center"> */}
          <Form.Item
            name="serviceCharge"
            label="อัตราค่าบริการสูงสุด"
            rules={[
              {
                required: true,
                message:
                  'กรุณากำหนดขอบเขตอัตราค่าบริการสูงสุดที่คุณสามารถจ่ายได้'
              }
            ]}
          >
            <Input
              type="number"
              min="0"
              defaultValue={
                requestData.serviceCharge
                  ? `${requestData.serviceCharge} บาท`
                  : requestData.serviceCharge
              }
              placeholder="ขอบเขตราคาค่าบริการ"
              style={{ height: '40px', borderRadius: '12px' }}
            />
          </Form.Item>
          {/* <Tooltip title="กำหนดราคาสูงสุดของความช่วยเหลือครั้งนี้ที่คุณพึงพอใจจะจ่าย ให้กับผู้ให้ความช่วยเหลือ">
              <InfoSvg
                css={css`
                  margin-left: 10px;
                  margin-top: -20px;
                `}
              />
            </Tooltip> */}
          {/* </Flex> */}

          <Form.Item
            name="payment"
            label="วิธีการชำระเงิน"
            rules={[{ required: true, message: 'กรุณากรอกวิธีการชำระเงิน' }]}
          >
            <Input
              defaultValue={requestData.payment}
              placeholder="วิธีการชำระเงิน"
              style={{ height: '40px', borderRadius: '12px' }}
            />
          </Form.Item>
          <Form.Item
            name="category"
            label="หมวดหมู่"
            rules={[
              {
                required: true,
                message: 'กรุณาเลือกหมวดหมู่ของความช่วยเหลือ'
              }
            ]}
          >
            <Select
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
            >
              {CATEGORY.map(({ id, name }) => (
                <Select.Option key={id} value={id}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="hashtag"
            label="แฮชแท็ก"
            rules={[
              { required: !Boolean(tags.length), message: 'กรุณากรอกแฮชแท็ก' }
            ]}
          >
            <EditableTagGroup tags={tags} setTags={setTags} />
          </Form.Item>
          <Form.Item
            name="image"
            label="รูปภาพ"
            rules={[{ required: true, message: 'กรุณาใส่รูปภาพ' }]}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <div
            css={css`
              width: 100%;
              position: relative;
            `}
          >
            <Button
              type="primary"
              htmlType="submit"
              css={css`
                width: 170px;
                height: 40px;
                box-sizing: border-box;
                background: #ee6400;
                border-radius: 9px;
                border: 0;
                right: 44px;
                color: #ffff;
                font-size: 16px;
                position: absolute;

                &:hover {
                  background: #ee6400;
                }

                ${mediaQueryTablet} {
                  width: 150px;
                  right: 0;
                }
                ${mediaQueryMobile} {
                  width: 144px;
                }
              `}
            >
              ขอความช่วยเหลือ
            </Button>
          </div>
        </Form>
      </RegisterLocationFormSection>
    </Modal>
  );
};
