import React from 'react';
import styled from '@emotion/styled';
import { CATEGORY } from 'data/category';
import { css, jsx } from '@emotion/react';

interface CategoryButtonProps {
  text: string;
}

const Button = styled.a`
  display: flex;
  height: 45px;
  position: relative;
  text-decoration: none;
  border: 2px solid #ee6400;
  border-radius: 8px;
  color: #ee6400;
  font-size: 24px;
  max-width: 400px;
  align-items: center;
  justify-content: center;
`;

export const CategoryButton = ({ text }: CategoryButtonProps) => {
  return <Button>{CATEGORY.filter(({ id }) => id === text)[0].name}</Button>;
};
