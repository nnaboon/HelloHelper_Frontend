/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { Checkbox, Button, Form, message } from 'antd';
import { UserCreateBody } from './const';
import { useHistory } from 'react-router-dom';
import { ABILITY } from '../../data/ability';
import { mediaQueryMobile } from 'styles/variables';

type RegisterAbilityFormProps = {
  userAccountData: UserCreateBody;
  onNext: (value: UserCreateBody) => void;
  onBack: () => void;
};

const RegisterAbilityFormSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.55rem 2.75rem 1.5rem 2.75rem;
  position: relative;
  height: 620px;

  ${mediaQueryMobile} {
    padding: 0;
  }
`;

export const RegisterAbilityForm = (props: RegisterAbilityFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [form] = Form.useForm();
  const history = useHistory();
  const { userAccountData, onNext, onBack } = props;

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
      ability: value.ability
    } as UserCreateBody;

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
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        css={css`
          .ant-form-item {
            width: 475px;

            ${mediaQueryMobile} {
              width: 100%;
            }
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
        <Text fontSize="24px" marginTop="10px" marginBottom="20px">
          ท่านยินดีให้ความช่วยเหลือในหมวดหมู่ใดบ้าง
        </Text>
        <Form.Item name="ability">
          <Checkbox.Group
            options={ABILITY}
            value={checkedList}
            onChange={toggleChecked}
          />
        </Form.Item>
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
            bottom: 0;
            right: 140px;
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
            bottom: 0;
            right: 20px;
            color: #ffff;
            font-size: 16px;

            &:hover {
              background: #ee6400;
            }
          `}
        >
          ตกลง
        </Button>
      </Form>
    </RegisterAbilityFormSection>
  );
};
