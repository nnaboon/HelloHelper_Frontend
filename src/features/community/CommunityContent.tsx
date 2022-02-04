import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CommunityMenu } from 'components/Menu/const';
import { CommunityContentInfo } from './CommunityContentInfo';
import { CommunitySignin } from './CommunitySignin';
import { observer } from 'mobx-react-lite';
import { userStore } from 'store/userStore';
import { Loading } from 'components/Loading/Loading';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { fontSize } from 'styled-system';

export const CommunityContent = observer(() => {
  const [menu, setMenu] = useState<CommunityMenu>(CommunityMenu.PROVIDE);
  const { pathname, state } = useLocation();
  const { me } = userStore;
  const currentMenu = ((state as any)?.menuKey ||
    CommunityMenu.PROVIDE) as CommunityMenu;

  useEffect(() => {
    setMenu(currentMenu);
  }, [currentMenu]);

  return (
    <div>
      {me ? (
        me.communityId &&
        pathname.split('/')[1] === 'community' &&
        pathname.split('/')[2] !== undefined ? (
          <CommunityContentInfo data={me?.communityId} />
        ) : (
          <CommunitySignin />
        )
      ) : (
        <WrapperContainer>
          <Loading height={`calc(100vh - 300px)`} />
        </WrapperContainer>
      )}
    </div>
  );
});
