import React from 'react';
import styled from '@emotion/styled';
import Flex from 'components/Flex/Flex';
import { useHistory, useLocation } from 'react-router-dom';
import { MenuButton } from './MenuButton';
import { useMedia, MOBILE_WIDTH } from 'styles/variables';

import { InfoMenu, INFO_MENU_MAPPER } from './const';

interface MenuTabProps {
  menu: InfoMenu;
  setMenu: (helpMenu: InfoMenu) => void;
}

export const InfoMenuTab = ({ menu, setMenu }: MenuTabProps) => {
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const history = useHistory();

  return (
    <Flex
      itemAlign="center"
      justify="space-around"
      marginBottom="18px"
      style={{
        width: isMobile ? '100%' : '50%',
        margin: isMobile ? '10px 0px 40px 0' : '50px 0'
      }}
    >
      {Object.values(InfoMenu).map((key) => (
        <MenuButton
          key={key}
          isActive={menu === key}
          onClick={() => {
            setMenu(key);
            history.push({
              state: {
                info_menu: key
              }
            });
          }}
        >
          {INFO_MENU_MAPPER[key]}
        </MenuButton>
      ))}
    </Flex>
  );
};
