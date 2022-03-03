/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { Form, message } from 'antd';
import { UserCreateBody } from './const';
import {
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQueryLargeDesktop,
  useMedia,
  TABLET_WIDTH
} from 'styles/variables';
import { GoogleMapContent } from 'components/GoogleMap/GoogleMap';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';

type RegisterLocationFormProps = {
  userAccountData: UserCreateBody;
  onNext: (value: any) => void;
  onBack: () => void;
};

const RegisterLocationFormSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 2.75rem 1.5rem 2.75rem;
  height: 100%;

  ${mediaQueryMobile} {
    padding: 7px 10px 0 10px;
  }
`;

export const RegisterLocationForm = (props: RegisterLocationFormProps) => {
  const [form] = Form.useForm();
  const { userAccountData, onNext, onBack } = props;
  const [location, setLocation] = useState<any>(null);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onFinish = async () => {
    setIsSubmitting(true);
    const data = {
      location: {
        name: location?.name ?? location.formatted_address,
        latitude: location?.geometry.location.lat(),
        longitude: location?.geometry.location.lng()
      }
    };

    try {
      onNext({ ...userAccountData, ...data });
    } catch (e) {
      message.error('ไม่สามารถเพิ่มสถานที่ให้ความช่วยเหลือได้');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RegisterLocationFormSection>
      <Text
        // marginTop="10px"
        css={css`
          font-size: 22px;
          margin-bottom: 10px;

          ${mediaQueryLargeDesktop} {
            font-size: 20px;
          }

          ${mediaQueryTablet} {
            margin-bottom: 20px;
          }

          ${mediaQueryMobile} {
            font-size: 19px;
            margin-bottom: 10px;
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
          height: 100%;
          position: relative;

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
        <GoogleMapContent
          requestLocation={location}
          setRequestLocation={setLocation}
          width="100%"
          height={isTablet ? '380px' : '370px'}
          css={css`
            width: 100%;
            min-width: 100%;
          `}
        />
        <SecondaryButton
          type="primary"
          htmlType="submit"
          css={css`
            width: 90px;
            min-width: 90px;
            position: absolute;
            height: 35px;
            bottom: -5px;
            right: 110px;
          `}
          onClick={() => onBack()}
        >
          ย้อนกลับ
        </SecondaryButton>
        <PrimaryButton
          type="primary"
          htmlType="submit"
          css={css`
            width: 90px;
            min-width: 90px;
            height: 35px;
            position: absolute;
            bottom: -5px;
            right: 0;
          `}
        >
          ตกลง
        </PrimaryButton>
      </Form>
    </RegisterLocationFormSection>
  );
};
