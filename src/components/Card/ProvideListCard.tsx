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
import { ProvideListProps } from 'data/provide';
import { RatingForm } from 'components/Form/RatingForm';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';

type ProvideListCardProps = {
  props: ProvideListProps;
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
`;

const ProvideListContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  margin-top: 40px;
  text-align: start;
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
`;

const ProvideListData = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  width: 200px;
  text-align: start;
`;

export const ProvideListCard = ({ props }: ProvideListCardProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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
          <ProvideListData>{props.location}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>จำนวน</ProvideListTitle>
          <ProvideListData>{props.amount}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>ราคาสินค้าทั้งหมด</ProvideListTitle>
          <ProvideListData>{props.price}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>อัตราค่าบริการ</ProvideListTitle>
          <ProvideListData>{props.serviceCharge}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>ข้อความ</ProvideListTitle>
          <ProvideListData>{props.message}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>รูปแบบการชำระเงิน</ProvideListTitle>
          <ProvideListData>{props.payment}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>ชื่อ-นามสกุลผู้รับ</ProvideListTitle>
          <ProvideListData>{props.recipient}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>ที่อยู่</ProvideListTitle>
          <ProvideListData>{props.address}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>เบอร์โทรศัพท์</ProvideListTitle>
          <ProvideListData>{props.phoneNumber}</ProvideListData>
        </Flex>
      </ProvideListContent>

      {props.status === StatusType.COMPLETE ? (
        <Flex
          css={css`
            position: absolute;
            right: 20px;
            bottom: 20px;
            width: max-content;
          `}
        >
          <PrimaryButton
            css={css`
              min-width: 160px;
              background: #0047ff;
            `}
          >
            แชท
          </PrimaryButton>
          <PrimaryButton
            css={css`
              min-width: 160px;
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
          `}
        >
          <PrimaryButton
            css={css`
              min-width: 150px;
              background: #0047ff;
            `}
          >
            แขท
          </PrimaryButton>
          <Dropdown overlay={menu}>
            <PrimaryButton
              css={css`
                min-width: 150px;
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
