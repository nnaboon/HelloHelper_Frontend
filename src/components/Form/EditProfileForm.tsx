/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { Button, Form, Input, message, Checkbox, Divider } from 'antd';
import { ABILITY } from 'data/ability';
import { GoogleMapContent } from 'components/GoogleMap/GoogleMap';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { mediaQueryMobile, useMedia, MOBILE_WIDTH } from 'styles/variables';

export const EditProfileForm = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

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
        <Text fontSize="24px" fontWeight={500}>
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
            display: flex;
            align-items: center;
            justify-content: center;

            .ant-checkbox-group {
              width: 250px;

              > label {
                margin-bottom: 8px;
              }
            }
          `}
        >
          <Checkbox.Group
            options={ABILITY}
            value={checkedList}
            onChange={toggleChecked}
          />
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
              bottom: -15px;

              &:hover {
                background: #ee6400;
              }

              ${mediaQueryMobile} {
                width: 100px;
                font-size: 16px;
                height: 35px;
                right: 0px;
              }
            `}
          >
            สำเร็จ
          </Button>
        </div>
      </Form>
    </WrapperContainer>
  );
};
