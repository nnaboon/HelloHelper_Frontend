/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Flex from 'components/Flex/Flex';
import { useHistory, useLocation } from 'react-router-dom';
import { STATUS_MAPPER } from 'components/Button/const';
import { StatusType } from 'components/Button/const';
import { Menu, Dropdown, message, Form, Modal, Divider } from 'antd';
import { StatusBadge } from 'components/Badge/StatusBadge';
import { RatingForm } from 'components/Form/RatingForm';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';
import { useUpdateOrder } from 'hooks/order/useUpdateOrder';
import {
  mediaQueryMobile,
  useMedia,
  MOBILE_WIDTH,
  SMALL_TABLET_WIDTH,
  TABLET_WIDTH,
  LARGE_DESKTOP_WIDTH,
  mediaQuerySmallTablet,
  mediaQueryTablet,
  mediaQueryLargeDesktop
} from 'styles/variables';
import { useOrder } from 'hooks/order/useOrder';
import { OrderProps } from 'data/order';

type ProvideListCardProps = {
  props: OrderProps;
  setStatus: (status: string) => void;
};

const ProvideListContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 410px;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  margin-top: 20px;
  padding: 20px 30px 30px 30px;

  ${mediaQueryLargeDesktop} {
    min-height: 310px;
  }

  ${mediaQueryTablet} {
    width: 100%;
    padding: 20px;
  }

  ${mediaQueryMobile} {
    padding: 20px 15px;
  }
`;

const ProvideListContent = styled.div`
  text-align: start;
  cursor: pointer;

  ${mediaQueryMobile} {
    display: flex;
    flex-direction: column;
  }
`;

const ProvideListTitle = styled.div`
  width: max-content;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 20px;
  text-align: right;
  color: #b9b9b9;
  text-align: end;
  margin-right: 20px;

  ${mediaQueryLargeDesktop} {
    font-size: 14px;
    width: 130px;
  }
  ${mediaQueryMobile} {
    text-align: start;
  }
`;

const ProvideListData = styled.div`
  font-weight: 500;
  font-size: 1.84rem;
  color: rgba(0, 0, 0, 0.54);

  ${mediaQueryLargeDesktop} {
    font-size: 16px;
  }

  ${mediaQueryMobile} {
    font-size: 16px;
    width: 185px;
    -webkit-line-clamp: 1;
  }
`;

export const ProvideListCard = ({ props, setStatus }: ProvideListCardProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { execute: updateOrder } = useUpdateOrder();
  const { data: order, execute: getOrder } = useOrder();
  const history = useHistory();
  const { pathname } = useLocation();
  const query = pathname.split('/')[3];

  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isLargeDesktop = useMedia(`(max-width: ${LARGE_DESKTOP_WIDTH}px)`);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          if (props.status !== 'pending') {
            try {
              updateOrder(props.id, { status: 'pending' }).then(() => {
                setStatus('pending');
              });
            } catch (error) {
              message.error('ไม่สามาถเปลี่ยนสถานะได้');
            } finally {
              message.success('สำเร็จ');
            }
          }
        }}
      >
        รอดำเนินการ
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          if (props.status !== 'progress') {
            try {
              updateOrder(props.id, { status: 'progress' }).then(() => {
                setStatus('progress');
              });
            } catch (error) {
              message.error('ไม่สามาถเปลี่ยนสถานะได้');
            } finally {
              message.success('สำเร็จ');
            }
          }
        }}
      >
        กำลังดำเนินการ
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          if (props.status !== 'complete') {
            try {
              updateOrder(props.id, { status: 'complete' }).then(() => {
                setStatus('complete');
              });
            } catch (error) {
              message.error('ไม่สามาถเปลี่ยนสถานะได้');
            } finally {
              message.success('สำเร็จ');
            }
          }
        }}
      >
        สำเร็จ
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          if (props.status !== 'cancel') {
            try {
              updateOrder(props.id, { status: 'cancel' }).then(() => {
                setStatus('cancel');
              });
            } catch (error) {
              message.error('ไม่สามาถเปลี่ยนสถานะได้');
            } finally {
              message.success('สำเร็จ');
            }
          }
        }}
      >
        ยกเลิก
      </Menu.Item>
    </Menu>
  );

  return (
    <ProvideListContainer>
      <StatusBadge
        status={STATUS_MAPPER[props.status].status}
        color={STATUS_MAPPER[props.status].color}
        style={{ position: 'absolute', right: '20px', top: '20px' }}
      />
      <ProvideListContent
        onClick={() => {
          history.push(`/order/provide/${props.id}`);
        }}
      >
        {/* <Flex itemAlign="flex-start"> */}
        {/* <ProvideListTitle>ชื่อความช่วยเหลือ</ProvideListTitle> */}
        <ProvideListData
          css={css`
            font-weight: 700;
            font-size: 2.3rem;
            color: black;

            ${mediaQueryLargeDesktop} {
              font-size: 24px;
            }

            ${mediaQueryMobile} {
              font-size: 16px;
            }
          `}
        >
          {props.title}
        </ProvideListData>
        {/* </Flex> */}
        <Flex itemAlign="flex-start" marginY="4px">
          {/* <ProvideListTitle>สถานที่ให้ความข่วยเหลือ</ProvideListTitle> */}
          <ProvideListData>{props.location.name}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start" marginY="4px">
          {/* <ProvideListTitle>จำนวน</ProvideListTitle> */}
          <ProvideListData>x{props.number}</ProvideListData>
        </Flex>
        {/* <Flex itemAlign="flex-start">
          <ProvideListTitle>ราคาสินค้าทั้งหมด</ProvideListTitle>
          <ProvideListData>{props.price} บาท</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>อัตราค่าบริการ</ProvideListTitle>
          <ProvideListData>{props.serviceCharge} บาท</ProvideListData>
        </Flex> */}
        <Flex itemAlign="flex-start" marginY="4px">
          {/* <ProvideListTitle>ข้อความ</ProvideListTitle> */}
          <ProvideListData>{props.description}</ProvideListData>
        </Flex>
        {/* <Flex itemAlign="flex-start">
          <ProvideListTitle>รูปแบบการชำระเงิน</ProvideListTitle>
          <ProvideListData>{props.payment}</ProvideListData>
        </Flex> */}
        {/* <Flex itemAlign="flex-end" justify="flex-end">
          <ProvideListTitle>ราคาสินค้า</ProvideListTitle>
          <ProvideListData
            css={css`
              width: unset;
              font-size: 24px;
              color: black;
            `}
          >
            ฿{props.price}
          </ProvideListData>
        </Flex>
        <Flex itemAlign="flex-end" justify="flex-end">
          <ProvideListTitle>อัตราค่าบริการ</ProvideListTitle>
          <ProvideListData
            css={css`
              width: unset;
              font-size: 24px;
              color: black;
            `}
          >
            ฿{props.serviceCharge}
          </ProvideListData>
        </Flex> */}
        <Divider style={{ margin: '18px' }} />
        <Flex itemAlign="center" justify="flex-end">
          <ProvideListTitle>ยอดคำสั่งซื้อทั้งหมด</ProvideListTitle>
          <ProvideListData
            css={css`
              width: unset;
              font-size: 1.9rem;
              font-weight: 600;
              color: black;

              ${mediaQueryLargeDesktop} {
                font-size: 24px;
              }
            `}
          >
            ฿{props.serviceCharge + props.price}
          </ProvideListData>
        </Flex>
      </ProvideListContent>

      {props.status === StatusType.COMPLETE ? (
        <Flex
          css={css`
            position: absolute;
            right: 20px;
            bottom: 20px;
            width: max-content;

            ${mediaQueryMobile} {
              position: relative;
              bottom: 0;
              right: 0;
              width: 100%;
              justify-content: space-between;
              margin-top: 20px;
            }
          `}
        >
          <PrimaryButton
            css={css`
              min-width: 160px;
              background: #0047ff;

              ${mediaQueryMobile} {
                min-width: 47%;
                width: 47%;
              }
            `}
            onClick={() => {
              history.push(`/chat/${props.chatId}`);
            }}
          >
            แชท
          </PrimaryButton>
        </Flex>
      ) : (
        <Flex
          css={css`
            position: absolute;
            right: 20px;
            bottom: 20px;
            width: max-content;

            ${mediaQueryMobile} {
              position: relative;
              bottom: 0;
              right: 0;
              width: 100%;
              justify-content: space-between;
              margin-top: 20px;
            }
          `}
        >
          <PrimaryButton
            onClick={() => {
              history.push(`/chat/${props.chatId}`);
            }}
            css={css`
              background: #0047ff;
              min-width: 210px;
              height: 52px;
              max-width: 550px;
              font-size: 1.6rem;

              ${mediaQueryLargeDesktop} {
                min-width: 150px;
              }

              ${mediaQueryTablet} {
                min-width: 170px;
              }

              ${mediaQueryMobile} {
                min-width: 47%;
                width: 47%;
              }
            `}
          >
            แชท
          </PrimaryButton>
          <Dropdown overlay={menu}>
            <PrimaryButton
              css={css`
                min-width: 210px;
                height: 52px;
                max-width: 550px;
                font-size: 1.6rem;

                ${mediaQueryLargeDesktop} {
                  min-width: 150px;
                }

                ${mediaQueryTablet} {
                  min-width: 170px;
                }

                ${mediaQueryMobile} {
                  min-width: 47%;
                  width: 47%;
                }
              `}
            >
              เปลี่ยนสถานะ
            </PrimaryButton>
          </Dropdown>
        </Flex>
      )}
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={isMobile ? '400px' : isLargeDesktop ? '400px' : '25%'}
        maskClosable={false}
        centered
        css={css`
          .ant-modal-content {
            height: 320px;
          }

          .ant-modal-body {
            height: 100%;
          }

          ${mediaQueryLargeDesktop} {
            .ant-modal-content {
              height: 220px;
            }
          }
        `}
      >
        <RatingForm />
      </Modal>
    </ProvideListContainer>
  );
};
