import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import Flex from 'components/Flex/Flex';
import { Text } from 'components/Text';
import { StatusButton } from 'components/Button/StatusButton';
import { STATUS_MAPPER } from 'components/Button/const';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { RequestListCard } from 'components/Card/RequestListCard';
import { REQUEST_MAPPER } from 'data/request';

export const RequestListPage = () => {
  const [currentStatus, setCurrentStatus] = useState<string>('waiting');
  return (
    <WrapperContainer>
      <Text fontSize="24px" fontWeight={400} marginY="20px">
        รายการขอความช่วยเหลือของฉัน ทั้งหมด {REQUEST_MAPPER.length} รายการ
      </Text>
      <Flex itemAlign="center">
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
        {REQUEST_MAPPER.filter((props) => props.status === currentStatus).map(
          (props) => (
            <RequestListCard props={props} />
          )
        )}
      </Flex>
    </WrapperContainer>
  );
};
