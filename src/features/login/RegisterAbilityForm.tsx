/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { Checkbox, Button, Form, message } from 'antd';
import { UserCreateBody } from './const';
import { useHistory } from 'react-router-dom';
import {
  mediaQueryMobile,
  mediaQueryLargeDesktop,
  mediaQueryTablet
} from 'styles/variables';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';

type RegisterAbilityFormProps = {
  userAccountData: UserCreateBody;
  onNext: (value: UserCreateBody) => void;
  onBack: () => void;
};

const RegisterAbilityFormSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 2.75rem 1.5rem 2.75rem;
  height: 100%;

  ${mediaQueryMobile} {
    padding: 7px 10px 0 10px;
  }
`;

export const RegisterAbilityForm = (props: RegisterAbilityFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [form] = Form.useForm();
  const history = useHistory();
  const { userAccountData, onNext, onBack } = props;

  const options = [
    { label: 'ด้านการจัดหาอาหาร', value: 'food' },
    { label: 'ด้านเครื่องแต่งกาย', value: 'cloth' },
    { label: 'ด้านเครื่องใช้ในบ้าน', value: 'furniture' },
    { label: 'ด้านเครื่องใช้ไฟฟ้า', value: 'electronic' },
    { label: 'ด้านอุปกรณ์ทำการเกษตร', value: 'agriculture' },
    { label: 'ด้านหนังสือและเครื่องเขียน', value: 'stationary' },
    { label: 'ด้านเพลงและดนตรี', value: 'music' },
    { label: 'ด้านมือถือและอุปกรณ์เสริม', value: 'mobile' },
    { label: 'ด้านกีฬาและอุปกรณ์เสริม', value: 'sports' },
    { label: 'ด้านสุขภาพและความงาม', value: 'health' }
    // {
    //   label: 'ให้ความช่วยเหลือตามรายการให้ความช่วยเหลือของฉัน',
    //   value: undefined
    // }
  ];

  const toggleChecked = (value) => {
    setCheckedList(value);

    if (value.includes('ไม่สามารถให้ความช่วยเหลือได้')) {
      setCheckedList([]);
      value = ['ไม่สามารถให้ความช่วยเหลือได้'];
    }
  };

  const onFinish = async (value) => {
    setIsSubmitting(true);
    const data = {
      category: value.ability
    };

    try {
      onNext({ ...userAccountData, ...data });
      history.push({
        pathname: '/'
      });
    } catch (e) {
      message.error('ไม่สามารถเลือกความสามารถในการช่วยเหลือได้');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RegisterAbilityFormSection>
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

          .ant-modal .ant-form-item-control-input {
            width: 100%;
          }
          .ant-form-item-label > label {
            font-size: 1.5rem;
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

          .ant-col-16 {
            max-width: 100%;
          }

          .ant-form-item-label > label {
            font-size: 14px;
          }

          .ant-checkbox + span {
            font-size: 16px;
          }

          .ant-checkbox-inner {
            width: 16px;
            height: 16px;
          }

          ${mediaQueryLargeDesktop} {
            .ant-form-item-label > label {
              font-size: 14px;
            }

            .ant-checkbox + span {
              font-size: 16px;
            }

            .ant-checkbox-inner {
              width: 16px;
              height: 16px;
            }
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
        <Global
          styles={css`
            .ant-form label {
              font-size: 18px;
              margin-bottom: 10px;
            }
          `}
        />
        <Text
          marginTop="10px"
          css={css`
            font-size: 24px;
            margin-bottom: 8px;

            ${mediaQueryLargeDesktop} {
              font-size: 20px;
            }

            ${mediaQueryMobile} {
              font-size: 19px;
            }
          `}
        >
          ท่านยินดีให้ความช่วยเหลือในหมวดหมู่ใดบ้าง
        </Text>
        <Form.Item name="ability">
          <Checkbox.Group
            options={options}
            value={checkedList}
            onChange={toggleChecked}
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '50px'
            }}
          />
        </Form.Item>
        <SecondaryButton
          type="primary"
          htmlType="submit"
          css={css`
            width: 90px;
            min-width: 90px;
            height: 35px;
            position: absolute;
            bottom: 0;
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
            bottom: 0;
            right: 0;
          `}
        >
          ตกลง
        </PrimaryButton>
      </Form>
    </RegisterAbilityFormSection>
  );
};
