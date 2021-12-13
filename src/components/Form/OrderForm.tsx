/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { Button, Form, Input, message, Divider } from 'antd';
import { OrderFormBody } from './const';

interface OrderFormProps {
  setIsModalVisible: (isModalVisible: boolean) => void;
}

const RegisterLocationFormSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.75rem 2.75rem 1.5rem 2.75rem;
  position: relative;
  height: 100%;
  overflow: scroll;
`;

export const OrderForm = ({ setIsModalVisible }: OrderFormProps) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onFinish = async (value) => {
    setIsSubmitting(true);
    const data = {
      title: value.title,
      location: value.location,
      amount: value.amount,
      message: value.message ?? '',
      maxPrice: value.maxPrice,
      maxServiceCharge: value.maxServiceCharge,
      payment: value.payment,
      helper: {
        name: value.helperName,
        phoneNumber: value.helperPhoneNumber
      },
      requester: {
        name: value.requesterName,
        address: value.requesterAddress,
        phoneNumber: value.requesterPhoneNumber
      }
    } as OrderFormBody;

    try {
      console.log('data', data);
    } catch (e) {
      message.error('ไม่สามารถโพสต์ขอความช่วยเหลือได้');
    } finally {
      setIsSubmitting(false);
      setIsModalVisible(false);
    }
  };

  return (
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
        `}
      />
      <Text fontSize="24px" marginTop="10px">
        ฟอร์มการขอความช่วยเหลือ
      </Text>
      <Text
        fontSize="16px"
        fontWeight={500}
        color="#F86800"
        marginTop="20px"
        marginBottom="30px"
      >
        โปรดยืนยันข้อมูลการขอความช่วยเหลือของคุณ เพื่อง่ายต่อผู้ให้ความช่วยเหลือ
        มาเรียกดูในภายหลัง
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
        <Form.Item name="title" label="ชื่อความช่วยเหลือ">
          <Input
            placeholder="ชื่อความช่วยเหลือ"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>

        <Form.Item name="location" label="สถานที่">
          <Input
            placeholder="สถานที่"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>
        <Form.Item name="amount" label="จำนวน">
          <Input
            placeholder="จำนวน"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>

        <Form.Item name="maxPrice" label="ราคาสินค้าสูงสุด">
          <Input
            placeholder="ขอบเขตราคาสินค้า"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>
        <Form.Item name="maxServiceCharge" label="อัตราค่าบริการสูงสุด">
          <Input
            placeholder="ขอบเขตราคาค่าบริการ"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>

        <Form.Item name="payment" label="วิธีการชำระเงิน">
          <Input
            placeholder="วิธีการชำระเงิน"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>
        <Form.Item name="message" label="คำอธิบาย">
          <Input.TextArea
            placeholder="คำอธิบาย"
            style={{ borderRadius: '12px' }}
          />
        </Form.Item>
        <Divider />
        <Text fontSize="16px" marginY="30px">
          ข้อมูลส่วนตัวผู้ขอความช่วยเหลือ
        </Text>
        <Form.Item
          name="requesterName"
          label="ชื่อ-นามสกุล"
          rules={[
            {
              required: true,
              message: 'กรุณากรอกชื่อ-นามสกุลของผู้ขอความช่วยเหลือ'
            }
          ]}
        >
          <Input
            placeholder="ชื่อ-นามสกุล"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>
        <Form.Item
          name="requesterAddress"
          label="ที่อยู่จัดส่ง"
          rules={[
            { required: true, message: 'กรุณากรอกที่อยู่ของผู้ขอความช่วยเหลือ' }
          ]}
        >
          <Input
            placeholder="ที่อยู่จัดส่ง"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>
        <Form.Item
          name="requesterPhoneNumber"
          label="เบอร์โทรศัพท์"
          rules={[
            {
              required: true,
              message: 'กรุณากรอกเบอร์โทรศัพท์ของผู้ขอความช่วยเหลือ'
            }
          ]}
        >
          <Input
            placeholder="เบอร์โทรศัพท์"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>
        <Divider />
        <Text fontSize="16px" marginY="30px">
          ข้อมูลส่วนตัวผู้ให้ความช่วยเหลือ
        </Text>
        <Form.Item
          name="helperName"
          label="ชื่อ-นามสกุล"
          rules={[
            {
              required: true,
              message: 'กรุณากรอกชื่อ-นามสกุลของผู้ให้ความช่วยเหลือ'
            }
          ]}
        >
          <Input
            placeholder="ชื่อ-นามสกุล"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>
        <Form.Item
          name="helperPhoneNumber"
          label="เบอร์โทรศัพท์"
          rules={[
            {
              required: true,
              message: 'กรุณากรอกเบอร์โทรศัพท์ของผู้ให้ความช่วยเหลือ'
            }
          ]}
        >
          <Input
            placeholder="เบอร์โทรศัพท์"
            style={{ height: '40px', borderRadius: '12px' }}
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

              &:hover {
                background: #ee6400;
              }
            `}
          >
            ตกลง
          </Button>
        </div>
      </Form>
    </RegisterLocationFormSection>
  );
};
