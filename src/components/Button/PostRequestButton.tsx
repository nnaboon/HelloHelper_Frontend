/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { PrimaryButton } from './Button';
import { PenRequestSvg } from 'components/Svg/PenRequestSvg';
import { Text } from 'components/Text';
import { Button, Form, Input, message, Select, Upload, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { CATEGORY } from 'data/category';
import { GoogleMapContent } from 'components/GoogleMap/GoogleMap';
import { EditableTagGroup } from 'components/Tag/Hashtag';
import firebase from '../../firebase';
import {
  useMedia,
  MOBILE_WIDTH,
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQuerySmallTablet,
  mediaQueryLargeDesktop,
  SMALL_TABLET_WIDTH
} from 'styles/variables';
import { useAddProvide } from 'hooks/provide/useAddProvide';
import { useAddRequest } from 'hooks/request/useAddRequest';
import { useUploadProvideImage } from 'hooks/provide/useUploadProvideImage';
import { useUploadRequestImage } from 'hooks/request/useUploadRequestImage';

interface PostRequestButtonProps {
  buttonText: string;
}

const RequestButton = styled(PrimaryButton)`
  width: max-content;
  min-width: 180px;
  height: 44px;
  padding: 0 20px;
  font-weight: 500;
  font-size: 18px;

  &:hover {
    color: #ffff;
  }

  ${mediaQuerySmallTablet} {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    min-width: 50px;
    margin-top: -7px;
    padding: 0;
  }
`;

const RegisterLocationFormSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.75rem 2.75rem 1.5rem 2.75rem;
  position: relative;
  height: 100%;
  overflow: scroll;

  ${mediaQueryMobile} {
    padding: 0;
  }
`;

export const PostRequestButton = ({ buttonText }: PostRequestButtonProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [form] = Form.useForm();
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);

  const { pathname } = useLocation();

  const {
    data: provide,
    loading: provideLoading,
    execute: addProvide
  } = useAddProvide();
  const {
    data: request,
    loading: requestLoading,
    execute: addRequest
  } = useAddRequest();
  const { execute: uploadProvideImage } = useUploadProvideImage();
  const { execute: uploadRequestImage } = useUploadRequestImage();

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    if (location) {
      form.setFieldsValue({
        location: location.formatted_address,
        hashtag: tags
      });
    }
  }, [form, location, tags]);

  const onFinish = async (value) => {
    setIsSubmitting(true);
    const values = form.getFieldsValue();
    const data = {
      userId: window.localStorage.getItem('id'),
      title: value.title,
      location: {
        name: location.name,
        lat: location.geometry.location.lat(),
        lng: location.geometry.location.lng()
      },
      communityId:
        pathname.split('/')[1] === 'community'
          ? pathname.split('/')[2]
          : undefined,
      description: value.message ?? '',
      serviceCharge: value.maxServiceCharge,
      payment: value.payment,
      category: [value.category],
      hashtag: tags
    };

    var formData = new FormData();
    formData.append('img', value.image.file.originFileObj);
    try {
      value.type === 'provide'
        ? uploadProvideImage(formData).then((res) => {
            addProvide({
              ...data,
              imageUrl: res.data,
              rating: 0,
              provideSum: 0
            });
          })
        : uploadRequestImage(formData).then((res) => {
            addRequest({
              price: value.maxPrice,
              imageUrl: res.data,
              provideUserId: [''],
              number: value.number,
              ...data
            });
          });
    } catch (e) {
      message.error('ไม่สามารถโพสต์ขอความช่วยเหลือได้');
    } finally {
      setIsSubmitting(false);
      message.success('สำเร็จ');
      setIsModalVisible(false);
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

  const onModalOpen = () => {
    setIsModalVisible(false);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <React.Fragment>
      <RequestButton onClick={() => setIsModalVisible(true)}>
        <PenRequestSvg
          style={{ marginRight: isSmallTablet ? '0px' : '10px' }}
        />
        {!isSmallTablet && buttonText}
      </RequestButton>
      <Modal
        visible={isModalVisible}
        onOk={onModalOpen}
        onCancel={onModalClose}
        footer={null}
        width={isMobile ? '80%' : '800px'}
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

              .ant-menu-inline-collapsed-tooltip {
                visibility: hidden;
              }

              .ant-tooltip-placement-left {
                visibility: hidden;
              }
              .ant-tooltip,
              .ant-tooltip-placement-left,
              .ant-tooltip-placement-leftTop,
              .ant-tooltip-placement-leftBottom {
                visibility: hidden !important;
                display: none !important;
              }

              .ant-tooltip-inner {
                display: none !important;
                visibility: hidden !important;
              }
            `}
          />
          <Text fontSize="24px" marginTop="10px" marginBottom="20px">
            ขอความช่วยเหลือ
          </Text>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
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
              <Select
                onSelect={(e) =>
                  e === 'provide' ? setIsDisable(true) : setIsDisable(false)
                }
              >
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
                placeholder="ชื่อ"
                style={{ height: '40px', borderRadius: '12px' }}
              />
            </Form.Item>

            <Form.Item
              name="location"
              label="สถานที่"
              rules={[
                {
                  required: !location,
                  message: 'กรุณากรอกสถานที่ที่คุณสามารถให้ความช่วยเหลือได้'
                }
              ]}
            >
              <GoogleMapContent
                requestLocation={location}
                setRequestLocation={setLocation}
                width={isSmallTablet ? '100%' : '470px'}
              />
            </Form.Item>
            <Form.Item name="message" label="ข้อความ">
              <Input.TextArea
                placeholder="ข้อความ"
                style={{ borderRadius: '12px' }}
              />
            </Form.Item>
            <Form.Item
              name="maxPrice"
              label="ราคาสินค้าสูงสุด"
              rules={
                !isDisable
                  ? [
                      {
                        required: true,
                        message:
                          'กรุณากำหนดขอบเขตราคาสินค้าสูงสุดที่คุณสามารถจ่ายได้'
                      }
                    ]
                  : null
              }
            >
              <Input
                disabled={isDisable}
                type="number"
                min="0"
                placeholder="ขอบเขตราคาสินค้า"
                style={{ height: '40px', borderRadius: '12px' }}
              />
            </Form.Item>
            {/* <Flex justify="center" itemAlign="center"> */}
            <Form.Item
              name="maxServiceCharge"
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
                placeholder="ขอบเขตราคาค่าบริการ"
                type="number"
                min="0"
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
              name="number"
              label="จำนวน"
              rules={
                !isDisable
                  ? [
                      {
                        required: true,
                        message: 'กรุณากรอกจำนวนสินค้าที่ต้องการ'
                      }
                    ]
                  : null
              }
            >
              <Input
                disabled={isDisable}
                type="number"
                min="0"
                placeholder="จำนวนสินค้า"
                style={{ height: '40px', borderRadius: '12px' }}
              />
            </Form.Item>
            <Form.Item
              name="payment"
              label="วิธีการชำระเงิน"
              rules={[{ required: true, message: 'กรุณากรอกวิธีการชำระเงิน' }]}
            >
              <Input
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
                // onClick={() => {
                //   onFinish(form.getFieldsValue());
                // }}
              >
                ขอความช่วยเหลือ
              </Button>
            </div>
          </Form>
          {/* <Modal
            visible={afterStateModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            width={380}
            maskClosable={false}
            centered
            css={css`
              .ant-modal-content {
                height: 250px;
              }
            `}
          >
            {requestState ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}
              >
                <img
                  src={Correct}
                  alt="correct sign"
                  style={{ margin: '15px 0' }}
                />
                <Text fontSize="24px" fontWeight={500} marginY="6px">
                  สำเร็จ
                </Text>
                <Text
                  fontSize="16px"
                  fontWeight={500}
                  style={{ whiteSpace: 'pre-wrap' }}
                  textDecoration="center"
                  textAlign="center"
                >
                  ความช่วยเหลือจะถูกแจ้งเตือน {'\n'}ไปยังผู้ที่สามารถช่วยได้
                </Text>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}
              >
                <img
                  src={InCorrect}
                  alt="correct sign"
                  style={{ margin: '25px 0' }}
                />
                <Text fontSize="24px" fontWeight={500} marginY="6px">
                  บางสิ่งผิดพลาด
                </Text>
              </div>
            )}
          </Modal> */}
        </RegisterLocationFormSection>
      </Modal>
    </React.Fragment>
  );
};
