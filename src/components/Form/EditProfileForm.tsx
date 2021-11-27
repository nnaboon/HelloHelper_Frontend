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

const RegisterLocationFormSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.75rem 2.75rem 1.5rem 2.75rem;
  position: relative;
  height: 100%;
  overflow: scroll;
`;

export const EditProfileForm = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<string[]>([]);

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
    <WrapperContainer>
      <Text fontSize="24px" marginTop="10px" marginBottom="20px">
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
          }
        `}
      >
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
          name="email"
          label="อีเมล"
          rules={[
            {
              required: true,
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
        <Text>เปลี่ยนรหัสผ่าน</Text>
        <Form.Item
          name="prevPassword"
          label="รหัสผ่านปัจจุบัน"
          rules={[
            {
              required: true,
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
              required: true,
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
              required: true,
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
          <GoogleMapContent />
        </Form.Item>
        <Divider />
        <Form.Item name="ability">
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
              margin-bottom: 40px;

              &:hover {
                background: #ee6400;
              }
            `}
          >
            ขอความช่วยเหลือ
          </Button>
        </div>
      </Form>
    </WrapperContainer>
  );
};
