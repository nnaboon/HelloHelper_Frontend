/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import Flex from 'components/Flex/Flex';
import { Text } from 'components/Text';
import { StatusButton } from 'components/Button/StatusButton';
import { STATUS_MAPPER } from 'components/Button/const';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { ProvideListCard } from 'components/Card/ProvideListCard';
import { PROVIDE_MAPPER } from 'data/provide';
import { mediaQueryMobile, useMedia, MOBILE_WIDTH } from 'styles/variables';
import { ORDER_DATA } from '../data/order';
import { myAccountUserId } from 'data/user';
import { EmptyData } from '../components/Empty/EmptyData';

export const ProvideListPage = () => {
  const [currentStatus, setCurrentStatus] = useState<string>('waiting');
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

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
          ORDER_DATA.filter(
            ({ providerUserId }) => providerUserId === myAccountUserId
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
        {ORDER_DATA.filter(
          ({ status, orderReferenceType }) =>
            status === currentStatus && orderReferenceType === 'provide'
        ).length > 0 ? (
          <div>
            {' '}
            {ORDER_DATA.filter(
              ({ status, orderReferenceType }) =>
                status === currentStatus && orderReferenceType === 'provide'
            ).map((props) => (
              <ProvideListCard props={props} />
            ))}
          </div>
        ) : (
          <div>
            <EmptyData />
          </div>
        )}
      </Flex>
    </WrapperContainer>
  );
};
