/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import Flex from 'components/Flex/Flex';
import { LeftOutlined } from '@ant-design/icons';
import { CommunitySettingMenuTab } from 'components/Menu/CommunitySettingMenuTab';
import { CommunitySettingManageMember } from './CommunitySettingManageMember';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { CommunitySettingMenu } from 'components/Menu/const';
import { CommunitySettingEditProfile } from './CommunitySettingEditProfile';
import {
  mediaQuerySmallTablet,
  mediaQueryMobile,
  mediaQueryLargeDesktop
} from 'styles/variables';
import { useCommunity } from 'hooks/community/useCommunity';
import { useCommunityMember } from 'hooks/community/useCommunityMember';
import { useCommunityJoinedRequestUserId } from 'hooks/community/useCommunityJoinedRequestUserId';

import { Loading } from 'components/Loading/Loading';
import { useUpdateJoinedCommunityRequest } from 'hooks/community/useUpdateJoinedCommunityRequest';
import { firestore } from '../../firebase';

export const CommunitySetting = () => {
  const [member, setMember] = useState<any[]>();
  const [joinedRequestUserId, setJoinedRequestUserId] = useState<any[]>();
  const [menu, setMenu] = useState<CommunitySettingMenu>(
    CommunitySettingMenu.MANAGE
  );
  const history = useHistory();
  const { pathname, state } = useLocation();
  const query = pathname.split('/')[3];
  const currentMenu = ((state as any)?.community_menu ||
    CommunitySettingMenu.MANAGE) as CommunitySettingMenu;
  const { data: community, execute: getCommunity } = useCommunity();
  const { execute: getCommunityMember } = useCommunityMember();
  const { execute: updateJoinedCommunityRequest } =
    useUpdateJoinedCommunityRequest();
  // const { data: joinedRequestUserId, execute: getCommunityJoinedRequestId } =
  //   useCommunityJoinedRequestUserId();

  useEffect(() => {
    setMenu(currentMenu);
  }, [currentMenu]);

  useEffect(() => {
    setMenu(currentMenu);
  }, [currentMenu]);

  useEffect(() => {
    if (!community && !member) {
      getCommunity(query).then((res) => {
        setJoinedRequestUserId(res.data.joinedRequestUserId);
        setMember(res.data.member);
      });
      // getCommunityMember(query).then((res) => {
      //   setMember(res.data);
      // });
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

    updateJoinedCommunityRequest(data.communityId, user).then((res) => {
      setJoinedRequestUserId(res.data);
    });
  };

  // useEffect(() => {
  //   if (community && !joinedRequestUserId) {
  //     getField(community);
  //   }
  // }, [community, joinedRequestUserId]);

  return (
    <WrapperContainer
      css={css`
        height: 100%;
        ${mediaQueryMobile} {
          height: calc(100vh - 180px);
        }
      `}
    >
      <Flex
        css={css`
          cursor: pointer;
        `}
        onClick={() => {
          history.push(`/community/${query}`);
        }}
      >
        <LeftOutlined
          style={{ marginRight: '10px' }}
          css={css`
            font-size: 2.2rem;

            ${mediaQueryLargeDesktop} {
              font-size: 20px;
            }
          `}
        />
        <div
          css={css`
            font-size: 2.4rem;

            ${mediaQueryLargeDesktop} {
              font-size: 20px;
            }
          `}
        >
          ย้อนกลับ
        </div>
      </Flex>
      <CommunitySettingMenuTab menu={menu} setMenu={setMenu} />
      {community && member ? (
        <div>
          {' '}
          {currentMenu === CommunitySettingMenu.MANAGE ? (
            <CommunitySettingManageMember />
          ) : (
            <CommunitySettingEditProfile communityData={community} />
          )}
        </div>
      ) : (
        <Loading height="calc(100vh - 265px)" />
      )}
    </WrapperContainer>
  );
};
