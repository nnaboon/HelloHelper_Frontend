/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import Flex from 'components/Flex/Flex';
import { Text } from 'components/Text';
import { Menu } from 'antd';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { RequestListCard } from 'components/Card/RequestListCard';
import { mediaQueryMobile, MOBILE_WIDTH, useMedia } from 'styles/variables';
import { useMyRequestOrder } from 'hooks/order/useMyRequestOrder';
import { EmptyData } from 'components/Empty/EmptyData';

export const RequestListPage = () => {
  const [currentStatus, setCurrentStatus] = useState<string>('waiting');
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const { data: requestOrders, execute: getRequestOrders } =
    useMyRequestOrder();

  const handleClick = (e) => {
    setCurrentStatus(e.key);
  };

  useEffect(() => {
    getRequestOrders(window.localStorage.getItem('id'));
  }, []);

  return (
    <WrapperContainer
      css={css`
        ${mediaQueryMobile} {
          height: calc(100vh - 150px);
        }
      `}
    >
      <Text fontSize="24px" fontWeight={400} marginY="20px">
        รายการขอความช่วยเหลือของฉัน ทั้งหมด{' '}
        {
          requestOrders?.filter(
            ({ requesterUserId }) =>
              requesterUserId === window.localStorage.getItem('id')
          ).length
        }{' '}
        รายการ
      </Text>
      <Menu
        onClick={handleClick}
        selectedKeys={[currentStatus]}
        mode="horizontal"
      >
        <Menu.Item key="waiting">รอดำเนินการ</Menu.Item>
        <Menu.Item key="pending">กำลังดำเนินการ</Menu.Item>
        <Menu.Item key="complete">สำเร็จ</Menu.Item>
        <Menu.Item key="cancel">ยกเลิก</Menu.Item>
      </Menu>
      <Flex
        itemAlign="center"
        justify="center"
        direction="column"
        marginTop="30px"
      >
        {requestOrders ? (
          requestOrders?.filter(
            ({ status, orderReferenceType }) => status === currentStatus
          ).length > 0 ? (
            requestOrders
              ?.filter(
                ({ status, orderReferenceType }) => status === currentStatus
              )
              .map((props) => <RequestListCard key={props.id} props={props} />)
          ) : (
            <EmptyData height="400px" />
          )
        ) : (
          <EmptyData height="400px" />
        )}
      </Flex>
    </WrapperContainer>
  );
};
