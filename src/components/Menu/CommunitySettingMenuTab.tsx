import React from 'react';
import styled from '@emotion/styled';
import Flex from 'components/Flex/Flex';
import { useHistory, useLocation } from 'react-router-dom';
import { MenuButton } from './MenuButton';
import { useMedia, MOBILE_WIDTH, TABLET_WIDTH } from 'styles/variables';

import { CommunitySettingMenu, COMMUNITY_SETTING_MENU_MAPPER } from './const';

interface MenuTabProps {
  menu: CommunitySettingMenu;
  setMenu: (helpMenu: CommunitySettingMenu) => void;
}

export const CommunitySettingMenuTab = ({ menu, setMenu }: MenuTabProps) => {
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);

  const history = useHistory();

  return (
    <Flex
      itemAlign="center"
      justify="space-around"
      marginBottom="18px"
      style={{
        width: isTablet ? '100%' : '50%',
        margin: isMobile ? '10px 0' : '50px 0'
      }}
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
