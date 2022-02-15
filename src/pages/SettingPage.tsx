/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { Menu } from 'antd';
import Flex from 'components/Flex/Flex';
import { Text } from 'components/Text';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { ProvideListCard } from 'components/Card/ProvideListCard';
import { mediaQueryMobile, useMedia, MOBILE_WIDTH } from 'styles/variables';
import { useMyProvideOrder } from 'hooks/order/useMyProvideOrder';
import { EmptyData } from '../components/Empty/EmptyData';
import { EditProfilePage } from './EditProfilePage';
import { EditPasswordPage } from './EditPasswordPage';

export const SettingPage = () => {
  const [currentStatus, setCurrentStatus] = useState<string>('profile');
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const { data: provideOrders, execute: getProvideOrders } =
    useMyProvideOrder();

  useEffect(() => {
    getProvideOrders(window.localStorage.getItem('id'));
  }, []);

  const handleClick = (e) => {
    setCurrentStatus(e.key);
  };

  const renderSetting = (currentStatus: string) => {
    switch (currentStatus) {
      case 'profile':
        return <EditProfilePage />;
      case 'password':
        return <EditPasswordPage />;
      default:
        return <EditProfilePage />;
    }
  };
  return (
    <WrapperContainer
      css={css`
        ${mediaQueryMobile} {
          height: calc(100vh - 150px);
        }
      `}
    >
      <Menu
        onClick={handleClick}
        selectedKeys={[currentStatus]}
        mode="horizontal"
      >
        <Menu.Item key="profile">แก้ไขโปรไฟล์</Menu.Item>
        {/* {window.localStorage.getItem('loginType') === 'password' && ( */}
        <Menu.Item key="password">เปลี่ยนรหัสผ่าน</Menu.Item>
        {/* )} */}
      </Menu>
      <div>{renderSetting(currentStatus)}</div>
    </WrapperContainer>
  );
};
