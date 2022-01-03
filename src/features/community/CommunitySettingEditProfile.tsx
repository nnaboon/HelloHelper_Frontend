/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { Button, Form, Input, message, Checkbox, Divider } from 'antd';
import { GoogleMapContent } from 'components/GoogleMap/GoogleMap';
import {
  useMedia,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  SMALL_TABLET_WIDTH,
  mediaQueryMobile,
  mediaQuerySmallTablet
} from 'styles/variables';

export const CommunitySettingEditProfile = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);

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
      description: value.description,
      password: value.password,
      imageUrl: value.imageUrl,
      location: value.location
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
    <div
      css={css`
        ${mediaQueryMobile} {
          padding: 20px 20px 30px 20px;
        }
      `}
    >
      <Text
        fontSize={isMobile ? '24px' : '28px'}
        marginY={isMobile ? '20px' : '40px'}
        marginLeft={isSmallTablet ? 0 : '60px'}
        fontWeight={500}
      >
        ข้อมูลชุมชนความช่วยเหลือ
      </Text>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        css={css`
          height: 100vh;
          .ant-col-8 {
            ${mediaQuerySmallTablet} {
              max-width: 20%;
            }

            ${mediaQueryMobile} {
              max-width: 33.3333%;
            }
          }

          .ant-form-item-control-input {
            width: 460px;

            ${mediaQueryMobile} {
              width: 100%;
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
            placeholder="ชื่อชุมชนความช่วยเหลือ"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>
        <Form.Item name="description" label="ตำอธิบาย">
          <Input
            placeholder="ชื่อชุมชนความช่วยเหลือ"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>
        <Divider />
        <Text
          fontSize={isMobile ? '24px' : '28px'}
          fontWeight={500}
          marginLeft={isSmallTablet ? 0 : '60px'}
          marginY={isMobile ? '20px' : '40px'}
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
          fontSize={isMobile ? '24px' : '28px'}
          fontWeight={500}
          marginLeft={isSmallTablet ? 0 : '60px'}
          marginY={isMobile ? '30px' : '40px'}
        >
          สถานที่ให้ความช่วยเหลือ
        </Text>
        <Form.Item
          name="location"
          rules={[
            {
              // required: true,
              message: 'กรุณากรอกสถานที่ที่คุณสามารถให้ความช่วยเหลือได้'
            }
          ]}
        >
          <GoogleMapContent width={isTablet ? '100%' : '470px'} />
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
              bottom: -50px;

              &:hover {
                background: #ee6400;
              }

              ${mediaQueryMobile} {
                right: 0;
                width: 100px;
                height: 35px;
              }
            `}
          >
            สำเร็จ
          </Button>
        </div>
      </Form>
    </div>
  );
};
