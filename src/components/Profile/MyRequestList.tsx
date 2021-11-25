import React from 'react';
import styled from '@emotion/styled';
import Flex from 'components/Flex/Flex';
import { SecondaryButton } from 'components/Button/Button';

const HelperListCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 11px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  height: 341px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 35px;
  position: relative;
`;

const HelperListTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #f86800;
  margin-bottom: 8px;
`;

const HelperListHeading = styled.div`
  font-size: 12px;
  line-height: 26px;
  color: #c4c4c4;
  min-width: 150px;
`;

const HelperListDetail = styled.div`
  font-size: 18px;
  line-height: 26px;
  color: #000000;
`;

const SecondaryHelpButton = styled(SecondaryButton)`
  width: max-content;
  padding: 0 10px;
  position: absolute;
  bottom: 20px;
  right: 20px;

  &:hover {
    background: #f86800;
    color: #ffff;
  }
`;

export const MyRequestList = ({ data }: any) => {
  return (
    <HelperListCard key={data.id}>
      <HelperListTitle>{data.title}</HelperListTitle>
      <Flex marginY="8px">
        <HelperListHeading>ผู้ให้ความช่วยเหลือ</HelperListHeading>
        <HelperListDetail>{data.name}</HelperListDetail>
      </Flex>
      <Flex marginY="8px">
        <HelperListHeading>สถานที่ให้ความช่วยเหลือ</HelperListHeading>
        <HelperListDetail>{data.location}</HelperListDetail>
      </Flex>
      <Flex marginY="8px">
        <HelperListHeading>ค่าบริการ</HelperListHeading>
        <HelperListDetail>{data.serviceCharge}</HelperListDetail>
      </Flex>
      <Flex marginY="8px">
        <HelperListHeading>วิธีการชำระเงิน</HelperListHeading>
        <HelperListDetail>{data.payment}</HelperListDetail>
      </Flex>
    </HelperListCard>
  );
};
