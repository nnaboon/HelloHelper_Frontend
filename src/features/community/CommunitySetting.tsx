/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { CommunitySettingMenuTab } from 'components/Menu/CommunitySettingMenuTab';
import { CommunitySettingManageMember } from './CommunitySettingManageMember';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { CommunitySettingMenu } from 'components/Menu/const';
import { COMMUNITY_MAPPER } from 'data/community';
import { CommunitySettingEditProfile } from './CommunitySettingEditProfile';
import { mediaQuerySmallTablet, mediaQueryMobile } from 'styles/variables';

export const CommunitySetting = () => {
  const [menu, setMenu] = useState<CommunitySettingMenu>(
    CommunitySettingMenu.MANAGE
  );
  const { state } = useLocation();
  const currentMenu = ((state as any)?.community_menu ||
    CommunitySettingMenu.MANAGE) as CommunitySettingMenu;

  useEffect(() => {
    setMenu(currentMenu);
  }, [currentMenu]);

  return (
    <WrapperContainer
      css={css`
        ${mediaQueryMobile} {
          height: calc(100vh - 180px);
        }
      `}
    >
      <CommunitySettingMenuTab menu={menu} setMenu={setMenu} />
      {currentMenu === CommunitySettingMenu.MANAGE ? (
        <CommunitySettingManageMember
          member={COMMUNITY_MAPPER[0].member}
          joinedRequest={COMMUNITY_MAPPER[0].joinedRequest}
        />
      ) : (
        <CommunitySettingEditProfile />
      )}
    </WrapperContainer>
  );
};
