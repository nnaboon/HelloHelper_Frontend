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
import { ProvideOrderCard } from 'components/Card/ProvideOrderCard';
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
import { firestore } from '../firebase';

export const ProvideOrderPage = observer(() => {
  const [currentStatus, setCurrentStatus] = useState<string>('pending');
  const [status, setStatus] = useState<string>();
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const { data: provideOrders, execute: getProvideOrders } =
    useMyProvideOrder();

  const { me } = userStore;

  const handleClick = (e) => {
    setCurrentStatus(e.key);
  };

  useEffect(() => {
    const doc = firestore
      .collection('orders')
      .where('providerUserId', '==', window.localStorage.getItem('id'));

    const observer = doc.onSnapshot(
      async (docSnapshot) => {
        getProvideOrders(window.localStorage.getItem('id'));
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );

    return () => observer();
  }, []);

  return (
    <WrapperContainer>
      {me && provideOrders ? (
        <React.Fragment>
          <Text
            fontSize="24px"
            fontWeight={400}
            marginY="20px"
            css={css`
              font-size: 22px;

              ${mediaQueryLargeDesktop} {
                font-size: 20px;
              }

              ${mediaQueryTablet} {
                font-size: 18px;
              }

              ${mediaQueryMobile} {
                font-size: 20px;
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
                    <ProvideOrderCard
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
