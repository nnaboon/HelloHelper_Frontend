/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { PrimaryButton } from './Button';
import { PenRequestSvg } from 'components/Svg/PenRequestSvg';
import { Text } from 'components/Text';
import { Button, Form, Input, message, Select, Upload, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { CATEGORY } from 'data/category';
import { GoogleMapContent } from 'components/GoogleMap/GoogleMap';
import { EditableTagGroup } from 'components/Tag/Hashtag';
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
import { LARGE_DESKTOP_WIDTH } from '../../styles/variables';

interface PostRequestButtonProps {
  setProvides?: (provide: any) => void;
  setRequests?: (request: any) => void;
  buttonText: string;
  type?: string;
}

const RequestButton = styled(PrimaryButton)`
  width: max-content;
  min-width: 180px;
  height: 50px;
  padding: 0 20px;
  font-weight: 500;
  font-size: 18px;

  ${mediaQueryLargeDesktop} {
    height: 44px;
    font-size: 16px;
  }

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

export const PostRequestButton = ({
  setProvides,
  setRequests,
  buttonText,
  type
}: PostRequestButtonProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isProvide, setIsProvide] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [form] = Form.useForm();
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);
  const isLargeDesktop = useMedia(`(max-width: ${LARGE_DESKTOP_WIDTH}px)`);

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
    const data = {
      userId: window.localStorage.getItem('id'),
      title: value.title,
      location: {
        name: location.name ?? location.formatted_address,
        latitude: location.geometry.location.lat(),
        longitude: location.geometry.location.lng()
      },
      communityId:
        pathname.split('/')[1] === 'community'
          ? pathname.split('/')[2]
          : undefined,
      description: value.message ?? '',
      serviceCharge: Number(value.maxServiceCharge),
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
            })
              .then((res) => {
                if (setProvides) {
                  setProvides((prev) => [...prev, res.data]);
                }

                message.success('สำเร็จ');
              })
              .catch((error) => {
                message.error('ไม่สามารถโพสต์ขอความช่วยเหลือได้2');
              });
          })
        : uploadRequestImage(formData).then((res) => {
            addRequest({
              price: Number(value.maxPrice),
              imageUrl: res.data,
              number: Number(value.number),
              ...data
            })
              .then((res) => {
                if (setRequests) {
                  setRequests((prev) => [...prev, res.data]);
                }

                message.success('สำเร็จ');
              })
              .catch((error) => {
                message.error('ไม่สามารถโพสต์ขอความช่วยเหลือได้2');
              });
          });
    } catch (e) {
      message.error('ไม่สามารถโพสต์ขอความช่วยเหลือได้1');
    } finally {
      setIsSubmitting(false);
      setIsModalVisible(false);
      setImageUrl('');
      setTags([]);
      form.resetFields();
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
    setImageUrl('');
    setTags([]);
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
        afterClose={() => {
          form.resetFields();
        }}
        footer={null}
        maskClosable={false}
        centered
        css={css`
          width: 45% !important;

          .ant-modal-content {
            height: 100%;
          }

          ${mediaQueryLargeDesktop} {
            width: 750px !important;

            .ant-modal-content {
              height: 800px;
            }
          }

          ${mediaQueryTablet} {
            width: 650px !important;
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
          <Text
            marginTop="10px"
            css={css`
              font-size: 2rem;
              margin-bottom: 35px;

              ${mediaQueryLargeDesktop} {
                font-size: 24px;
                margin-bottom: 20px;
              }
            `}
          >
            ฟอร์มความช่วยเหลือ
          </Text>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ type: type }}
            onFinish={onFinish}
            css={css`
              .ant-form-item-label > label {
                font-size: 1.5rem;
              }

              .ant-form-item {
                margin-bottom: 35px;
              }

              .ant-select-single:not(.ant-select-customize-input)
                .ant-select-selector {
                height: 40px;
              }

              .ant-upload.ant-upload-select-picture-card {
                width: 170px;
                height: 170px;
              }

              .ant-col-16 {
                max-width: 100%;
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
                  font-size: 16px;
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
                defaultValue={type}
                onSelect={(e) =>
                  e === 'provide' ? setIsProvide(true) : setIsProvide(false)
                }
                css={css`
                  height: 50px;
                  font-size: 24px;

                  ${mediaQueryLargeDesktop} {
                    height: 40px;
                    font-size: 14px;
                  }
                `}
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
                style={{ borderRadius: '12px' }}
                css={css`
                  height: 50px;
                  font-size: 1.5rem;

                  ${mediaQueryLargeDesktop} {
                    height: 40px;
                    font-size: 14px;
                  }
                `}
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
                width={
                  isSmallTablet ? '100%' : isLargeDesktop ? '470px' : '100%'
                }
                height={isLargeDesktop ? '300px' : '460px'}
              />
            </Form.Item>
            <Form.Item name="message" label="ข้อความ">
              <Input.TextArea
                placeholder="ข้อความ"
                style={{ borderRadius: '12px' }}
                css={css`
                  font-size: 1.5rem;

                  ${mediaQueryLargeDesktop} {
                    font-size: 14px;
                  }
                `}
              />
            </Form.Item>
            <Form.Item
              name="maxPrice"
              label="ราคาสินค้าสูงสุด"
              rules={
                !isProvide
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
                disabled={isProvide}
                type="number"
                min="0"
                placeholder="ขอบเขตราคาสินค้า"
                style={{ borderRadius: '12px' }}
                css={css`
                  height: 50px;
                  font-size: 1.5rem;

                  ${mediaQueryLargeDesktop} {
                    height: 40px;
                    font-size: 14px;
                  }
                `}
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
                style={{ borderRadius: '12px' }}
                css={css`
                  height: 50px;
                  font-size: 1.5rem;

                  ${mediaQueryLargeDesktop} {
                    height: 40px;
                    font-size: 14px;
                  }
                `}
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
                !isProvide
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
                disabled={isProvide}
                type="number"
                min="0"
                placeholder="จำนวนสินค้า"
                style={{ borderRadius: '12px' }}
                css={css`
                  height: 50px;
                  font-size: 1.5rem;

                  ${mediaQueryLargeDesktop} {
                    height: 40px;
                    font-size: 14px;
                  }
                `}
              />
            </Form.Item>
            <Form.Item
              name="payment"
              label="วิธีการชำระเงิน"
              rules={[{ required: true, message: 'กรุณากรอกวิธีการชำระเงิน' }]}
            >
              <Input
                placeholder="วิธีการชำระเงิน"
                style={{ borderRadius: '12px' }}
                css={css`
                  height: 50px;
                  font-size: 1.5rem;

                  ${mediaQueryLargeDesktop} {
                    height: 40px;
                    font-size: 14px;
                  }
                `}
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
                placeholder="เลือกหมวดหมู่ความช่วยเหลือ"
                css={css`
                  height: 50px;
                  font-size: 1.5rem;

                  ${mediaQueryLargeDesktop} {
                    height: 40px;
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
              <EditableTagGroup
                tags={tags}
                setTags={setTags}
                css={css`
                  font-size: 1.5rem;
                `}
              />
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
                {isProvide || type === 'provide'
                  ? 'ให้ความช่วยเหลือ'
                  : 'ขอความช่วยเหลือ'}
              </Button>
            </div>
          </Form>
        </RegisterLocationFormSection>
      </Modal>
    </React.Fragment>
  );
};
