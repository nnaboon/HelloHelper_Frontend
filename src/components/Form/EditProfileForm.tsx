/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import { Text } from 'components/Text';
import { Button, Form, Input, message, Checkbox, Divider, Upload } from 'antd';
import { ABILITY } from 'data/ability';
import { GoogleMapContent } from 'components/GoogleMap/GoogleMap';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import {
  useMedia,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  SMALL_TABLET_WIDTH,
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryTablet
} from 'styles/variables';
import UserAvatar from 'images/avatar_user.png';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';

export const EditProfileForm = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(UserAvatar);
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
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
  const toggleChecked = (value) => {
    console.log(value.includes('ไม่สามารถให้ความช่วยเหลือได้'));
    setCheckedList(value);

    if (value.includes('ไม่สามารถให้ความช่วยเหลือได้')) {
      setCheckedList([]);
      value = ['ไม่สามารถให้ความช่วยเหลือได้'];
    }
  };

  const onFinish = async (value) => {
    setIsSubmitting(true);
    const data = {
      title: value.title,
      email: value.email,
      password: value.password,
      imageUrl: value.imageUrl,
      location: value.location,
      ability: value.ability
    };

    try {
      console.log('data', data);
    } catch (e) {
      message.error('ไม่สามารถโพสต์ขอความช่วยเหลือได้');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <WrapperContainer
      css={css`
        height: calc(100vh + 450px);
        display: flex;

        ${mediaQuerySmallTablet} {
          flex-direction: column-reverse;
        }
        ${mediaQueryMobile} {
          height: calc(100vh - 140px);
        }
      `}
    >
      <div
        css={css`
          width: 100%;

          ${mediaQueryTablet} {
            margin-top: 40px;
          }
        `}
      >
        <Text
          fontSize="24px"
          marginTop="10px"
          marginBottom="20px"
          fontWeight={500}
        >
          ข้อมูลของฉัน
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
              width: 100%;
              margin-bottom: 15px;
            }

            ${mediaQueryTablet} {
              .ant-col-8 {
                max-width: 100%;
                flex: 0 0 100%;
              }

              .ant-col-16 {
                max-width: 100%;
              }
              .ant-form-item-label {
                text-align: left;
              }
            }
          `}
        >
          <Form.Item
            name="title"
            label="ชื่อ"
            rules={[
              {
                // required: true,
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
            name="email"
            label="อีเมล"
            rules={[
              {
                // required: true,
                message: 'กรุณากรอกอีเมล'
              }
            ]}
          >
            <Input
              placeholder="อีเมล"
              style={{ height: '40px', borderRadius: '12px' }}
            />
          </Form.Item>
          <Divider />
          <Text
            fontSize="24px"
            fontWeight={500}
            marginBottom="20px"
            marginTop="10px"
          >
            เปลี่ยนรหัสผ่าน
          </Text>
          <Form.Item
            name="prevPassword"
            label="รหัสผ่านปัจจุบัน"
            rules={[
              {
                // required: true,
                message: 'กรุณากรอกรหัสผ่านปัจจุบัน'
              }
            ]}
          >
            <Input
              placeholder="รหัสผ่านปัจจุบัน"
              style={{ height: '40px', borderRadius: '12px' }}
            />
          </Form.Item>{' '}
          <Form.Item
            name="password"
            label="รหัสผ่านใหม่"
            rules={[
              {
                // required: true,
                message: 'กรุณากรอกรหัสผ่านใหม่'
              }
            ]}
          >
            <Input
              placeholder="รหัสผ่านใหม่"
              style={{ height: '40px', borderRadius: '12px' }}
            />
          </Form.Item>{' '}
          <Form.Item
            name="confirmPassword"
            label="ยืนยันรหัสผ่านใหม่"
            rules={[
              {
                // required: true,
                message: 'กรุณากรอกรหัสผ่านใหม่'
              }
            ]}
          >
            <Input
              placeholder="รหัสผ่านใหม่"
              style={{ height: '40px', borderRadius: '12px' }}
            />
          </Form.Item>
          <Divider />
          <Text
            fontSize="24px"
            fontWeight={500}
            marginBottom="20px"
            marginTop="10px"
          >
            สถานที่ให้ความช่วยเหลือ
          </Text>
          <Form.Item
            name="location"
            label="สถานที่ให้ความช่วยเหลือ"
            rules={[
              {
                // required: true,
                message: 'กรุณากรอกสถานที่ที่คุณสามารถให้ความช่วยเหลือได้'
              }
            ]}
          >
            <GoogleMapContent width={isMobile ? '100%' : '470px'} />
          </Form.Item>
          <Divider />
          <Text fontSize="24px" fontWeight={500} marginY="20px">
            ความสามารถในการช่วยเหลือ
          </Text>
          <Form.Item
            name="ability"
            css={css`
              position: relative;
              left: 33.333%;
              display: flex;

              .ant-checkbox-group-item {
                font-size: 16px;
              }

              .ant-checkbox {
                margin-right: 12px !important;
              }

              .ant-checkbox-group {
                width: 250px;
                font-size: 16px;
                > label {
                  margin-bottom: 8px;
                }
              }

              ${mediaQueryTablet} {
                left: 0;
              }
            `}
          >
            <Checkbox.Group
              options={ABILITY}
              value={checkedList}
              onChange={toggleChecked}
            />
          </Form.Item>
          {isSmallTablet && (
            <div
              css={css`
                width: 100%;
                position: relative;
                height: 100%;
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
                  right: 39%;
                  color: #ffff;
                  font-size: 16px;
                  position: absolute;
                  bottom: 0;

                  &:hover {
                    background: #ee6400;
                  }

                  ${mediaQueryTablet} {
                    width: 120px;
                    right: 0;
                    height: 35px;
                    font-size: 16px;
                  }

                  ${mediaQueryMobile} {
                    width: 100px;
                  }
                `}
              >
                สำเร็จ
              </Button>
            </div>
          )}
        </Form>
      </div>
      <div
        css={css`
          display: flex;
          height: 100% !important;
          flex-direction: column;
          align-items: center;
          width: 100%;
          position: relative;
          top: 40px;
        `}
      >
        <img
          src={imageUrl}
          alt="user avatar"
          css={css`
            width: 140px;
            height: 140px;
            border-radius: 50%;
            margin-bottom: 25px;
          `}
        />{' '}
        <Form.Item name="image">
          <Upload
            name="avatar"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>เลือกรูป</Button>
          </Upload>
        </Form.Item>
        <Text fontSize="14px" color="#C4C4C4" fontWeight={500} whiteSpace="pre">
          ขนาดไฟล์: สูงสุด 1 MB{'\n'}ไฟล์ที่รองรับ: .JPEG, .PNG
        </Text>
        {isSmallTablet && <Divider />}
        {!isSmallTablet && (
          <div
            css={css`
              width: 100%;
              position: relative;
              height: 100%;
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
                right: 0;
                color: #ffff;
                font-size: 16px;
                position: absolute;
                bottom: 30px;

                &:hover {
                  background: #ee6400;
                }

                ${mediaQueryTablet} {
                  width: 120px;
                  right: 0;
                  height: 35px;
                  font-size: 16px;
                }

                ${mediaQueryMobile} {
                  width: 100px;
                }
              `}
            >
              สำเร็จ
            </Button>
          </div>
        )}
      </div>
    </WrapperContainer>
  );
};
