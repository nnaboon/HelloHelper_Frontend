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
import { CommunitySettingEditProfile } from './CommunitySettingEditProfile';
import { mediaQuerySmallTablet, mediaQueryMobile } from 'styles/variables';
import { useCommunity } from 'hooks/community/useCommunity';
import { useCommunityMember } from 'hooks/community/useCommunityMember';
import { useCommunityJoinedRequestUserId } from 'hooks/community/useCommunityJoinedRequestUserId';

import { Loading } from 'components/Loading/Loading';

export const CommunitySetting = () => {
  const [menu, setMenu] = useState<CommunitySettingMenu>(
    CommunitySettingMenu.MANAGE
  );
  const { pathname, state } = useLocation();
  const query = pathname.split('/')[3];
  const currentMenu = ((state as any)?.community_menu ||
    CommunitySettingMenu.MANAGE) as CommunitySettingMenu;
  const { data: community, execute: getCommunity } = useCommunity();
  const { data: member, execute: getCommunityMember } = useCommunityMember();
  const { data: joinedRequestUserId, execute: getCommunityJoinedRequestId } =
    useCommunityJoinedRequestUserId();

  useEffect(() => {
    setMenu(currentMenu);
  }, [currentMenu]);

  useEffect(() => {
    if (!community && !member) {
      getCommunity(query);
      getCommunityMember(query);
    }
  }, []);

  const getField = (data: any) => {
    const joinedRequestUserId = [];
    for (var i = 0; i < data.joinedRequestUserId.length; i++) {
      joinedRequestUserId.push(data.joinedRequestUserId[i].userId);
    }

    const user = {
      joinedRequestUserId: joinedRequestUserId
    };

    getCommunityJoinedRequestId(data.communityId, user);
  };

  useEffect(() => {
    if (community && !joinedRequestUserId) {
      getField(community);
    }
  }, [community, joinedRequestUserId]);

  return (
    <WrapperContainer
      css={css`
        height: 100%;
        ${mediaQueryMobile} {
          height: calc(100vh - 180px);
        }
      `}
    >
      <CommunitySettingMenuTab menu={menu} setMenu={setMenu} />
      {community && member ? (
        <div>
          {' '}
          {currentMenu === CommunitySettingMenu.MANAGE ? (
            <CommunitySettingManageMember
              member={community.member}
              joinedRequest={community.joinedRequestUserId}
            />
          ) : (
            <CommunitySettingEditProfile communityData={community} />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </WrapperContainer>
  );
};
