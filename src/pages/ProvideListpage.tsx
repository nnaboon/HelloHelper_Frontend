import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { StatusButton } from 'components/Button/StatusButton';
import { STATUS_MAPPER } from 'components/Button/const';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';

export const ProvideListPage = () => {
  return (
    <WrapperContainer>
      <StatusButton
        status={STATUS_MAPPER['waiting'].status}
        color={STATUS_MAPPER['waiting'].color}
      />
    </WrapperContainer>
  );
};
