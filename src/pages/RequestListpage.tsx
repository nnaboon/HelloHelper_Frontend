/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import Flex from 'components/Flex/Flex';
import { Text } from 'components/Text';
import { StatusButton } from 'components/Button/StatusButton';
import { STATUS_MAPPER } from 'components/Button/const';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { RequestListCard } from 'components/Card/RequestListCard';
import { mediaQueryMobile, MOBILE_WIDTH, useMedia } from 'styles/variables';
import { ORDER_DATA } from '../data/order';
import { useMyRequestOrder } from 'hooks/order/useMyRequestOrder';
import { myAccountUserId } from 'data/user';
import { EmptyData } from 'components/Empty/EmptyData';

export const RequestListPage = () => {
  const [currentStatus, setCurrentStatus] = useState<string>('waiting');
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const { data: requestOrders, execute: getRequestOrders } =
    useMyRequestOrder();

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
      <Flex itemAlign="center" overflowX={isMobile ? 'scroll' : 'unset'}>
        <StatusButton
          status={STATUS_MAPPER['waiting'].status}
          color={STATUS_MAPPER['waiting'].color}
          onClick={() => setCurrentStatus('waiting')}
        />
        <StatusButton
          status={STATUS_MAPPER['pending'].status}
          color={STATUS_MAPPER['pending'].color}
          onClick={() => setCurrentStatus('pending')}
        />
        <StatusButton
          status={STATUS_MAPPER['complete'].status}
          color={STATUS_MAPPER['complete'].color}
          onClick={() => setCurrentStatus('complete')}
        />
        <StatusButton
          status={STATUS_MAPPER['cancel'].status}
          color={STATUS_MAPPER['cancel'].color}
          onClick={() => setCurrentStatus('cancel')}
        />
      </Flex>
      <Flex
        itemAlign="center"
        justify="center"
        direction="column"
        marginTop="30px"
      >
        {requestOrders?.length > 0 ? (
          <div>
            {requestOrders
              ?.filter(
                ({ status, orderReferenceType }) =>
                  status === currentStatus && orderReferenceType === 'request'
              )
              .map((props) => (
                <RequestListCard props={props} />
              ))}
          </div>
        ) : (
          <EmptyData height="300px" />
        )}
      </Flex>
    </WrapperContainer>
  );
};
