/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';

import Flex from 'components/Flex/Flex';
import { useHistory, useLocation } from 'react-router-dom';
import { MenuButton } from './MenuButton';
import {
  useMedia,
  mediaQueryTablet,
  mediaQueryMobile,
  mediaQuerySmallTablet,
  MOBILE_WIDTH
} from 'styles/variables';

import {
  HelpMenu,
  ProfileMenu,
  PROFILE_MENU_MAPPER,
  PROFILE_MOBILE_MENU_MAPPER
} from './const';
import { mediaQueryMiniDesktop } from '../../styles/variables';

interface MenuTabProps {
  menu: HelpMenu | ProfileMenu;
  setMenu: (helpMenu: HelpMenu | ProfileMenu) => void;
}

export const ProfileMenuTab = ({ menu, setMenu }: MenuTabProps) => {
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const history = useHistory();

  // useEffect(() => {
  //   if (!isMobile && menu === ProfileMenu.HOME) {
  //     setMenu(HelpMenu.PROVIDE);
  //   }
  // }, [menu]);

  return (
    <Flex
      itemAlign="center"
      justify="space-around"
      marginBottom="18px"
      css={css`
        width: 50%;
        margin: 30px 0;

        ${mediaQueryMiniDesktop} {
          width: 65%;
        }

        ${mediaQueryTablet} {
          width: 63%;
        }
        ${mediaQuerySmallTablet} {
          width: 85%;
        }
        ${mediaQueryMobile} {
          width: 100%;
          margin-top: 0;
          margin-bottom: 30px;
        }
      `}
    >
      {Object.values(isMobile ? ProfileMenu : HelpMenu).map((key) => (
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
          {isMobile
            ? PROFILE_MOBILE_MENU_MAPPER[key]
            : PROFILE_MENU_MAPPER[key]}
        </MenuButton>
      ))}
    </Flex>
  );
};
