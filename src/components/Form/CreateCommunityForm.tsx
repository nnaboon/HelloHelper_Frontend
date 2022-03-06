/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button, Form, Input, Upload, message } from 'antd';
import { Text } from 'components/Text';
import { InputForm } from 'components/Input/InputForm';

import { useAddCommunity } from 'hooks/community/useAddCommunity';
import { useUpdateUser } from 'hooks/user/useUpdateUser';
import { useUploadUserImage } from 'hooks/user/useUploadUserImage';

import { userStore } from 'store/userStore';
import { GoogleMapContent } from 'components/GoogleMap/GoogleMap';

import DefaultImage from 'images/default.png';
import {
  LARGE_DESKTOP_WIDTH,
  mediaQueryMobile,
  mediaQueryLargeDesktop,
  useMedia
} from 'styles/variables';
import { logout } from 'features/logout/Logout';
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { PrimaryButton } from 'components/Button/Button';

interface CreateCommunityFormProps {
  setVisible: (visible: boolean) => void;
}

const CreateCommunityFormSection = styled.div`
  padding: 1.75rem 2.75rem 1.5rem 2.75rem;
  position: relative;
  height: 100%;

  ${mediaQueryMobile} {
    padding: 0;
  }
`;

export const CreateCommunityForm = ({
  setVisible
}: CreateCommunityFormProps) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(DefaultImage);
  const [location, setLocation] = useState<any>(null);
  const { me } = userStore;
  const {
    data: response,
    execute: addCommunity,
    error: addCommunityError
  } = useAddCommunity();
  const { execute: updateUser } = useUpdateUser();
  const { execute: uploadUserImage } = useUploadUserImage();

  const isLargeDesktop = useMedia(`(max-width: ${LARGE_DESKTOP_WIDTH}px)`);

  const history = useHistory();

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>อัปโหลด</div>
    </div>
  );
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

  const onFinish = async (value) => {
    setIsSubmitting(true);
    const data = {
      // communityCode: value.password,
      communityName: value.name,
      location: {
        name: location.name ?? location.formatted_address,
        latitude: location.geometry.location.lat(),
        longitude: location.geometry.location.lng()
      },
      description: value.description,
      userId: me?.userId
    };

    try {
      if (value.image) {
        var formData = new FormData();
        formData.append('img', value.image.file.originFileObj);

        uploadUserImage(formData).then((res) => {
          addCommunity({ ...data, imageUrl: res.data })
            .then((res) => {
              message.success('สำเร็จ');
              window.location.assign(`/community/${res.data}`);
              form.resetFields();
              setVisible(false);
            })
            .catch((error) => {
              if (error.response.data === 'Unauthorized') {
                logout();
              }
            });
        });
      } else {
        addCommunity(data)
          .then((res) => {
            message.success('สำเร็จ');
            window.location.assign(`/community/${res.data}`);
            form.resetFields();
            setVisible(false);
          })
          .catch((error) => {
            if (error.response.data === 'Unauthorized') {
              logout();
            }
          });
      }
    } catch (e) {
      message.error('ไม่สามารถโพสต์ขอความช่วยเหลือได้');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (location) {
      form.setFieldsValue({
        location: location.formatted_address
      });
    }
  }, [form, location]);

  return (
    <CreateCommunityFormSection>
      <Text
        marginTop="10px"
        css={css`
          font-size: 24px;
          margin-bottom: 15px;

          ${mediaQueryLargeDesktop} {
            font-size: 20px;
            margin-bottom: 10px;
          }
        `}
      >
        สร้างชุมชนความช่วยเหลือ
      </Text>
      <Text
        marginTop="10px"
        fontWeight={500}
        color="#F86800"
        css={css`
          font-size: 16px;
          margin-bottom: 25px;

          ${mediaQueryLargeDesktop} {
            font-size: 15px;
            margin-bottom: 20px;
          }

          ${mediaQueryMobile} {
            margin-bottom: 10px;
          }
        `}
      >
        คุณสามารถสร้างชุมชนความช่วยเหลือใหม่ได้แล้ว
      </Text>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        css={css`
          .ant-form-item-label > label {
            font-size: 1.5rem;
          }

          .ant-modal-body {
            height: 100%;
          }

          .ant-form-item {
            margin-bottom: 35px;
          }

          .ant-form-item-control-input {
            width: 100%;
          }

          .ant-col-16 {
            max-width: 100%;
          }

          .ant-input {
            height: 35px;
            width: 100%;
            font-size: 14px;
            line-height: 8.8;
          }

          .ant-form-item-control-input-content {
            height: 40px;
          }

          ${mediaQueryLargeDesktop} {
            font-size: 24px;

            .ant-select-single:not(.ant-select-customize-input)
              .ant-select-selector {
              height: 32px;
            }

            .ant-form-item-control-input-content {
              height: 35px;
            }

            .ant-form-item {
              margin-bottom: 24px;
            }

            .ant-form-item-control-input {
              width: 100%;
            }

            .ant-form-item-label > label {
              font-size: 16px;
            }

            .ant-upload.ant-upload-select-picture-card {
              width: 104px;
              height: 104px;
            }
          }

          ${mediaQueryMobile} {
            .ant-form-item-control-input {
              width: 100%;
            }
          }
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          `}
        >
          {' '}
          <img
            src={imageUrl}
            alt="user avatar"
            css={css`
              width: 85px;
              height: 85px;
              border-radius: 50%;
              margin-bottom: 15px;
              object-fit: cover;

              ${mediaQueryLargeDesktop} {
                width: 80px;
                height: 80px;
              }

              ${mediaQueryMobile} {
                width: 65px;
                height: 65px;
              }
            `}
          />
          <Form.Item name="image">
            <Upload
              name="avatar"
              className="avatar-uploader"
              showUploadList={false}
              onChange={handleChange}
              css={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              `}
            >
              <Button
                icon={<UploadOutlined />}
                css={css`
                  font-size: 12px;
                `}
              >
                เลือกรูป
              </Button>
            </Upload>
          </Form.Item>
        </div>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'กรุณากำหนกชื่อชุมชนความช่วยเหลือ'
            }
          ]}
        >
          <InputForm
            placeholder="ชื่อขุมชนความช่วยเหลือ"
            css={css`
              margin: 0;
              ${mediaQueryLargeDesktop} {
                border-radius: 8px;
              }
            `}
          />
        </Form.Item>
        <Form.Item name="description">
          <InputForm
            placeholder="คำอธิบาย"
            css={css`
              margin: 0;
              ${mediaQueryLargeDesktop} {
                border-radius: 8px;
              }
            `}
          />
        </Form.Item>{' '}
        <Form.Item
          name="location"
          rules={[
            {
              required: !location,
              message: 'กรุณากำหนดสถานที่ให้ความช่วยเหลือ'
            }
          ]}
        >
          <GoogleMapContent
            requestLocation={location}
            setRequestLocation={setLocation}
            width={'100%'}
            height={isLargeDesktop ? '240px' : '300px'}
          />
        </Form.Item>
        <div
          css={css`
            width: 100%;
          `}
        >
          <PrimaryButton
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            css={css`
              width: 140px;
              right: 0px;
              position: absolute;
              bottom: 10px;

              ${mediaQueryMobile} {
                width: 144px;
              }
            `}
          >
            ตกลง
          </PrimaryButton>
        </div>
      </Form>
    </CreateCommunityFormSection>
  );
};
