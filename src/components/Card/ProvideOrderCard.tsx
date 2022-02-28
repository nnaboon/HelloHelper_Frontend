/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import Flex from 'components/Flex/Flex';
import { useHistory } from 'react-router-dom';
import { STATUS_MAPPER } from 'components/Button/const';
import { StatusType } from 'components/Button/const';
import { Menu, Dropdown, message, Form, Modal, Divider } from 'antd';
import { StatusBadge } from 'components/Badge/StatusBadge';
import { RatingForm } from 'components/Form/RatingForm';
import { PrimaryButton } from 'components/Button/Button';
import { useUpdateOrder } from 'hooks/order/useUpdateOrder';
import {
  mediaQueryMobile,
  useMedia,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  LARGE_DESKTOP_WIDTH,
  mediaQueryTablet,
  mediaQueryLargeDesktop
} from 'styles/variables';
import { OrderProps } from 'data/order';

type ProvideListCardProps = {
  props: OrderProps;
  setStatus: (status: string) => void;
};

const ProvideListContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 300px;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  margin-top: 20px;
  padding: 30px 40px;

  ${mediaQueryLargeDesktop} {
    min-height: 290px;
  }

  ${mediaQueryTablet} {
    width: 100%;
    padding: 20px;
    min-height: 280px;
  }

  ${mediaQueryMobile} {
    min-height: 265px;
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
  font-weight: 400;
  font-size: 14px;
  text-align: right;
  color: #b9b9b9;
  text-align: end;
  margin-right: 15px;

  ${mediaQueryMobile} {
    text-align: start;
  }
`;

const ProvideListData = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.54);

  ${mediaQueryMobile} {
    font-size: 16px;
    -webkit-line-clamp: 1;
  }
`;

export const ProvideOrderCard = ({
  props,
  setStatus
}: ProvideListCardProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { execute: updateOrder } = useUpdateOrder();
  const history = useHistory();

  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);
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
        style={{ position: 'absolute', right: isTablet ? '20px' : '40px' }}
        css={css`
          top: 20px;

          ${mediaQueryTablet} {
            top: 0;
            right: 20px;
          }
        `}
      />
      <ProvideListContent
        onClick={() => {
          history.push(`/order/provide/${props.id}`);
        }}
      >
        <ProvideListData
          css={css`
            font-weight: 700;
            font-size: 24px;
            color: black;

            ${mediaQueryLargeDesktop} {
              font-size: 20px;
            }

            ${mediaQueryMobile} {
              font-size: 16px;
              width: 60%;
            }
          `}
        >
          {props.title}
        </ProvideListData>

        <Flex itemAlign="flex-start" marginY="4px">
          <ProvideListData>{props.location.name}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start" marginY="4px">
          <ProvideListData>x{props.number}</ProvideListData>
        </Flex>

        <Flex itemAlign="flex-start" marginY="4px">
          <ProvideListData>{props.description}</ProvideListData>
        </Flex>
        <Divider style={{ margin: '18px' }} />
        <Flex itemAlign="center" justify="flex-end">
          <ProvideListTitle>จำนวนคำสั่งซื้อทั้งหมด</ProvideListTitle>
          <ProvideListData
            css={css`
              width: unset;
              font-size: 24px;
              font-weight: 600;
              color: black;

              ${mediaQueryLargeDesktop} {
                font-size: 22px;
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
              background: #0047ff;
              border-color: #0047ff;

              &:hover {
                background: #0047ff;
                border-color: #0047ff;
              }

              &:focus {
                background: #0047ff;
                border-color: #0047ff;
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
              border-color: #0047ff;

              &:hover {
                background: #0047ff;
                border-color: #0047ff;
              }

              &:focus {
                background: #0047ff;
                border-color: #0047ff;
              }

              ${mediaQueryMobile} {
                margin-right: 15px;
              }
            `}
          >
            แชท
          </PrimaryButton>
          <Dropdown overlay={menu} trigger={['click']}>
            <PrimaryButton>เปลี่ยนสถานะ</PrimaryButton>
          </Dropdown>
        </Flex>
      )}
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={isMobile ? '350px' : isLargeDesktop ? '400px' : '25%'}
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
        <RatingForm order={props} setIsModalVisible={setIsModalVisible} />
      </Modal>
    </ProvideListContainer>
  );
};
