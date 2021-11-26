/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Modal, Input, Checkbox, Button } from 'antd';
import { CreateCommunityForm } from 'components/Form/CreateCommunityForm';
import { CommunityForm } from 'components/Form/CommunityForm';

export enum CommunityType {
  CREATE = 'create',
  ALREADY = 'already'
}

export const CommunityMenu = () => {
  const [menu, setMenu] = useState<CommunityType>(CommunityType.ALREADY);
  switch (menu) {
    case CommunityType.CREATE:
      return <CreateCommunityForm setMenu={setMenu} />;
    case CommunityType.ALREADY:
      return <CommunityForm setMenu={setMenu} />;
  }
};
