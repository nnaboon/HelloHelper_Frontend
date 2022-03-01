/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { Button, Form, Input, message, Select, Upload, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { CATEGORY } from 'data/category';
import { GoogleMapContent } from 'components/GoogleMap/GoogleMap';
import Flex from 'components/Flex/Flex';
import { PrimaryButton } from 'components/Button/Button';
import { InputForm } from 'components/Input/InputForm';
import { EditableTagGroup } from 'components/Tag/Hashtag';
import { useUpdateProvide } from 'hooks/provide/useUpdateProvide';
import { useUpdateRequest } from 'hooks/request/useUpdateRequest';
import {
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQueryLargeDesktop,
  useMedia,
  MOBILE_WIDTH,
  SMALL_TABLET_WIDTH,
  LARGE_DESKTOP_WIDTH
} from 'styles/variables';
import { useUploadProvideImage } from 'hooks/provide/useUploadProvideImage';
import { useUploadRequestImage } from 'hooks/request/useUploadRequestImage';

interface RequestFormModalProps {
  visible?: boolean;
  onClose?: () => void;
  setUpdateData?: (data: any) => void;
  requestData?: any;
}

const RegisterLocationFormSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.75rem 2.75rem 1.5rem 2.75rem;
  position: relative;
  height: 100%;
  overflow: scroll;

  ${mediaQueryLargeDesktop} {
    padding: 1.75rem 1.2rem 1.5rem 1.2rem;
  }

  ${mediaQueryMobile} {
    padding: 0;
  }
`;

export const RequestFormModal = ({
  visible,
  onClose,
  setUpdateData,
  requestData
}: RequestFormModalProps) => {
  const [tags, setTags] = useState<string[]>(requestData.hashtag ?? []);

  const [location, setLocation] = useState<any>();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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

  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);
  const isLargeDesktop = useMedia(`(max-width: ${LARGE_DESKTOP_WIDTH}px)`);

  const [form] = Form.useForm();

  const reset = () => {
    form.resetFields();
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>อัปโหลด</div>
    </div>
  );

  useEffect(() => {
    if (requestData.type === 'provide') {
      form.setFieldsValue({
        type: requestData.type,
        title: requestData.title,
        location: requestData.location,
        message: requestData.message,
        price: requestData.price,
        serviceCharge: requestData.serviceCharge,
        payment: requestData.payment,
        category: requestData.category,
        hashtag: requestData.hashtag
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
        name: location
          ? location.name ?? location.formatted_address
          : requestData.location.name,
        latitude: location
          ? location.name !== requestData.location.name
            ? location.geometry.location.lat()
            : requestData.location.latitude
          : requestData.location.latitude,
        longitude: location
          ? location.name !== requestData.location.name
            ? location.geometry.location.lng()
            : requestData.location.longitude
          : requestData.location.longitude
      },
      description: value.message,
      price: Number(value.price),
      serviceCharge: Number(value.serviceCharge),
      payment: value.payment,
      category: value.category,
      hashtag: tags
    };

    try {
      if (requestData.type === 'provide') {
        if (value.image) {
          var formData = new FormData();
          formData.append('img', value.image.file.originFileObj);
          uploadProvideImage(formData).then((res) => {
            updateProvide(requestData.provideId, {
              ...data,
              imageUrl: res.data
            }).then((res) => {
              setUpdateData(res.data);
            });
          });
        } else {
          updateProvide(requestData.provideId, data).then((res) => {
            setUpdateData(res.data);
          });
        }
      } else {
        if (value.image) {
          var formData = new FormData();
          formData.append('img', value.image.file.originFileObj);
          uploadRequestImage(formData).then((res) => {
            updateRequest(requestData.requestId, {
              ...data,
              number: Number(value.number),
              imageUrl: res.data
            }).then((res) => {
              setUpdateData(res.data);
            });
          });
        } else {
          updateRequest(requestData.requestId, {
            ...data,
            number: Number(value.number)
          }).then((res) => {
            setUpdateData(res.data);
          });
        }
      }
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
      afterClose={reset}
      footer={null}
      maskClosable={false}
      centered
      css={css`
        width: 38% !important;

        .ant-modal-content {
          height: 1000px;
        }

        ${mediaQueryLargeDesktop} {
          width: 720px !important;

          .ant-modal-content {
            height: 700px;
          }
        }

        ${mediaQueryTablet} {
          width: 550px !important;

          .ant-modal-content {
            height: 750px;
          }
        }

        ${mediaQueryMobile} {
          width: 80% !important;

          .ant-modal-content {
            height: 520px;
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

            .ant-col-16 {
              max-width: 100%;
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
        <Text
          marginTop="10px"
          marginBottom="20px"
          css={css`
            font-size: 2rem;
            margin-bottom: 35px;

            ${mediaQueryLargeDesktop} {
              font-size: 24px;
              margin-bottom: 20px;
            }
          `}
        >
          {requestData?.type === 'request'
            ? 'ขอความช่วยเหลือ'
            : 'ให้ความช่วยเหลือ'}
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
            image: requestData.image,
            number: requestData.number
          }}
          css={css`
            .ant-form-item-label > label {
              font-size: 18px;
            }

            .ant-form-item {
              margin-bottom: 32px;
            }

            .ant-upload.ant-upload-select-picture-card {
              width: 170px;
              height: 170px;
            }

            ${mediaQueryLargeDesktop} {
              font-size: 24px;

              .ant-select-single:not(.ant-select-customize-input)
                .ant-select-selector {
                height: 32px;
              }

              .ant-form-item {
                margin-bottom: 24px;
              }

              .ant-form-item-control-input {
                width: 460px;
              }

              .ant-form-item-label > label {
                font-size: 14px;
              }

              .ant-upload.ant-upload-select-picture-card {
                width: 104px;
                height: 104px;
              }
            }

            ${mediaQueryTablet} {
              .ant-form-item-control-input {
                width: 100%;
              }
            }

            ${mediaQueryMobile} {
              width: 100%;
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
            <Select
              disabled
              defaultValue={requestData.type}
              css={css`
                font-size: 16px;

                ${mediaQueryLargeDesktop} {
                  font-size: 14px;
                }
              `}
            >
              <Select.Option
                value="provide"
                css={css`
                  font-size: 16px;

                  ${mediaQueryLargeDesktop} {
                    font-size: 14px;
                  }
                `}
              >
                ให้ความช่วยเหลือ
              </Select.Option>
              <Select.Option
                value="request"
                css={css`
                  font-size: 16px;

                  ${mediaQueryLargeDesktop} {
                    font-size: 14px;
                  }
                `}
              >
                ขอความช่วยเหลือ
              </Select.Option>
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
            <InputForm
              // defaultValue={requestData.title}
              placeholder="ชื่อ"
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
              width={isSmallTablet ? '100%' : isLargeDesktop ? '470px' : '100%'}
              height={isLargeDesktop ? '300px' : '460px'}
              requestLocation={{
                lat: requestData.location.latitude,
                lng: requestData.location.longitude
              }}
              setRequestLocation={setLocation}
            />
          </Form.Item>
          <Form.Item name="message" label="ข้อความ">
            <Input.TextArea
              placeholder="ข้อความ"
              // defaultValue={requestData.description}
              style={{ borderRadius: '12px' }}
              css={css`
                font-size: 16px;

                ${mediaQueryLargeDesktop} {
                  font-size: 14px;
                }
              `}
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
              <InputForm
                // defaultValue={requestData.number}
                placeholder="จำนวนสินค้า"
                min="0"
                type="number"
              />
            </Form.Item>
          ) : null}

          <Form.Item
            name="price"
            label="ราคาสินค้าสูงสุด"
            tooltip="กำหนดราคาสินค้าสูงสุดที่คุณต้องการหรือที่สามารถจ่ายได้"
            rules={[
              {
                required: true,
                message: 'กรุณากำหนดขอบเขตราคาสินค้าสูงสุดที่คุณสามารถจ่ายได้'
              }
            ]}
          >
            <InputForm
              // defaultValue={
              //   requestData.price
              //     ? `${requestData.price} บาท`
              //     : requestData.price
              // }
              type="number"
              min="0"
              placeholder="ขอบเขตราคาสินค้า"
            />
          </Form.Item>

          <Form.Item
            name="serviceCharge"
            label="ค่าบริการสูงสุด"
            tooltip="กำหนดอัตราค่าบริการสูงสุดที่คุณต้องการหรือที่สามารถจ่ายได้"
            rules={[
              {
                required: true,
                message:
                  'กรุณากำหนดขอบเขตอัตราค่าบริการสูงสุดที่คุณสามารถจ่ายได้'
              }
            ]}
          >
            <InputForm
              type="number"
              min="0"
              // defaultValue={
              //   requestData.serviceCharge
              //     ? `${requestData.serviceCharge} บาท`
              //     : requestData.serviceCharge
              // }
              placeholder="ขอบเขตราคาค่าบริการ"
            />
          </Form.Item>

          <Form.Item
            name="payment"
            label="วิธีการชำระเงิน"
            rules={[{ required: true, message: 'กรุณากรอกวิธีการชำระเงิน' }]}
          >
            <InputForm
              defaultValue={requestData.payment}
              placeholder="วิธีการชำระเงิน"
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
              placeholder="เลือกหมวดหมู่"
              css={css`
                font-size: 16px;

                ${mediaQueryLargeDesktop} {
                  font-size: 14px;
                }
              `}
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
          <Form.Item name="image" label="รูปภาพ">
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
              display: flex;
              justify-content: end;
              position: relative;
            `}
          >
            <PrimaryButton
              type="primary"
              htmlType="submit"
              css={css`
                width: 140px;
                height: 40px;

                border: 0;
                right: 20px;

                ${mediaQueryTablet} {
                  width: 140px;
                }
                ${mediaQueryMobile} {
                  width: 140px;
                }
              `}
            >
              {requestData?.type === 'request'
                ? 'ขอความช่วยเหลือ'
                : 'ให้ความช่วยเหลือ'}
            </PrimaryButton>
          </div>
        </Form>
      </RegisterLocationFormSection>
    </Modal>
  );
};
