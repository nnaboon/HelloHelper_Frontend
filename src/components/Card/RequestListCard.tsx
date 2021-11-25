/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import styled from '@emotion/styled';
import Flex from 'components/Flex/Flex';
import { STATUS_MAPPER } from 'components/Badge/const';
import { StatusType } from 'components/Button/const';
import { message } from 'antd';
import { StatusBadge } from 'components/Badge/StatusBadge';
import { ProvideListProps } from 'data/provide';
import { PrimaryButton } from '../Button/Button';

type RequestListCardProps = {
  props: ProvideListProps;
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
`;

const RequestListContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  margin-top: 40px;
  text-align: start;
`;

const RequestListTitle = styled.div`
  width: 130px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  color: #b9b9b9;
  text-align: start;
`;

const RequestListData = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  width: 200px;
`;

export const RequestListCard = (props: RequestListCardProps) => {
  return (
    <RequestListContainer>
      <StatusBadge
        status={STATUS_MAPPER[props.props.status].status}
        color={STATUS_MAPPER[props.props.status].color}
        style={{ position: 'absolute', right: '20px', top: '13px' }}
      />
      <RequestListContent>
        <Flex itemAlign="flex-start">
          <RequestListTitle>ชื่อความช่วยเหลือ</RequestListTitle>
          <RequestListData>{props.props.title}</RequestListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <RequestListTitle>สถานที่ให้ความข่วยเหลือ</RequestListTitle>
          <RequestListData>{props.props.location}</RequestListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <RequestListTitle>จำนวน</RequestListTitle>
          <RequestListData>{props.props.amount}</RequestListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <RequestListTitle>ราคาสินค้าทั้งหมด</RequestListTitle>
          <RequestListData>{props.props.price}</RequestListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <RequestListTitle>อัตราค่าบริการ</RequestListTitle>
          <RequestListData>{props.props.serviceCharge}</RequestListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <RequestListTitle>ข้อความ</RequestListTitle>
          <RequestListData>{props.props.message}</RequestListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <RequestListTitle>รูปแบบการชำระเงิน</RequestListTitle>
          <RequestListData>{props.props.payment}</RequestListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <RequestListTitle>ชื่อ-นามสกุลผู้รับ</RequestListTitle>
          <RequestListData>{props.props.recipient}</RequestListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <RequestListTitle>ที่อยู่</RequestListTitle>
          <RequestListData>{props.props.address}</RequestListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <RequestListTitle>เบอร์โทรศัพท์</RequestListTitle>
          <RequestListData>{props.props.phoneNumber}</RequestListData>
        </Flex>
      </RequestListContent>
      <PrimaryButton
        css={css`
          position: absolute;
          right: 20px;
          bottom: 20px;
          max-width: 250px;
        `}
      >
        ยืนยันการรับสินค้า/ให้คะแนน
      </PrimaryButton>
    </RequestListContainer>
  );
};
