/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useLocation } from 'react-router-dom';
import { Collapse, message } from 'antd';
import Flex from 'components/Flex/Flex';

import { useWaitForConfirmOrders } from 'hooks/order/useWaitForConfirmOrder';
import { EmptyData } from 'components/Empty/EmptyData';
import {
  mediaQueryLargeDesktop,
  mediaQueryMobile,
  mediaQueryTablet
} from 'styles/variables';
import { Button } from 'antd/lib/radio';
import { useDeleteConfirmOrder } from 'hooks/order/useDeleteConfirmOrder';
import { useDeletedProvidedUserId } from 'hooks/request/useDeleteProvidedUserId';
import { useUpdateOrder } from 'hooks/order/useUpdateOrder';

interface WaitingToConfirmOrdersProps {
  waitConfirmOrder: any;
  setWaitConfirmOrder: (waitConfirmOrder: any) => void;
}

const ChatOnline = styled.div`
  flex: 3;
  height: 100%;
  overflow-y: scroll;

  ${mediaQueryMobile} {
    flex: 1px;
  }
`;

const OrderDetail = styled.p`
  font-size: 1.5rem;
  color: black;

  ${mediaQueryLargeDesktop} {
    font-size: 14px;
  }
`;

const OrderTitle = styled.p`
  font-size: 1.5rem;
  color: black;
  margin-right: 30px;

  ${mediaQueryLargeDesktop} {
    font-size: 14px;
    margin-right: 20px;
  }
`;

export const WaitingToConfirmOrders = ({
  waitConfirmOrder,
  setWaitConfirmOrder
}: WaitingToConfirmOrdersProps) => {
  const [orders, setOrders] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const { pathname } = useLocation();
  const chatId = pathname.split('/')[2];
  const { Panel } = Collapse;

  const { execute: getWaitConfirmOrder } = useWaitForConfirmOrders();

  const { execute: deleteConfirmOrder } = useDeleteConfirmOrder();
  const { execute: deletedProvidedUser } = useDeletedProvidedUserId();

  const { execute: updateConfirmOrder } = useUpdateOrder();

  // useEffect(() => {
  //   if (chatId) {
  //     getWaitConfirmOrder(chatId);
  //     setOrders(waitConfirmOrder);
  //     setCurrentChat(chatId);
  //   }
  // }, [chatId]);

  return (
    <ChatOnline>
      <Collapse
        css={css`
          height: 100%;

          .ant-collapse {
            height: 100%;
          }

          .ant-collapse > .ant-collapse-item > .ant-collapse-header {
            font-size: 34px !important;
          }
        `}
      >
        {waitConfirmOrder?.length > 0 ? (
          waitConfirmOrder.map(
            ({
              id,
              orderReferenceId,
              title,
              location,
              payment,
              price,
              serviceCharge,
              number,
              providerUserId,
              receiver
            }) => (
              <Panel
                header={title}
                key={id}
                css={css`
                  .ant-collapse-header {
                    font-size: 1.5rem;

                    ${mediaQueryLargeDesktop} {
                      font-size: 16px;
                    }
                  }
                `}
              >
                <Flex itemAlign="center">
                  <OrderTitle>ชื่อความช่วยเหลือ</OrderTitle>
                  <OrderDetail>{title}</OrderDetail>
                </Flex>
                <Flex>
                  <OrderTitle>สถานที่</OrderTitle>
                  <OrderDetail>{location.name}</OrderDetail>
                </Flex>{' '}
                <Flex>
                  <OrderTitle>จำนวน</OrderTitle>
                  <OrderDetail>{number}</OrderDetail>
                </Flex>
                <Flex>
                  <OrderTitle>ราคา</OrderTitle>
                  <OrderDetail>{price} บาท</OrderDetail>
                </Flex>
                <Flex>
                  <OrderTitle>ค่าบริการ</OrderTitle>
                  <OrderDetail>{serviceCharge} บาท</OrderDetail>
                </Flex>
                <Flex>
                  <OrderTitle>ช่องทางการชำระเงิน</OrderTitle>
                  <OrderDetail>{payment}</OrderDetail>
                </Flex>
                <Flex itemAlign="flex-start">
                  <OrderTitle>ที่อยู่จัดส่ง</OrderTitle>
                  {Object.keys(receiver).length > 0 ? (
                    <div>
                      <OrderDetail>{receiver.name}</OrderDetail>
                      <OrderDetail>{receiver.phoneNumber}</OrderDetail>
                      <OrderDetail>{receiver.address}</OrderDetail>
                    </div>
                  ) : (
                    <p>-</p>
                  )}
                </Flex>
                {window.localStorage.getItem('id') === providerUserId && (
                  <Flex justify="flex-end">
                    <Button
                      type="primary"
                      css={css`
                        width: 100px;
                        height: 35px;
                        box-sizing: border-box;
                        border: 1px solid #ee6400 !important;

                        border-radius: 9px !important;
                        text-align: center;
                        border: 0;
                        right: 0;
                        color: #ee6400;
                        font-size: 16px;

                        &:hover {
                          background: #ffff;
                          color: #ee6400;
                          box-shadow: 0px 0px 20px 8px rgba(255, 135, 48, 0.21);
                        }

                        ${mediaQueryTablet} {
                          width: 80px;
                          right: 0;
                        }
                        ${mediaQueryMobile} {
                          width: 7px;
                        }
                      `}
                      onClick={() => {
                        deletedProvidedUser(orderReferenceId);
                        deleteConfirmOrder(id)
                          .then(() => {
                            message.success('สำเร็จ');
                            getWaitConfirmOrder(chatId).then((res) =>
                              setWaitConfirmOrder(res.data)
                            );
                          })
                          .catch(() => message.error('ไม่สำเร็จ'));
                      }}
                    >
                      ปฏิเสธ
                    </Button>
                    <Button
                      type="primary"
                      css={css`
                        width: 100px;
                        height: 35px;
                        box-sizing: border-box;
                        background: #ee6400;
                        border-radius: 9px !important;
                        text-align: center;
                        border: 0;
                        right: 0;
                        color: #ffff;
                        font-size: 16px;
                        // position: absolute;
                        margin-left: 20px;

                        &:hover {
                          background: #ee6400;
                          color: #ffff;
                          box-shadow: 0px 0px 20px 8px rgba(255, 135, 48, 0.21);
                        }

                        &:before {
                          background: transparent !important;
                        }

                        ${mediaQueryTablet} {
                          width: 80px;
                          right: 0;
                        }

                        ${mediaQueryMobile} {
                          width: 70px;
                        }
                      `}
                      onClick={() => {
                        updateConfirmOrder(id, { status: 'pending' })
                          .then(() => {
                            message.success('สำเร็จ');
                            getWaitConfirmOrder(chatId).then((res) =>
                              setWaitConfirmOrder(res.data)
                            );
                          })
                          .catch(() => message.error('ไม่สำเร็จ'));
                      }}
                    >
                      ยืนยัน
                    </Button>
                  </Flex>
                )}
              </Panel>
            )
          )
        ) : (
          <EmptyData
            text="ไม่พบออเดอร์ที่รอการยืนยัน"
            height="calc(100vh - 236px)"
            css={css`
              ${mediaQueryMobile} {
                height: 100%;
              }
            `}
          />
        )}
      </Collapse>
    </ChatOnline>
  );
};
