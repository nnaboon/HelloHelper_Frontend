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
import './waitingToConfirmOrders.css';
import {
  mediaQueryLargeDesktop,
  mediaQueryMobile,
  mediaQueryTablet
} from 'styles/variables';
import { Button } from 'antd/lib/radio';
import { useDeleteConfirmOrder } from 'hooks/order/useDeleteConfirmOrder';
import { useUpdateOrder } from 'hooks/order/useUpdateOrder';

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

export default function WaitingToConfirmOrders({ onlineUsers, currentId }) {
  const [orders, setOrders] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const { pathname } = useLocation();
  const chatId = pathname.split('/')[2];
  const { Panel } = Collapse;

  const { data: waitConfirmOrder, execute: getWaitConfirmOrder } =
    useWaitForConfirmOrders();

  const { execute: deleteConfirmOrder } = useDeleteConfirmOrder();
  const { execute: updateConfirmOrder } = useUpdateOrder();

  useEffect(() => {
    if (chatId) {
      getWaitConfirmOrder(chatId);
      setOrders(waitConfirmOrder);
      setCurrentChat(chatId);
    }
  }, [chatId]);

  return (
    <div className="chatOnline">
      <Collapse>
        {waitConfirmOrder?.length > 0 ? (
          waitConfirmOrder.map(
            ({
              id,
              title,
              location,
              payment,
              price,
              serviceCharge,
              number,
              providerUserId,
              receiver
            }) => (
              <Panel header={title} key={id}>
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
                <Flex itemAlign="start">
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
                      htmlType="submit"
                      css={css`
                        width: 165px;
                        height: 35px;
                        box-sizing: border-box;
                        border: 1px solid #ee6400 !important;

                        border-radius: 9px;
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
                          width: 150px;
                          right: 0;
                        }
                        ${mediaQueryMobile} {
                          width: 144px;
                        }
                      `}
                      onClick={() => {
                        deleteConfirmOrder(id)
                          .then(() => {
                            message.success('สำเร็จ');
                            getWaitConfirmOrder(chatId);
                          })
                          .catch(() => message.error('ไม่สำเร็จ'));
                      }}
                    >
                      ปฏิเสธการช่วยเหลือ
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      css={css`
                        width: 165px;
                        height: 35px;
                        box-sizing: border-box;
                        background: #ee6400;
                        border-radius: 9px;
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

                        ${mediaQueryTablet} {
                          width: 150px;
                          right: 0;
                        }
                        ${mediaQueryMobile} {
                          width: 144px;
                        }
                      `}
                      onClick={() => {
                        updateConfirmOrder(id, { status: 'pending' })
                          .then(() => {
                            message.success('สำเร็จ');
                            getWaitConfirmOrder(chatId);
                          })
                          .catch(() => message.error('ไม่สำเร็จ'));
                      }}
                    >
                      ยืนยันการช่วยเหลือ
                    </Button>
                  </Flex>
                )}
              </Panel>
            )
          )
        ) : (
          <EmptyData text="ไม่พบออเดอร์ที่รอการยืนยัน" />
        )}
      </Collapse>
    </div>
  );
}
