/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import Flex from 'components/Flex/Flex';
import { STATUS_MAPPER } from 'components/Button/const';
import { StatusType } from 'components/Button/const';
import { Form, Modal, message } from 'antd';
import { StatusBadge } from 'components/Badge/StatusBadge';
import { RequestListProps } from 'data/request';
import { PrimaryButton, SecondaryButton } from '../Button/Button';
import { RatingForm } from 'components/Form/RatingForm';
import { useMedia, MOBILE_WIDTH, mediaQueryMobile } from 'styles/variables';
import { OrderProps } from 'data/order';
import { USER_DATA } from '../../data/user';

type RequestListCardProps = {
  props: OrderProps;
};

const RequestListContainer = styled.div`
  position: relative;
  width: 820px;
  min-height: 430px;
  background: #ffffff;
  border-top: 8px solid #ff8730;
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  margin-top: 20px;
  padding: 20px 30px 30px 30px;

  ${mediaQueryMobile} {
    width: 100%;
    padding: 20px;
  }
`;

const RequestListContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  margin-top: 40px;
  text-align: start;

  ${mediaQueryMobile} {
    display: flex;
    flex-direction: column;
  }
`;

const RequestListTitle = styled.div`
  width: 130px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
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
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  width: 200px;
`;

export const RequestListCard = ({ props }: RequestListCardProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form] = Form.useForm();
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

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
        style={{ position: 'absolute', right: '20px', top: '13px' }}
      />
      <RequestListContent>
        <Flex itemAlign="flex-start">
          <RequestListTitle>ชื่อความช่วยเหลือ</RequestListTitle>
          <RequestListData>{props.title}</RequestListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <RequestListTitle>สถานที่ให้ความข่วยเหลือ</RequestListTitle>
          <RequestListData>{props.location}</RequestListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <RequestListTitle>จำนวน</RequestListTitle>
          <RequestListData>{props.amount}</RequestListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <RequestListTitle>ราคาสินค้าทั้งหมด</RequestListTitle>
          <RequestListData>{props.price}</RequestListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <RequestListTitle>อัตราค่าบริการ</RequestListTitle>
          <RequestListData>{props.serviceCharge}</RequestListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <RequestListTitle>ข้อความ</RequestListTitle>
          <RequestListData>{props.description}</RequestListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <RequestListTitle>รูปแบบการชำระเงิน</RequestListTitle>
          <RequestListData>{props.payment}</RequestListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <RequestListTitle>ชื่อ-นามสกุลผู้ให้ความช่วยเหลือ</RequestListTitle>
          <RequestListData>
            {
              USER_DATA.find(({ userId }) => userId === props.providerUserId)
                .username
            }
          </RequestListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <RequestListTitle>เบอร์โทรศัพท์ผู้ให้ความช่วยเหลือ</RequestListTitle>
          <RequestListData>
            {' '}
            {
              USER_DATA.find(({ userId }) => userId === props.providerUserId)
                .phoneNumber
            }
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
            css={css`
              min-width: 180px;
              background: #0047ff;

              ${mediaQueryMobile} {
                min-width: 47%;
                width: 47%;
              }
            `}
          >
            แขท
          </PrimaryButton>
          <PrimaryButton
            css={css`
              min-width: 180px;

              ${mediaQueryMobile} {
                min-width: 47%;
                width: 47%;
              }
            `}
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            ยืนยันการรับสินค้า
          </PrimaryButton>
        </Flex>
      )}

      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={400}
        maskClosable={false}
        centered
        css={css`
          .ant-modal-content {
            height: 220px;
          }
        `}
      >
        <RatingForm />
      </Modal>
    </RequestListContainer>
  );
};
