/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { Button, Form, Input, message, Tooltip, Select, Checkbox } from 'antd';
import { CommunityType } from 'features/community/CommunityMenu';

interface CreateCommunityFormProps {
  setMenu: (menu: CommunityType) => void;
}

const CreateCommunityFormSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.75rem 2.75rem 1.5rem 2.75rem;
  position: relative;
  height: 564px;
  overflow: scroll;
`;

export const CreateCommunityForm = ({ setMenu }: CreateCommunityFormProps) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onFinish = async (value) => {
    setIsSubmitting(true);
    const data = {
      name: value.name,
      password: value.password
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
    <CreateCommunityFormSection>
      <Text fontSize="24px" marginTop="10px">
        สร้างชุมชนความช่วยเหลือ
      </Text>
      <Text
        fontSize="16px"
        marginTop="10px"
        marginBottom="10px"
        fontWeight={500}
        color="#F86800"
      >
        คุณสามารถสร้างชุมชนความช่วยเหลือใหม่ได้แล้ว
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
            width: 360px;
          }
        `}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'กรุณากำหนกชื่อชุมชนความช่วยเหลือ'
            }
          ]}
        >
          <Input
            placeholder="ชื่อขุมชนความช่วยเหลือ"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'กรุณากำหนดรหัสชุมชนความข่วยเหลือ'
            }
          ]}
        >
          <Input
            placeholder="รหัสขุมชนความช่วยเหลือ"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>
        <ul>
          <li>สามารถเป็น ภาษาอังกฤษ ตัวเลข และอักษรพิเศษ </li>
          <li>ห้ามมีเว้นวรรค</li>
        </ul>
        <div>
          หรือ{' '}
          <span
            style={{
              textDecoration: 'underline',
              color: '#F86800',
              cursor: 'pointer'
            }}
            onClick={() => setMenu(CommunityType.ALREADY)}
          >
            ต้องการเข้าร่วมชุมชนความช่วยเหลืออื่น
          </span>
        </div>
        <div
          css={css`
            width: 100%;
            position: absolute;
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
            `}
          >
            ตกลง
          </Button>
        </div>
      </Form>
    </CreateCommunityFormSection>
  );
};
