import React from 'react';
import styled from '@emotion/styled';
import Flex from 'components/Flex/Flex';
import { useHistory, useLocation } from 'react-router-dom';
import { MenuButton } from './MenuButton';
import { useMedia, MOBILE_WIDTH, TABLET_WIDTH } from 'styles/variables';

import { CommunityMenu, COMMUNITY_MENU_MAPPER } from './const';

interface MenuTabProps {
  menu: CommunityMenu;
  setMenu: (helpMenu: CommunityMenu) => void;
}

export const CommunityMenuTab = ({ menu, setMenu }: MenuTabProps) => {
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);

  const history = useHistory();

  return (
    <Flex
      itemAlign="center"
      justify="space-around"
      marginBottom="18px"
      style={{ width: isTablet ? '100%' : '50%', margin: '50px 0' }}
    >
      {Object.values(CommunityMenu).map((key) => (
        <MenuButton
          key={key}
          isActive={menu === key}
          onClick={() => {
            setMenu(key);
            history.push({
              state: {
                profile_menu: key
              }
            });
          }}
        >
          {COMMUNITY_MENU_MAPPER[key]}
        </MenuButton>
      ))}
    </Flex>
  );
};
