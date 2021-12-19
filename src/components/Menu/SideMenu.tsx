/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

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
      css={css`
        .ant-tooltip
          .ant-menu-inline-collapsed-tooltip
          .ant-tooltip-placement-left
          .ant-tooltip-hidden {
          visibility: hidden !important;
        }

        .ant-tooltip-inner {
          visibility: hidden !important;
        }
      `}
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
          {CATEGORY.map(({ id, name, icon }) => (
            <Menu.Item
              key={id}
              onClick={() => {
                setCollapsed(true);
                history.push({
                  pathname: `/${id}`
                });
              }}
              css={css`
                span {
                  display: flex;
                  align-items: center;
                }
              `}
            >
              <FontAwesomeIcon icon={icon} />
              <div
                css={css`
                  margin-left: 10px;
                `}
              >
                {name}
              </div>
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
