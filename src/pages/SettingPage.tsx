/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import Flex from 'components/Flex/Flex';
import { Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import {
  mediaQueryMobile,
  mediaQueryLargeDesktop,
  useMedia,
  MOBILE_WIDTH
} from 'styles/variables';
import { useMyProvideOrder } from 'hooks/order/useMyProvideOrder';
import { EditProfilePage } from './EditProfilePage';
import { EditPasswordPage } from './EditPasswordPage';

export const SettingPage = () => {
  const [currentStatus, setCurrentStatus] = useState<string>('profile');
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const { data: provideOrders, execute: getProvideOrders } =
    useMyProvideOrder();

  const history = useHistory();

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
        return <EditPasswordPage />;
    }
  };
  return (
    <WrapperContainer>
      <Flex
        justify="space-between"
        css={css`
          ${mediaQueryMobile} {
            flex-direction: column;
          }
        `}
      >
        <Flex
          css={css`
            cursor: pointer;
          `}
          onClick={() => {
            history.push(`/profile`);
          }}
        >
          <LeftOutlined
            style={{ marginRight: '10px' }}
            css={css`
              font-size: 24px;
              margin-bottom: 12px;

              ${mediaQueryLargeDesktop} {
                font-size: 18px;
              }

              ${mediaQueryMobile} {
                font-size: 14px;
              }
            `}
          />
          <div
            css={css`
              font-size: 24px;
              margin-bottom: 14px;

              ${mediaQueryLargeDesktop} {
                font-size: 18px;
              }

              ${mediaQueryMobile} {
                font-size: 14px;
              }
            `}
          >
            ย้อนกลับ
          </div>
        </Flex>
      </Flex>
      <Menu
        onClick={handleClick}
        selectedKeys={[currentStatus]}
        mode="horizontal"
      >
        <Menu.Item key="profile">แก้ไขโปรไฟล์</Menu.Item>
        {window.localStorage.getItem('loginType') === 'password' && (
          <Menu.Item key="password">เปลี่ยนรหัสผ่าน</Menu.Item>
        )}
      </Menu>

      <div>{renderSetting(currentStatus)}</div>
    </WrapperContainer>
  );
};
