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
import { mediaQueryMobile, mediaQueryLargeDesktop } from 'styles/variables';
import { useCommunity } from 'hooks/community/useCommunity';

import { Loading } from 'components/Loading/Loading';
import { useUpdateJoinedCommunityRequest } from 'hooks/community/useUpdateJoinedCommunityRequest';
import { logout } from 'features/logout/Logout';

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
  const { execute: updateJoinedCommunityRequest } =
    useUpdateJoinedCommunityRequest();

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

    updateJoinedCommunityRequest(data.communityId, user)
      .then((res) => {
        setJoinedRequestUserId(res.data);
      })
      .catch((error) => {
        if (error.response.data === 'Unauthorized') {
          logout();
        }
      });
  };

  return (
    <WrapperContainer>
      <Flex
        css={css`
          cursor: pointer;

          ${mediaQueryMobile} {
            margin-bottom: 20px;
          }
        `}
        onClick={() => {
          history.push(`/community/${query}`);
        }}
      >
        <LeftOutlined
          style={{ marginRight: '10px' }}
          css={css`
            font-size: 24px;

            ${mediaQueryLargeDesktop} {
              font-size: 18px;
            }

            ${mediaQueryMobile} {
              font-size: 16px;
            }
          `}
        />
        <div
          css={css`
            font-size: 24px;

            ${mediaQueryLargeDesktop} {
              font-size: 18px;
            }

            ${mediaQueryMobile} {
              font-size: 16px;
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
