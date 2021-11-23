import React from 'react';
import styled from '@emotion/styled';
import Flex from 'components/Flex/Flex';
import { useHistory, useLocation } from 'react-router-dom'
import { MenuButton } from './MenuButton';
import { HelpMenu, HELP_MENU_MAPPER } from './const';

interface MenuTabProps {
  menu: HelpMenu;
  setMenu: (helpMenu: HelpMenu) => void;
}

export const MenuTab = ({ menu, setMenu }:MenuTabProps) => {
    const history = useHistory();
    const { pathname } = useLocation();

    return (
        <Flex itemAlign="center" justify="space-around" marginTop="60px">
            {Object.values(HelpMenu).map((key) => (
            <MenuButton
              key={key}
              isActive={menu === key}
              onClick={() => {
                setMenu(key);
                history.push({
                  pathname,
                //   search: `?menu=${key}`,
                  state: {
                    menu: key
                  }
                });
              }}
            >
              {HELP_MENU_MAPPER[key]}
            </MenuButton>
          ))}            
        </Flex>
    )
}