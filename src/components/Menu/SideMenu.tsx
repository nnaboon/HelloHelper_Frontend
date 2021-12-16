/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined
} from '@ant-design/icons';
import { CATEGORY } from 'data/category';
import { MenuSvg } from 'components/Svg/MenuSvg';

export const SideMenu = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const { SubMenu } = Menu;
  const history = useHistory();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 5
      }}
    >
      <div
        onClick={toggleCollapsed}
        style={{
          marginTop: 32,
          marginLeft: 20,
          marginBottom: 15,
          width: '50px'
        }}
      >
        <MenuSvg />
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        style={{
          visibility: !collapsed ? 'visible' : 'hidden',
          overflowY: 'scroll',
          height: '100vh',
          width: '100%'
        }}
      >
        <Menu.Item
          key="1"
          icon={<PieChartOutlined />}
          onClick={() => {
            setCollapsed(true);
            history.push({
              pathname: '/'
            });
          }}
        >
          หน้าแรก
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="หมวดหมู่">
          {CATEGORY.map(({ id, name }) => (
            <Menu.Item
              key={id}
              onClick={() => {
                setCollapsed(true);
                history.push({
                  pathname: `/${id}`
                });
              }}
            >
              {name}
            </Menu.Item>
          ))}
        </SubMenu>{' '}
        <Menu.Item
          key="2"
          icon={<DesktopOutlined />}
          onClick={() => {
            setCollapsed(true);
            history.push({
              pathname: '/user/account/profile'
            });
          }}
        >
          กล่องข้อความ
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<ContainerOutlined />}
          onClick={() => {
            setCollapsed(true);
            history.push({
              pathname: '/community/zxcvb234'
            });
          }}
        >
          ชุมชนความช่วยเหลือ
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<DesktopOutlined />}
          onClick={() => {
            setCollapsed(true);
            history.push({
              pathname: '/request'
            });
          }}
        >
          รายการขอความช่วยเหลือของฉัน
        </Menu.Item>
        <Menu.Item
          key="9"
          icon={<ContainerOutlined />}
          onClick={() => {
            setCollapsed(true);
            history.push({
              pathname: '/provide'
            });
          }}
        >
          รายการให้ความช่วยเหลือของฉัน
        </Menu.Item>
        <Menu.Item key="10" icon={<DesktopOutlined />}>
          ออกจากระบบ
        </Menu.Item>
      </Menu>
    </div>
  );
};
