/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { Button, Divider, Form, Input, message, Checkbox } from 'antd';
import { LocationType, UserCreateBody } from './const';
import { mediaQueryMobile } from 'styles/variables';
import { GoogleMapContent } from 'components/GoogleMap/GoogleMap';
import { mediaQueryLargeDesktop } from '../../styles/variables';

type RegisterLocationFormProps = {
  userAccountData: UserCreateBody;
  onNext: (value: any) => void;
  onBack: () => void;
};

const RegisterLocationFormSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.55rem 2.75rem 1.5rem 2.75rem;

  ${mediaQueryMobile} {
    padding: 0;
  }
`;

export const RegisterLocationForm = (props: RegisterLocationFormProps) => {
  const [form] = Form.useForm();
  const { userAccountData, onNext, onBack } = props;
  const [location, setLocation] = useState<any>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onFinish = async () => {
    setIsSubmitting(true);
    const data = {
      location: {
        name: location?.name,
        latitude: location?.geometry.location.lat(),
        longitude: location?.geometry.location.lng()
      }
    };

    try {
      //   const {
      //     available,
      //     message: errorMessage
      //   } = await checkRegisterAvailableEmail(value.email);
      //   if (!available) {
      //     message.error(errorMessage, 5);
      //   } else {
      //     onNext(data);
      //   }
      onNext({ ...userAccountData, ...data });
    } catch (e) {
      message.error('ไม่สามารถเพิ่มสถานที่ให้ความช่วยเหลือได้');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RegisterLocationFormSection>
      <Global
        styles={css`
          .ant-form-item-control-input {
            width: 360px;
          }
        `}
      />
      <Text
        marginTop="10px"
        marginBottom="20px"
        css={css`
          font-size: 2.2rem;

          ${mediaQueryLargeDesktop} {
            font-size: 24px;
          }
        `}
      >
        สถานที่ที่คุณสามารถให้ความช่วยเหลือได้
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
          position: relative;
          height: 100%;

          .ant-col-16 {
            max-width: 100%;
          }

          .ant-form-item-control-input {
            ${mediaQueryMobile} {
              width: 100%;
            }
          }
        `}
      >
        {/* <Form.Item
          name="location"
          // rules={[
          //   {
          //     required: true,
          //     message: 'กรุณากรอกสถานที่ที่คุณสามารถให้ความช่วยเหลือได้'
          //   }
          // ]}
        > */}
        <GoogleMapContent
          requestLocation={location}
          setRequestLocation={setLocation}
          width="100%"
          height="390px"
          css={css`
            width: 100%;
            min-width: 100%;
          `}
        />
        {/* </Form.Item> */}
        <Button
          type="primary"
          htmlType="submit"
          css={css`
            width: 106px;
            height: 40px;
            box-sizing: border-box;
            background: #ffff;
            border-radius: 9px;
            border: 1px solid #ee6400;
            position: absolute;
            right: 190px;
            bottom: 0;
            color: #ee6400;
            font-size: 16px;

            &:hover {
              background: #ffff;
            }
          `}
          onClick={() => onBack()}
        >
          ย้อนกลับ
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          css={css`
            width: 106px;
            height: 40px;
            box-sizing: border-box;
            background: #ee6400;
            border-radius: 9px;
            border: 0;
            position: absolute;
            right: 0;
            bottom: 0px;
            color: #ffff;
            font-size: 16px;

            &:hover {
              background: #ee6400;
            }
          `}
        >
          ถัดไป
        </Button>
      </Form>
    </RegisterLocationFormSection>
  );
};
