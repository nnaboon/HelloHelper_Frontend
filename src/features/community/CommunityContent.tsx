import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CommunityMenu } from 'components/Menu/const';
import { CommunityContentInfo } from './CommunityContentInfo';
import { CommunitySignin } from './CommunitySignin';
import { USER_DATA } from 'data/user';
import { COMMUNITY_MAPPER } from 'data/community';

export const CommunityContent = () => {
  const [menu, setMenu] = useState<CommunityMenu>(CommunityMenu.PROVIDE);
  const { state } = useLocation();
  const currentMenu = ((state as any)?.menuKey ||
    CommunityMenu.PROVIDE) as CommunityMenu;

  useEffect(() => {
    setMenu(currentMenu);
  }, [currentMenu]);

  return (
    <div>
      {USER_DATA[0].community.name ? (
        <CommunityContentInfo data={COMMUNITY_MAPPER[0]} />
      ) : (
        <CommunitySignin />
      )}
    </div>
  );
};
