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
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryTablet,
  mediaQueryDesktop
} from 'styles/variables';
import { Loading } from 'components/Loading/Loading';
import { useUser } from 'hooks/user/useUser';

export const EditPasswordPage = observer(() => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);
  const { me, setMe, loginType } = userStore;
  const { data: user, execute: getUser } = useUser();

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
              display: flex;
              flex-direction: column;

              .ant-form-item-control-input {
                width: 500px;
                margin-bottom: 15px;
              }

              ${mediaQueryTablet} {
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
              {loginType === 'password' && (
                <React.Fragment>
                  {/* <Form.Item name="prevPassword" label="รหัสผ่านปัจจุบัน">
                    <Input
                      placeholder="รหัสผ่านปัจจุบัน"
                      style={{ height: '40px', borderRadius: '12px' }}
                    />
                  </Form.Item> */}
                  <Form.Item
                    name="password"
                    label="รหัสผ่านใหม่"
                    rules={[
                      { required: true, message: 'กรุณากรอกรหัสผ่านใหม่' }
                    ]}
                  >
                    <Input.Password
                      placeholder="รหัสผ่านใหม่"
                      style={{ height: '40px', borderRadius: '12px' }}
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
                      style={{ height: '40px', borderRadius: '12px' }}
                    />
                  </Form.Item>
                </React.Fragment>
              )}
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

                  ${mediaQueryTablet} {
                    width: 120px;
                    right: 0;
                    height: 35px;
                    font-size: 16px;
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
        <Loading />
      )}
    </React.Fragment>
  );
});
