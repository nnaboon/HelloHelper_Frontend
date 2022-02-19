/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import Flex from 'components/Flex/Flex';
import { STATUS_MAPPER } from 'components/Button/const';
import { StatusType } from 'components/Button/const';
import { Form, Modal, message, Divider } from 'antd';
import { StatusBadge } from 'components/Badge/StatusBadge';
import { RequestListProps } from 'data/request';
import { PrimaryButton, SecondaryButton } from '../Button/Button';
import { RatingForm } from 'components/Form/RatingForm';
import {
  mediaQueryMobile,
  useMedia,
  MOBILE_WIDTH,
  SMALL_TABLET_WIDTH,
  TABLET_WIDTH,
  LARGE_DESKTOP_WIDTH,
  mediaQuerySmallTablet,
  mediaQueryLargeDesktop,
  mediaQueryTablet
} from 'styles/variables';
import { OrderProps } from 'data/order';

type RequestListCardProps = {
  props: OrderProps;
};

const RequestListContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 310px;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  margin-top: 20px;
  padding: 30px 40px;

  ${mediaQueryTablet} {
    width: 100%;
    padding: 20px;
  }

  ${mediaQueryMobile} {
    padding: 20px 15px;
  }
`;

const RequestListContent = styled.div`
  text-align: start;
  cursor: pointer;

  ${mediaQueryMobile} {
    display: flex;
    flex-direction: column;
  }
`;

const RequestListTitle = styled.div`
  font-weight: 400;
  font-size: 14px;
  text-align: right;
  color: #b9b9b9;
  text-align: end;
  margin-right: 20px;

  ${mediaQueryMobile} {
    text-align: start;
  }
`;

const RequestListData = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.54);

  ${mediaQueryMobile} {
    font-size: 16px;
    width: 185px;
    -webkit-line-clamp: 1;
  }
`;

export const RequestListCard = ({ props }: RequestListCardProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form] = Form.useForm();

  const history = useHistory();
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isLargeDesktop = useMedia(`(max-width: ${LARGE_DESKTOP_WIDTH}px)`);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (value) => {
    setIsSubmitting(true);
    const data = {
      rating: value.rating
    };

    try {
      console.log('data', data);
    } catch (e) {
      message.error('ไม่สามารถโพสต์ขอความช่วยเหลือได้');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RequestListContainer>
      <StatusBadge
        status={STATUS_MAPPER[props.status].status}
        color={STATUS_MAPPER[props.status].color}
        style={{ position: 'absolute', right: '40px', top: '34px' }}
      />
      <RequestListContent
        onClick={() => {
          history.push(`/order/request/${props.id}`);
        }}
      >
        {/* <Flex itemAlign="flex-start"> */}
        {/* <RequestListTitle>ชื่อความช่วยเหลือ</RequestListTitle> */}
        <RequestListData
          css={css`
            font-weight: 700;
            font-size: 24px;
            color: black;

            ${mediaQueryMobile} {
              font-size: 16px;
            }
          `}
        >
          {props.title}
        </RequestListData>
        {/* </Flex> */}
        <Flex itemAlign="flex-start" marginY="4px">
          {/* <RequestListTitle>สถานที่ให้ความข่วยเหลือ</RequestListTitle> */}
          <RequestListData>{props.location.name}</RequestListData>
        </Flex>
        <Flex itemAlign="flex-start" marginY="4px">
          {/* <RequestListTitle>จำนวน</RequestListTitle> */}
          <RequestListData>x{props.number}</RequestListData>
        </Flex>
        {/* <Flex itemAlign="flex-start">
          <RequestListTitle>ราคาสินค้าทั้งหมด</RequestListTitle>
          <RequestListData>{props.price} บาท</RequestListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <RequestListTitle>อัตราค่าบริการ</RequestListTitle>
          <RequestListData>{props.serviceCharge} บาท</RequestListData>
        </Flex> */}
        <Flex itemAlign="flex-start" marginY="4px">
          {/* <RequestListTitle>ข้อความ</RequestListTitle> */}
          <RequestListData>{props.description}</RequestListData>
        </Flex>
        {/* <Flex itemAlign="flex-start">
          <RequestListTitle>รูปแบบการชำระเงิน</RequestListTitle>
          <RequestListData>{props.payment}</RequestListData>
        </Flex> */}
        {/* <Flex itemAlign="flex-end" justify="flex-end">
          <RequestListTitle>ราคาสินค้า</RequestListTitle>
          <RequestListData
            css={css`
              width: unset;
              font-size: 24px;
              color: black;
            `}
          >
            ฿{props.price}
          </RequestListData>
        </Flex>
        <Flex itemAlign="flex-end" justify="flex-end">
          <RequestListTitle>อัตราค่าบริการ</RequestListTitle>
          <RequestListData
            css={css`
              width: unset;
              font-size: 24px;
              color: black;
            `}
          >
            ฿{props.serviceCharge}
          </RequestListData>
        </Flex> */}
        <Divider style={{ margin: '18px' }} />
        <Flex itemAlign="center" justify="flex-end">
          <RequestListTitle>จำนวนคำสั่งซื้อทั้งหมด</RequestListTitle>
          <RequestListData
            css={css`
              width: unset;
              font-size: 24px;
              font-weight: 600;
              color: black;
            `}
          >
            ฿{props.serviceCharge + props.price}
          </RequestListData>
        </Flex>
      </RequestListContent>
      {props.status === StatusType.WAITING ? (
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
          <SecondaryButton
            css={css`
              min-width: 150px;
              border: 1px solid #e00101;
              color: #e00101;

              ${mediaQueryMobile} {
                min-width: 47%;
                width: 47%;
              }
            `}
          >
            ยกเลิก
          </SecondaryButton>
          <PrimaryButton
            css={css`
              min-width: 150px;
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
          <SecondaryButton
            onClick={() => {
              history.push(`/chat/${props.chatId}`);
            }}
            css={css`
              min-width: 140px;
              height: 45px;
              z-index: 10;

              ${mediaQueryTablet} {
                min-width: 130px;
              }

              ${mediaQueryMobile} {
                min-width: 47%;
                width: 47%;
              }
            `}
          >
            แชท
          </SecondaryButton>
          {!props.rating && (
            <PrimaryButton
              css={css`
                min-width: 140px;
                height: 45px;
                z-index: 10;

                ${mediaQueryTablet} {
                  min-width: 130px;
                }

                ${mediaQueryMobile} {
                  min-width: 47%;
                  width: 47%;
                }
              `}
              onClick={() => {
                setIsModalVisible(true);
              }}
            >
              ให้คะแนน
            </PrimaryButton>
          )}
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
        <RatingForm order={props} setIsModalVisible={setIsModalVisible} />
      </Modal>
    </RequestListContainer>
  );
};
