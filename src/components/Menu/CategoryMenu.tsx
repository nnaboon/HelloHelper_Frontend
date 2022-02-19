import React from 'react';
import Flex from '../Flex/Flex';
import styled from '@emotion/styled';

interface CategoryMenuProps {
  text: string;
  icon: any;
}

const CategoryMenuContainer = styled.div`
  border: 1px solid #ee6400;
  width: 100%;
  height: 100%;
  min-width: 40px;
  min-height: 40px;
  font-size: 1.8rem;
`;

export const CategoryMenu = ({ text, icon }: CategoryMenuProps) => {
  return (
    <CategoryMenuContainer>
      <Flex direction="column" itemAlign="center" justify="center">
        <div>{icon}</div>
        <div>{text}</div>
      </Flex>
    </CategoryMenuContainer>
  );
};
