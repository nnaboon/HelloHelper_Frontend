/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { Button, Form, Input, message, Tooltip, Select } from 'antd';
import { CATEGORY } from 'data/category';
import { GoogleMapContent } from 'components/GoogleMap/GoogleMap';
import { InfoSvg } from 'components/Svg/InfoSvg';
import Flex from 'components/Flex/Flex';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { EditProfileForm } from 'components/Form/EditProfileForm';

const RegisterLocationFormSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.75rem 2.75rem 1.5rem 2.75rem;
  position: relative;
  height: 100%;
  overflow: scroll;
`;

export const EditProfilePage = () => {
  return (
    <div>
      <EditProfileForm />
    </div>
  );
};
