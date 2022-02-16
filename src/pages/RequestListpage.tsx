/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import Flex from 'components/Flex/Flex';
import { Text } from 'components/Text';
import { Menu } from 'antd';
import { observer } from 'mobx-react-lite';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { RequestListCard } from 'components/Card/RequestListCard';
import {
  mediaQueryMobile,
  mediaQueryLargeDesktop,
  mediaQueryTablet,
  MOBILE_WIDTH,
  useMedia
} from 'styles/variables';
import { useMyRequestOrder } from 'hooks/order/useMyRequestOrder';
import { EmptyData } from 'components/Empty/EmptyData';
import { Loading } from '../components/Loading/Loading';
import { userStore } from 'store/userStore';

export const RequestListPage = observer(() => {
  const [currentStatus, setCurrentStatus] = useState<string>('pending');

  const { me } = userStore;

  const { data: requestOrders, execute: getRequestOrders } =
    useMyRequestOrder();

  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

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
      {me && requestOrders ? (
        <React.Fragment>
          <Text
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
            รายการขอความช่วยเหลือของฉัน ทั้งหมด{' '}
            {
              requestOrders?.filter(
                ({ requesterUserId, status }) =>
                  requesterUserId === window.localStorage.getItem('id') &&
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
          </Menu>
          <Flex
            itemAlign="center"
            justify="center"
            direction="column"
            marginTop="30px"
          >
            {requestOrders ? (
              requestOrders?.filter(
                ({ status, orderReferenceType }) =>
                  status === currentStatus && status !== 'waiting'
              ).length > 0 ? (
                requestOrders
                  ?.filter(
                    ({ status, orderReferenceType }) => status === currentStatus
                  )
                  .map((props) => (
                    <RequestListCard key={props.id} props={props} />
                  ))
              ) : (
                <EmptyData />
              )
            ) : (
              <EmptyData />
            )}
          </Flex>{' '}
        </React.Fragment>
      ) : (
        <Loading height="calc(100vh - 265px)" />
      )}
    </WrapperContainer>
  );
});
