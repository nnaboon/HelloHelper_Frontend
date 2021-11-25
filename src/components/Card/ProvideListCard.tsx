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
  line-height: 16px;
  text-align: right;
  color: #b9b9b9;
  text-align: start;
`;

const ProvideListData = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  width: 200px;
  text-align: start;
`;

export const ProvideListCard = (props: ProvideListCardProps) => {
  return (
    <ProvideListContainer>
      <StatusBadge
        status={STATUS_MAPPER[props.props.status].status}
        color={STATUS_MAPPER[props.props.status].color}
        style={{ position: 'absolute', right: '20px', top: '13px' }}
      />
      <ProvideListContent>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>ชื่อความช่วยเหลือ</ProvideListTitle>
          <ProvideListData>{props.props.title}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>สถานที่ให้ความข่วยเหลือ</ProvideListTitle>
          <ProvideListData>{props.props.location}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>จำนวน</ProvideListTitle>
          <ProvideListData>{props.props.amount}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>ราคาสินค้าทั้งหมด</ProvideListTitle>
          <ProvideListData>{props.props.price}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>อัตราค่าบริการ</ProvideListTitle>
          <ProvideListData>{props.props.serviceCharge}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>ข้อความ</ProvideListTitle>
          <ProvideListData>{props.props.message}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>รูปแบบการชำระเงิน</ProvideListTitle>
          <ProvideListData>{props.props.payment}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>ชื่อ-นามสกุลผู้รับ</ProvideListTitle>
          <ProvideListData>{props.props.recipient}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>ที่อยู่</ProvideListTitle>
          <ProvideListData>{props.props.address}</ProvideListData>
        </Flex>
        <Flex itemAlign="flex-start">
          <ProvideListTitle>เบอร์โทรศัพท์</ProvideListTitle>
          <ProvideListData>{props.props.phoneNumber}</ProvideListData>
        </Flex>
      </ProvideListContent>
      <PrimaryButton
        css={css`
          position: absolute;
          right: 20px;
          bottom: 20px;
        `}
      >
        เปลี่ยนสถานะ
      </PrimaryButton>
    </ProvideListContainer>
  );
};
