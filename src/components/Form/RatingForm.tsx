/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Text } from 'components/Text';
import { useLocation } from 'react-router-dom';
import { Rate, Form, Modal, Button, message } from 'antd';
import { mediaQueryLargeDesktop, mediaQueryMobile } from 'styles/variables';
import { useUpdateProvideSum } from 'hooks/order/useUpdateProvideSum';
import { useUpdateRequestSum } from 'hooks/order/useUpdateRequestSum';
import { useUpdateOrder } from 'hooks/order/useUpdateOrder';
import { useMyRequestOrder } from 'hooks/order/useMyRequestOrder';
import { PrimaryButton } from '../Button/Button';

interface RatingFormProps {
  order: any;
  setIsModalVisible: (isModalvisible: boolean) => void;
  setStatus?: (status: string) => void;
}

const RequestListSection = styled.div`
  padding: 1.75rem 2.75rem 1.5rem 2.75rem;
  position: relative;
  height: 100%;
`;

export const RatingForm = ({
  order,
  setIsModalVisible,
  setStatus
}: RatingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { pathname } = useLocation();
  const orderType = pathname.split('/')[2];
  const { execute: updateOrder } = useUpdateOrder();

  const { data: requestOrders, execute: getRequestOrders } =
    useMyRequestOrder();
  const { execute: updateProvideSum } = useUpdateProvideSum();
  const { execute: updateRequestSum } = useUpdateRequestSum();
  const [form] = Form.useForm();

  const onFinish = async (value) => {
    setIsSubmitting(true);
    const data = {
      rating: value.rating
    };

    try {
      if (order.referenceType === 'request') {
        updateRequestSum(order?.id, {
          orderReferenceId: order?.orderReferenceId,
          requesterUserId: order?.requesterUserId,
          providerUserId: order?.providerUserId,
          rating: value.rating
        }).then(() => {
          if (setStatus) {
            setStatus('complete');
          }
          message.success('ให้คะแนนสำเร็จ');
          form.resetFields();
          setIsModalVisible(false);
        });
      } else {
        updateProvideSum(order?.id, {
          orderReferenceId: order?.orderReferenceId,
          requesterUserId: order?.requesterUserId,
          providerUserId: order?.providerUserId,
          rating: value.rating
        }).then(() => {
          if (setStatus) {
            setStatus('complete');
          }
          message.success('ให้คะแนนสำเร็จ');
          form.resetFields();
          setIsModalVisible(false);
        });
      }
    } catch (e) {
      message.error('ไม่สามารถให้คะแนนความช่วยเหลือได้');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RequestListSection>
      <Text
        fontWeight={500}
        marginTop="-5px"
        marginBottom="5px"
        css={css`
          font-size: 24px;

          ${mediaQueryLargeDesktop} {
            font-size: 20px;
          }

          ${mediaQueryMobile} {
            font-size: 20px;
          }
        `}
      >
        ให้คะแนน
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
          .ant-row {
            justify-content: center;
            width: 100%;
            margin: 15px 0;
          }

          .ant-rate {
            display: flex;
          }

          ${mediaQueryMobile} {
            .ant-rate {
              display: flex;
              justify-content: center;
            }
          }
        `}
      >
        <Form.Item name="rating">
          <Rate
            allowHalf
            css={css`
              margin-top: 15px;

              .ant-rate-star.ant-rate-star-full svg {
                width: 40px;
                height: 40px;
              }
              .ant-rate-star.ant-rate-star-zero svg {
                width: 40px;
                height: 40px;
              }

              .ant-rate-star.ant-rate-star-half.ant-rate-star-active svg {
                width: 40px;
                height: 40px;
              }

              .ant-rate-star.ant-rate-star-full,
              .ant-rate-star.ant-rate-star-zero,
              .ant-rate-star.ant-rate-star-half.ant-rate-star-active {
                transition: transform 0s;
              }

              .ant-rate-star.ant-rate-star-half.ant-rate-star-active:hover {
                transform: scale(0.91);
              }

              .ant-rate-star.ant-rate-star-full:hover {
                transform: scale(0.91);
              }

              .ant-rate-star.ant-rate-star-zero:hover {
                transform: scale(0.91);
              }

              ${mediaQueryLargeDesktop} {
                margin-top: 0;

                .ant-rate-star.ant-rate-star-full svg {
                  width: 30px;
                  height: 30px;
                }
                .ant-rate-star.ant-rate-star-zero svg {
                  width: 30px;
                  height: 30px;
                }

                .ant-rate-star.ant-rate-star-half.ant-rate-star-active svg {
                  width: 30px;
                  height: 30px;
                }
              }

              ${mediaQueryMobile} {
                margin-top: 0;

                .ant-rate-star.ant-rate-star-full svg {
                  width: 30px;
                  height: 30px;
                }
                .ant-rate-star.ant-rate-star-zero svg {
                  width: 30px;
                  height: 30px;
                }

                .ant-rate-star.ant-rate-star-half.ant-rate-star-active svg {
                  width: 30px;
                  height: 30px;
                }
              }
            `}
          />
        </Form.Item>
        <PrimaryButton
          type="primary"
          htmlType="submit"
          css={css`
            width: 90px;
            position: absolute;
            bottom: 0px;
            right: 20px;
          `}
        >
          ตกลง
        </PrimaryButton>{' '}
      </Form>
    </RequestListSection>
  );
};
