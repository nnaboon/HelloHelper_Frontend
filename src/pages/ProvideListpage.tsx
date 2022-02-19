/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { observer } from 'mobx-react-lite';
import { Menu } from 'antd';
import Flex from 'components/Flex/Flex';
import { Text } from 'components/Text';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { ProvideListCard } from 'components/Card/ProvideListCard';
import {
  mediaQueryMobile,
  mediaQueryLargeDesktop,
  mediaQueryTablet,
  useMedia,
  MOBILE_WIDTH
} from 'styles/variables';
import { useMyProvideOrder } from 'hooks/order/useMyProvideOrder';
import { EmptyData } from '../components/Empty/EmptyData';
import { Loading } from 'components/Loading/Loading';
import { userStore } from 'store/userStore';

export const ProvideListPage = observer(() => {
  const [currentStatus, setCurrentStatus] = useState<string>('pending');
  const [status, setStatus] = useState<string>();
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const { data: provideOrders, execute: getProvideOrders } =
    useMyProvideOrder();

  const { me } = userStore;

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
      {me && provideOrders ? (
        <React.Fragment>
          <Text
            fontSize="24px"
            fontWeight={400}
            marginY="20px"
            css={css`
              font-size: 2.2rem;

              ${mediaQueryLargeDesktop} {
                font-size: 24px;
              }

              ${mediaQueryTablet} {
                font-size: 20px;
              }

              ${mediaQueryMobile} {
                font-size: 16px;
              }
            `}
          >
            รายการให้ความช่วยเหลือของฉัน ทั้งหมด{' '}
            {
              provideOrders?.filter(
                ({ providerUserId, status }) =>
                  providerUserId === window.localStorage.getItem('id') &&
                  status !== 'waiting'
              ).length
            }{' '}
            รายการ
          </Text>
          <Menu
            onClick={handleClick}
            selectedKeys={[currentStatus]}
            mode="horizontal"
          >
            <Menu.Item key="pending">รอดำเนินการ</Menu.Item>
            <Menu.Item key="progress">กำลังดำเนินการ</Menu.Item>
            <Menu.Item key="complete">สำเร็จ</Menu.Item>
            <Menu.Item key="cancel">ยกเลิก</Menu.Item>
            <Menu.Item key="rated">ให้คะแนนแล้ว</Menu.Item>
          </Menu>
          <Flex
            itemAlign="center"
            justify="center"
            direction="column"
            marginTop="30px"
          >
            {provideOrders ? (
              provideOrders?.filter(({ status, rating }) =>
                currentStatus === 'rated'
                  ? rating !== undefined
                  : status === currentStatus &&
                    status !== 'waiting' &&
                    rating === undefined
              ).length > 0 ? (
                provideOrders
                  ?.filter(({ status, rating }) =>
                    currentStatus === 'rated'
                      ? rating !== undefined
                      : status === currentStatus && rating === undefined
                  )
                  .map((props) => (
                    <ProvideListCard
                      key={props.id}
                      props={props}
                      setStatus={setStatus}
                    />
                  ))
              ) : (
                <EmptyData />
              )
            ) : (
              <EmptyData />
            )}
          </Flex>
        </React.Fragment>
      ) : (
        <Loading height="calc(100vh - 265px)" />
      )}
    </WrapperContainer>
  );
});
