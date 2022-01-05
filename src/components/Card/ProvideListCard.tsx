/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Flex from 'components/Flex/Flex';
import { STATUS_MAPPER } from 'components/Button/const';
import { StatusType } from 'components/Button/const';
import { Menu, Dropdown, message, Form, Modal } from 'antd';
import { StatusBadge } from 'components/Badge/StatusBadge';
import { RatingForm } from 'components/Form/RatingForm';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';
import {
  mediaQueryMobile,
  useMedia,
  MOBILE_WIDTH,
  SMALL_TABLET_WIDTH,
  TABLET_WIDTH,
  mediaQuerySmallTablet,
  mediaQueryTablet
} from 'styles/variables';
import { OrderProps } from 'data/order';

type ProvideListCardProps = {
  props: OrderProps;
};

const ProvideListContainer = styled.div`
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

  ${mediaQueryTablet} {
    width: 100%;
    padding: 20px;
  }
`;

const ProvideListContent = styled.div`
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

const ProvideListTitle = styled.div`
  width: 130px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  color: #b9b9b9;
  text-align: end;
  margin-right: 20px;

  ${mediaQueryMobile} {
    text-align: start;
  }
`;

const ProvideListData = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  width: 200px;
  text-align: start;

  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  ${mediaQueryMobile} {
    font-size: 16px;
    width: 185px;
    -webkit-line-clamp: 1;
  }
`;

export const ProvideListCard = ({ props }: ProvideListCardProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

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

  const menu = (
    <Menu>
      <Menu.Item>รอดำเนินการ</Menu.Item>
      <Menu.Item>กำลังดำเนินการ</Menu.Item>
      <Menu.Item>สำเร็จ</Menu.Item>
      <Menu.Item>ยกเลิก</Menu.Item>
    </Menu>
  );

  return (
    <ProvideListContainer>
      <StatusBadge
        status={STATUS_MAPPER[props.status].status}
        color={STATUS_MAPPER[props.status].color}
        style={{ position: 'absolute', right: '20px', top: '13px' }}
      />
      <ProvideListContent>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>ชื่อความช่วยเหลือ</ProvideListTitle>
          <ProvideListData>{props.title}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>สถานที่ให้ความข่วยเหลือ</ProvideListTitle>
          <ProvideListData>{props.location.name}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>จำนวน</ProvideListTitle>
          <ProvideListData>{props.amount}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>ราคาสินค้าทั้งหมด</ProvideListTitle>
          <ProvideListData>{props.price} บาท</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>อัตราค่าบริการ</ProvideListTitle>
          <ProvideListData>{props.serviceCharge} บาท</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>ข้อความ</ProvideListTitle>
          <ProvideListData>{props.description}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>รูปแบบการชำระเงิน</ProvideListTitle>
          <ProvideListData>{props.payment}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>ชื่อ-นามสกุลผู้รับ</ProvideListTitle>
          <ProvideListData>{props.receiver.receiverName}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>ที่อยู่</ProvideListTitle>
          <ProvideListData>
            {props.receiver.receiverAddress
              ? props.receiver.receiverAddress
              : '-'}
          </ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>เบอร์โทรศัพท์</ProvideListTitle>
          <ProvideListData>
            {props.receiver.receiverPhoneNumber}
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
          >
            แชท
          </PrimaryButton>
          <PrimaryButton
            css={css`
              min-width: 160px;

              ${mediaQueryMobile} {
                min-width: 47%;
                width: 47%;
              }
            `}
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            ช่วยเหลือเสร็จสิ้น
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
              min-width: 150px;
              background: #0047ff;

              ${mediaQueryTablet} {
                min-width: 170px;
              }

              ${mediaQueryMobile} {
                min-width: 47%;
                width: 47%;
              }
            `}
          >
            แขท
          </PrimaryButton>
          <Dropdown overlay={menu}>
            <PrimaryButton
              css={css`
                min-width: 150px;

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
    </ProvideListContainer>
  );
};
