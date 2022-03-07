import React from 'react';
import styled from '@emotion/styled';
import Flex from 'components/Flex/Flex';
import { useHistory } from 'react-router-dom';
import { MenuButton } from './MenuButton';
import { SEARCH_MENU_MAPPER, SearchMenu } from './const';

interface SearchMenuTabProps {
  menu: SearchMenu;
  setMenu: (helpMenu: SearchMenu) => void;
}

export const SearchMenuTab = ({ menu, setMenu }: SearchMenuTabProps) => {
  const history = useHistory();

  return (
    <Flex itemAlign="center" justify="space-around" style={{ width: '100%' }}>
      {Object.values(SearchMenu).map((key) => (
        <MenuButton
          key={key}
          isActive={menu === key}
          onClick={() => {
            setMenu(key);
            // history.push({
            //   state: {
            //     menu: key
            //   }
            // });
          }}
        >
          {SEARCH_MENU_MAPPER[key]}
        </MenuButton>
      ))}
    </Flex>
  );
};
