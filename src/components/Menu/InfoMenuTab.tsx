/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import Flex from 'components/Flex/Flex';
import { useHistory, useLocation } from 'react-router-dom';
import { MenuButton } from './MenuButton';
import { useMedia, MOBILE_WIDTH, TABLET_WIDTH } from 'styles/variables';

import { InfoMenu, INFO_MENU_MAPPER } from './const';
import { mediaQueryMobile } from '../../styles/variables';

interface MenuTabProps {
  menu: InfoMenu;
  setMenu: (helpMenu: InfoMenu) => void;
}

export const InfoMenuTab = ({ menu, setMenu }: MenuTabProps) => {
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);
  const history = useHistory();

  return (
    <Flex
      itemAlign="center"
      justify="space-around"
      marginBottom="18px"
      style={{
        width: isTablet ? '100%' : '50%'
      }}
      css={css`
        position: relative;
        top: 20px;
        margin-top: 10px;
        margin-bottom: 50px;

        ${mediaQueryMobile} {
          margin: 20px 0px 40px 0;
        }
      `}
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
