/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { Button, Form, Input, message, Divider } from 'antd';
import { OrderFormBody } from './const';
import {
  useMedia,
  MOBILE_WIDTH,
  SMALL_TABLET_WIDTH,
  LARGE_DESKTOP_WIDTH,
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQueryLargeDesktop
} from 'styles/variables';
import { useProvide } from 'hooks/provide/useProvide';
import { useRequest } from 'hooks/request/useRequest';
import { useAddOrder } from 'hooks/order/useAddOrder';

interface OrderFormProps {
  setIsModalVisible: (isModalVisible: boolean) => void;
  data: any;
}

const RegisterLocationFormSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.75rem 2.75rem 1.5rem 2.75rem;
  position: relative;
  height: 100%;
  overflow: scroll;

  ${mediaQueryMobile} {
    height: 400px;
  }
`;

export const OrderForm = ({ data, setIsModalVisible }: OrderFormProps) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { pathname, state } = useLocation();
  const chatId = pathname.split('/')[2];

  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);
  const isLargeDesktop = useMedia(`(max-width: ${LARGE_DESKTOP_WIDTH}px)`);

  const { data: provide, execute: getProvide } = useProvide();
  const { execute: addOrder } = useAddOrder();

  const onFinish = async (value) => {
    setIsSubmitting(true);
    const data = {
      chatId: chatId,
      orderReferenceId: state.id,
      orderReferenceType: state.type,
      requesterUserId: window.localStorage.getItem('id'),
      providerUserId: state.userId,
      title: value.title,
      location: {
        name: state.location.name,
        latitude: state.location.latitude,
        longitude: state.location.longitude
      },
      number: value.number as Number,
      description: value.message,
      price: value.price as Number,
      serviceCharge: value.serviceCharge as Number,
      payment: value.payment,
      receiver: {
        name: value.name ?? undefined,
        address: value.address ?? undefined,
        phoneNumber: value.phoneNumber ?? undefined
      }
    };

    try {
      addOrder(data)
        .then(() => {
          message.success('ส่งคำขอเรียบร้อย');
          setIsModalVisible(false);
          form.resetFields();
        })
        .catch(() => {
          setIsModalVisible(false);
          message.error('ไม่สามารถโพสต์ขอความช่วยเหลือได้');
        });
    } catch (e) {
      message.error('ไม่สามารถโพสต์ขอความช่วยเหลือได้');
    } finally {
      setIsSubmitting(false);
      setIsModalVisible(false);
    }
  };

  useEffect(() => {
    if (state) {
      if (state.type === 'provide') {
        getProvide(state.id);
      }
    }
  }, [state]);

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
      <Text
        marginTop="10px"
        css={css`
          font-size: 2.7rem;
          margin-bottom: 25px;

          ${mediaQueryLargeDesktop} {
            font-size: 24px;
            margin-bottom: 20px;
          }
        `}
      >
        ฟอร์มการขอความช่วยเหลือ
      </Text>
      <Text
        fontWeight={500}
        color="#F86800"
        css={css`
          font-size: 2rem;
          margin-bottom: 45px;

          ${mediaQueryLargeDesktop} {
            font-size: 16px;
            margin-bottom: 30px;
          }
        `}
      >
        โปรดยืนยันข้อมูลการขอความช่วยเหลือของคุณ เพื่อง่ายต่อผู้ให้ความช่วยเหลือ
        มาเรียกดูในภายหลัง
      </Text>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          title: state ? state.title : undefined,
          location: state ? state.location.name : undefined,
          number: state ? state.number : undefined,
          price: state ? state.price : undefined,
          serviceCharge: state ? state.serviceCharge : undefined,
          payment: state ? state.payment : undefined
        }}
        css={css`
          .ant-form-item-label > label {
            font-size: 1.6rem;
          }

          .ant-form-item {
            margin-bottom: 32px;
          }

          .ant-select-single:not(.ant-select-customize-input)
            .ant-select-selector {
            height: 40px;
          }

          .ant-upload.ant-upload-select-picture-card {
            width: 170px;
            height: 170px;
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

          ${mediaQueryMobile} {
            width: 100%;
          }
        `}
      >
        <Form.Item name="title" label="ชื่อความช่วยเหลือ">
          <Input
            placeholder="ชื่อความช่วยเหลือ"
            defaultValue={state?.title}
            style={{ borderRadius: '12px' }}
            css={css`
              height: 50px;
              font-size: 1.65rem;

              ${mediaQueryLargeDesktop} {
                height: 40px;
                font-size: 14px;
              }
            `}
          />
        </Form.Item>
        {console.log(state)}

        <Form.Item name="location" label="สถานที่">
          <Input
            placeholder="สถานที่"
            defaultValue={state?.location.name}
            style={{ borderRadius: '12px' }}
            css={css`
              height: 50px;
              font-size: 1.65rem;

              ${mediaQueryLargeDesktop} {
                height: 40px;
                font-size: 14px;
              }
            `}
          />
        </Form.Item>
        <Form.Item name="number" label="จำนวน">
          <Input
            placeholder="จำนวน"
            defaultValue={state?.number}
            type="number"
            style={{ borderRadius: '12px' }}
            css={css`
              height: 50px;
              font-size: 1.65rem;

              ${mediaQueryLargeDesktop} {
                height: 40px;
                font-size: 14px;
              }
            `}
          />
        </Form.Item>

        <Form.Item name="price" label="ราคาสินค้า">
          <Input
            defaultValue={state?.price}
            placeholder="ขอบเขตราคาสินค้า"
            type="number"
            style={{ borderRadius: '12px' }}
            css={css`
              height: 50px;
              font-size: 1.65rem;

              ${mediaQueryLargeDesktop} {
                height: 40px;
                font-size: 14px;
              }
            `}
          />
        </Form.Item>
        <Form.Item name="serviceCharge" label="อัตราค่าบริการ">
          <Input
            defaultValue={state?.serviceCharge}
            placeholder="ขอบเขตราคาค่าบริการ"
            type="number"
            style={{ borderRadius: '12px' }}
            css={css`
              height: 50px;
              font-size: 1.65rem;

              ${mediaQueryLargeDesktop} {
                height: 40px;
                font-size: 14px;
              }
            `}
          />
        </Form.Item>

        <Form.Item name="payment" label="วิธีการชำระเงิน">
          <Input
            defaultValue={state?.payment}
            placeholder="วิธีการชำระเงิน"
            style={{ borderRadius: '12px' }}
            css={css`
              height: 50px;
              font-size: 1.65rem;

              ${mediaQueryLargeDesktop} {
                height: 40px;
                font-size: 14px;
              }
            `}
          />
        </Form.Item>
        <Form.Item name="description" label="คำอธิบาย">
          <Input.TextArea
            placeholder="คำอธิบาย"
            style={{ borderRadius: '12px' }}
            css={css`
              height: 50px;
              font-size: 1.65rem;

              ${mediaQueryLargeDesktop} {
                height: 40px;
                font-size: 14px;
              }
            `}
          />
        </Form.Item>
        <Divider />
        <Text
          marginY="30px"
          css={css`
            font-size: 2rem;
            margin-bottom: 45px;

            ${mediaQueryLargeDesktop} {
              font-size: 16px;
              margin-bottom: 30px;
            }
          `}
        >
          ข้อมูลส่วนตัวผู้ขอความช่วยเหลือ (ในกรณีต้องการจัดส่งทางไปรษณีย์)
        </Text>
        <Form.Item
          name="name"
          label="ชื่อ-นามสกุล"
          // rules={[
          //   {
          //     required: true,
          //     message: 'กรุณากรอกชื่อ-นามสกุลของผู้ขอความช่วยเหลือ'
          //   }
          // ]}
        >
          <Input
            placeholder="ชื่อ-นามสกุล"
            style={{ borderRadius: '12px' }}
            css={css`
              height: 50px;
              font-size: 1.65rem;

              ${mediaQueryLargeDesktop} {
                height: 40px;
                font-size: 14px;
              }
            `}
          />
        </Form.Item>
        <Form.Item
          name="address"
          label="ที่อยู่จัดส่ง"
          // rules={[
          //   { required: true, message: 'กรุณากรอกที่อยู่ของผู้ขอความช่วยเหลือ' }
          // ]}
        >
          <Input.TextArea
            placeholder="ที่อยู่จัดส่ง"
            style={{ borderRadius: '12px' }}
            css={css`
              height: 50px;
              font-size: 1.65rem;

              ${mediaQueryLargeDesktop} {
                height: 40px;
                font-size: 14px;
              }
            `}
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="เบอร์โทรศัพท์"
          // rules={[
          //   {
          //     required: true,
          //     message: 'กรุณากรอกเบอร์โทรศัพท์ของผู้ขอความช่วยเหลือ'
          //   }
          // ]}
        >
          <Input
            placeholder="เบอร์โทรศัพท์"
            style={{ borderRadius: '12px' }}
            css={css`
              height: 50px;
              font-size: 1.65rem;

              ${mediaQueryLargeDesktop} {
                height: 40px;
                font-size: 14px;
              }
            `}
          />
        </Form.Item>
        {/* <Divider />
        <Text
          marginY="30px"
          css={css`
            font-size: 2rem;
            margin-bottom: 45px;

            ${mediaQueryLargeDesktop} {
              font-size: 16px;
              margin-bottom: 30px;
            }
          `}
        >
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
            style={{ borderRadius: '12px' }}
            css={css`
              height: 50px;
              font-size: 1.65rem;

              ${mediaQueryLargeDesktop} {
                height: 40px;
                font-size: 14px;
              }
            `}
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
            style={{ borderRadius: '12px' }}
            css={css`
              height: 50px;
              font-size: 1.65rem;

              ${mediaQueryLargeDesktop} {
                height: 40px;
                font-size: 14px;
              }
            `}
          />
        </Form.Item>*/}
        <div
          css={css`
            width: 100%;
            display: flex;
            justify-content: end;
            position: relative;
          `}
        >
          <Button
            type="primary"
            htmlType="submit"
            css={css`
              width: 170px;
              height: 55px;
              box-sizing: border-box;
              background: #ee6400;
              border-radius: 9px;
              border: 0;
              right: 0;
              color: #ffff;
              font-size: 2rem;

              &:hover {
                background: #ee6400;
              }

              ${mediaQueryLargeDesktop} {
                font-size: 16px;
                height: 40px;
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
            ตกลง
          </Button>
        </div>
      </Form>
    </RegisterLocationFormSection>
  );
};
