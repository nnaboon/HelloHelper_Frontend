/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Modal, Input, Checkbox, Button } from 'antd';
import { CreateCommunityForm } from 'components/Form/CreateCommunityForm';
import { CommunityForm } from 'components/Form/CommunityForm';
import { CommunityType } from './const';

interface CommunitySigninStateProps {
  setVisible: (visible: boolean) => void;
}
export const CommunitySigninState = ({
  setVisible
}: CommunitySigninStateProps) => {
  return <CreateCommunityForm setVisible={setVisible} />;
};
