/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useLocation, useHistory } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';
import { SUGGESTED_REQUEST_DATA } from 'data/request';
import { POPULAR_REQUEST_DATA } from 'data/helper';
import { HelpMenu } from 'components/Menu/const';
import { RequestInfoContent } from 'components/Info/RequestInfoContent';
import { ProvideInfoContent } from 'components/Info/ProvideInfoContent';

const RequestImage = styled.img`
  width: 420px;
  height: 510px;
  background: yellow;
  margin-bottom: 20px;
`;

const RequestCategoryButton = styled(PrimaryButton)`
  width: max-content;
  min-width: 140px;
  padding: 10px 15px;
  height: 40px;
  margin: 10px 8px 10px 0px;
`;

const RequestHashtagButton = styled(SecondaryButton)`
  width: max-content;
  min-width: 80px;
  padding: 10px 15px;
  height: 40px;
  margin: 10px 8px 10px 0px;
`;

const RequestInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 180px 400px;
  grid-gap: 40px;
  margin-bottom: 60px;
`;

const RequestDetail = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
  min-width: 200px;
`;

const RequestTitle = styled.div`
  font-size: 14px;
  line-height: 26px;
  color: #cacaca;
  min-width: 90px;
  max-width: 150px;
`;

export const InfoPage = () => {
  const history = useHistory();
  const { pathname, state } = useLocation();
  const query = pathname.split('/')[2];
  const currentMenu = ((state as any)?.type || HelpMenu.PROVIDE) as HelpMenu;

  switch (currentMenu) {
    case HelpMenu.PROVIDE:
      return <ProvideInfoContent data={POPULAR_REQUEST_DATA} />;
    case HelpMenu.REQUEST:
      return <RequestInfoContent data={SUGGESTED_REQUEST_DATA} />;
  }
};
