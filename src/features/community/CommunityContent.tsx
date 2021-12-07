/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useHistory, useLocation } from 'react-router-dom';
import { CommunityMenu } from 'components/Menu/const';
import { CommunityContentInfo } from './CommunityContentInfo';
import { CommunitySignin } from './CommunitySignin';
import { USER_DATA } from 'data/user';

export const CommunityContent = () => {
  const [menu, setMenu] = useState<CommunityMenu>(CommunityMenu.PROVIDE);
  const history = useHistory();
  const { pathname, state } = useLocation();
  const currentMenu = ((state as any)?.menuKey ||
    CommunityMenu.PROVIDE) as CommunityMenu;

  useEffect(() => {
    setMenu(currentMenu);
  }, [currentMenu]);

  return (
    <div>
      {USER_DATA[0].community.name ? (
        <CommunityContentInfo />
      ) : (
        <CommunitySignin />
      )}
    </div>
  );
};
