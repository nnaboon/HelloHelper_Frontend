/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { Button, Form, Input, message, Tooltip, Select, Checkbox } from 'antd';
import { CommunityType } from 'features/community/CommunityMenu';

interface CommunityFormProps {
  setMenu: (menu: CommunityType) => void;
}

const CommunityFormSection = styled.div`
  padding: 1.75rem 2.75rem 1.5rem 2.75rem;
  position: relative;
  height: 581px;
`;

export const CommunityForm = ({ setMenu }: CommunityFormProps) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onFinish = async (value) => {
    setIsSubmitting(true);
    const data = {
      communityname: value.communityname,
      password: value.password,
      checked: value.communityChecked
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
    <CommunityFormSection>
      <Text fontSize="24px" marginTop="10px">
        ชุมชนความช่วยเหลือ
      </Text>
      <Text
        fontSize="16px"
        marginTop="10px"
        marginBottom="10px"
        fontWeight={500}
        color="#F86800"
      >
        สามารถให้ความช่วยเหลือภายในชุมชนของคุณได้แล้วโดยความช่วยเหลือของคุณจะแสดงอยู่แค่ภายในชุมชนที่คุณอยู่เท่านั้น
      </Text>
      <Text fontSize="20px" marginY="20px" fontWeight={500}>
        ชุมชนความช่วยเหลือของคุณขณะนี้
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

          margin: 26px 0;
        `}
      >
        <Form.Item
          name="communityname"
          rules={[
            {
              required: true,
              message: 'กรุณากรอกชื่อชุมชนความช่วยเหลือที่คุณต้องการอยู่'
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
              message: 'กรุณากรอกรหัสชุมชนความช่วยเหลือที่คุณต้องการอยู่'
            }
          ]}
        >
          <Input
            placeholder="รหัสขุมชนความช่วยเหลือ"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>
        <Form.Item name="communityChecked" valuePropName="checked">
          <Checkbox>ไม่ต้องการอยู่ในชุมชนความช่วยเหลือ</Checkbox>
        </Form.Item>
        <div>
          หรือ{' '}
          <span
            style={{
              textDecoration: 'underline',
              color: '#F86800',
              cursor: 'pointer'
            }}
            onClick={() => setMenu(CommunityType.CREATE)}
          >
            สร้างชุมชนความช่วยเหลือใหม่
          </span>
        </div>
        <div
          css={css`
            width: 100%;
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
              bottom: 20px;
              right: 40px;
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
    </CommunityFormSection>
  );
};
