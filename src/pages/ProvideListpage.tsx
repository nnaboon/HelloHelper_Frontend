/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { Menu } from 'antd';
import Flex from 'components/Flex/Flex';
import { Text } from 'components/Text';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { ProvideListCard } from 'components/Card/ProvideListCard';
import { mediaQueryMobile, useMedia, MOBILE_WIDTH } from 'styles/variables';
import { useMyProvideOrder } from 'hooks/order/useMyProvideOrder';
import { EmptyData } from '../components/Empty/EmptyData';

export const ProvideListPage = () => {
  const [currentStatus, setCurrentStatus] = useState<string>('waiting');
  const [status, setStatus] = useState<string>();
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const { data: provideOrders, execute: getProvideOrders } =
    useMyProvideOrder();

  useEffect(() => {
    getProvideOrders(window.localStorage.getItem('id'));
  }, [status]);

  const handleClick = (e) => {
    setCurrentStatus(e.key);
  };

  return (
    <WrapperContainer
      css={css`
        ${mediaQueryMobile} {
          height: calc(100vh - 150px);
        }
      `}
    >
      <Text fontSize="24px" fontWeight={400} marginY="20px">
        รายการให้ความช่วยเหลือของฉัน ทั้งหมด{' '}
        {
          provideOrders?.filter(
            ({ providerUserId }) =>
              providerUserId === window.localStorage.getItem('id')
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
        {provideOrders ? (
          provideOrders?.filter(({ status }) => status === currentStatus)
            .length > 0 ? (
            provideOrders
              ?.filter(({ status }) => status === currentStatus)
              .map((props) => (
                <ProvideListCard
                  key={props.id}
                  props={props}
                  setStatus={setStatus}
                />
              ))
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
