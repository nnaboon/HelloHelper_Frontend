/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { getAuth, updatePassword } from 'firebase/auth';
import { FormRule, getRule } from 'utils/form/getRule';
import { Text } from 'components/Text';
import { PrimaryButton } from 'components/Button/Button';
import { InputPasswordForm } from 'components/Input/InputForm';
import { Form, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { userStore } from 'store/userStore';
import {
  useMedia,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  SMALL_TABLET_WIDTH,
  LARGE_DESKTOP_WIDTH,
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQueryExtraLargeDesktop,
  mediaQueryLargeDesktop
} from 'styles/variables';
import { Loading } from 'components/Loading/Loading';
import { useUser } from 'hooks/user/useUser';

export const EditPasswordPage = observer(() => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { me, setMe, loginType } = userStore;

  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);
  const isLargeDesktop = useMedia(`(max-width: ${LARGE_DESKTOP_WIDTH}px)`);

  const onFinish = async (value) => {
    setIsSubmitting(true);

    try {
      const auth = getAuth();

      const user = auth.currentUser;
      const newPassword = value.password;

      updatePassword(user, newPassword)
        .then(() => {
          message.success('เปลี่ยนรหัสผ่านสำเร็จ');
          form.resetFields();
        })
        .catch((error) => {
          message.error('ไม่สามารถเปลี่ยนรหัสผ่านได้');
        });
    } catch (error) {
      message.error('ไม่สามารถเปลี่ยนรหัสผ่านได้');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (
      form.getFieldValue('password') &&
      form.getFieldValue('password') !== form.getFieldValue('confirmPassword')
    )
      form.setFields([
        {
          name: 'confirmPassword',
          errors: ['รหัสผ่านไม่ตรงกัน']
        }
      ]);
    else
      form.setFields([
        {
          name: 'confirmPassword',
          errors: []
        }
      ]);
  }, [password]);

  return (
    <React.Fragment>
      {me ? (
        <div
          css={css`
            width: 100%;

            ${mediaQueryTablet} {
              margin-top: 40px;
            }
          `}
        >
          <Text
            fontSize="24px"
            marginTop="20px"
            marginBottom="20px"
            fontWeight={500}
            css={css`
              font-size: 2.8rem;
              margin-bottom: 25px;

              ${mediaQueryLargeDesktop} {
                margin-bottom: 15px;
                font-size: 20px;
              }
            `}
          >
            แก้ไขรหัสผ่าน
          </Text>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            autoComplete="off"
            css={css`
              .ant-form-item-label > label {
                font-size: 16px;
              }

              .ant-input {
                font-size: 1.8rem;
                line-height: 6.8713;
              }

              .ant-form-item-control-input {
                width: 70%;
              }

              ${mediaQueryExtraLargeDesktop} {
                .ant-form-item-label > label {
                  font-size: 14px;
                }
              }

              ${mediaQueryLargeDesktop} {
                .ant-input {
                  font-size: 14px;
                }

                .ant-form-item-control-input {
                  width: 500px;
                }
              }

              ${mediaQueryTablet} {
                display: flex;
                flex-direction: column;

                .ant-form-item-control-input {
                  width: 100%;
                }

                .ant-col-8 {
                  max-width: 100%;
                  flex: 0 0 100%;
                }

                .ant-col-16 {
                  max-width: 100%;
                }
                .ant-form-item-label {
                  text-align: left;
                }
              }
            `}
          >
            <div
              css={css`
                width: 100%;
              `}
            >
              <React.Fragment>
                <Form.Item
                  name="password"
                  label="รหัสผ่านใหม่"
                  rules={[{ required: true, message: 'กรุณากรอกรหัสผ่านใหม่' }]}
                >
                  <InputPasswordForm placeholder="รหัสผ่านใหม่" />
                </Form.Item>{' '}
                <Form.Item
                  name="confirmPassword"
                  label="ยืนยันรหัสผ่านใหม่"
                  normalize={(value) => value.trim()}
                  rules={[
                    getRule(FormRule.REQUIRE, 'กรุณากรอกยืนยันรหัสผ่าน'),
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (value && getFieldValue('password') !== value)
                          return Promise.reject('รหัสผ่านไม่ตรงกัน');
                        return Promise.resolve();
                      }
                    })
                  ]}
                >
                  <InputPasswordForm placeholder="ยืนยันรหัสผ่าน" />
                </Form.Item>
              </React.Fragment>
            </div>
            <div
              css={css`
                width: 100%;
                position: relative;
                height: 100%;
              `}
            >
              <PrimaryButton
                type="primary"
                htmlType="submit"
                css={css`
                  position: absolute;
                  width: 100px;
                  min-width: 100px;
                  right: 0;

                  ${mediaQueryTablet} {
                    top: 30px;
                    bottom: unset;
                  }
                `}
              >
                สำเร็จ
              </PrimaryButton>
            </div>
          </Form>
        </div>
      ) : (
        <Loading height="calc(100vh - 265px)" />
      )}
    </React.Fragment>
  );
});
