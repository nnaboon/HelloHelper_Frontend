/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { Menu } from 'antd';
import {
  LogoutOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  MessageOutlined,
  UsergroupAddOutlined,
  FileSearchOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { CATEGORY } from 'data/category';
import { MenuSvg } from 'components/Svg/MenuSvg';

interface SideMenuProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const SideMenu = ({ collapsed, setCollapsed }: SideMenuProps) => {
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
          height: '91vh',
          width: '100%'
        }}
      >
        <Menu.Item
          key="1"
          icon={<HomeOutlined />}
          onClick={() => {
            setCollapsed(true);
            history.push({
              pathname: '/'
            });
          }}
        >
          หน้าแรก
        </Menu.Item>
        <SubMenu key="sub1" icon={<UnorderedListOutlined />} title="หมวดหมู่">
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
          icon={<MessageOutlined />}
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
          icon={<UsergroupAddOutlined />}
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
          icon={<FileSearchOutlined />}
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
          icon={<FileTextOutlined />}
          onClick={() => {
            setCollapsed(true);
            history.push({
              pathname: '/provide'
            });
          }}
        >
          รายการให้ความช่วยเหลือของฉัน
        </Menu.Item>
        <Menu.Item key="10" icon={<LogoutOutlined />}>
          ออกจากระบบ
        </Menu.Item>
      </Menu>
    </div>
  );
};
