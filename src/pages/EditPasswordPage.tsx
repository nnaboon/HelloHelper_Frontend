/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { getAuth, updatePassword } from 'firebase/auth';
import { FormRule, getRule } from 'utils/form/getRule';
import { Text } from 'components/Text';
import { Button, Form, Input, message, Divider } from 'antd';
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
  const { data: user, execute: getUser } = useUser();

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
              .ant-form-item {
                margin-bottom: 45px;
              }

              .ant-form-item-label > label {
                font-size: 1.68rem;
              }

              .ant-checkbox + span {
                font-size: 2rem;
              }

              .ant-checkbox-inner {
                width: 30px;
                height: 30px;
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

                .ant-checkbox + span {
                  font-size: 16px;
                }

                .ant-checkbox-inner {
                  width: 16px;
                  height: 16px;
                }
              }

              ${mediaQueryLargeDesktop} {
                .ant-form-item {
                  margin-bottom: 24px;
                }

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
                  <Input.Password
                    placeholder="รหัสผ่านใหม่"
                    style={{
                      height: isLargeDesktop ? '40px' : '70px',
                      fontSize: isLargeDesktop ? '14px' : '1.8rem',
                      borderRadius: '12px'
                    }}
                    css={css`
                      font-size: 1.8rem;

                      ${mediaQueryLargeDesktop} {
                        font-size: 14px;
                      }
                    `}
                  />
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
                  <Input.Password
                    placeholder="ยืนยันรหัสผ่าน"
                    style={{
                      height: isLargeDesktop ? '40px' : '70px',
                      fontSize: isLargeDesktop ? '14px' : '1.8rem',
                      borderRadius: '12px'
                    }}
                  />
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
                  color: #ffff;
                  font-size: 16px;
                  position: absolute;
                  right: 0;
                  &:hover {
                    background: #ee6400;
                  }
                  bottom: 0;

                  ${mediaQueryTablet} {
                    width: 120px;
                    right: 0;
                    height: 35px;
                    font-size: 16px;
                    top: 30px;
                    bottom: unset;
                  }

                  ${mediaQueryMobile} {
                    width: 100px;
                  }
                `}
              >
                สำเร็จ
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <Loading height="calc(100vh - 265px)" />
      )}
    </React.Fragment>
  );
});
