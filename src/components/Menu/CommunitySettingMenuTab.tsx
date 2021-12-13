import React from 'react';
import styled from '@emotion/styled';
import Flex from 'components/Flex/Flex';
import { useHistory, useLocation } from 'react-router-dom';
import { MenuButton } from './MenuButton';
import { CommunitySettingMenu, COMMUNITY_SETTING_MENU_MAPPER } from './const';

interface MenuTabProps {
  menu: CommunitySettingMenu;
  setMenu: (helpMenu: CommunitySettingMenu) => void;
}

export const CommunitySettingMenuTab = ({ menu, setMenu }: MenuTabProps) => {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <Flex
      itemAlign="center"
      justify="space-around"
      marginBottom="18px"
      style={{ width: '50%', margin: '50px 0' }}
    >
      {Object.values(CommunitySettingMenu).map((key) => (
        <MenuButton
          key={key}
          isActive={menu === key}
          onClick={() => {
            setMenu(key);
            history.push({
              state: {
                community_menu: key
              }
            });
          }}
        >
          {COMMUNITY_SETTING_MENU_MAPPER[key]}
        </MenuButton>
      ))}
    </Flex>
  );
};
