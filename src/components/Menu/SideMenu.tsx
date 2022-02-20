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
import { mediaQueryMobile, mediaQuerySmallTablet } from 'styles/variables';
import { auth } from '../../firebase';

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
        css={css`
          ${mediaQuerySmallTablet} {
            position: relative;
            top: 35px;
          }

          ${mediaQueryMobile} {
            top: 0;
          }
        `}
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
          width: '100%'
        }}
        css={css`
          height: 100vh;
          ${mediaQuerySmallTablet} {
            height: 89vh;
            position: relative;
            top: 92px;
          }

          ${mediaQueryMobile} {
            height: 92vh;
            top: 0;
          }
        `}
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
              pathname: '/chat'
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
              pathname: `/community/${
                window.localStorage.getItem('selectedCommunity') ?? null
              }`
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
              pathname: '/order/request'
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
              pathname: '/order/provide'
            });
          }}
        >
          รายการให้ความช่วยเหลือของฉัน
        </Menu.Item>
        <Menu.Item
          key="10"
          icon={<LogoutOutlined />}
          onClick={() => {
            window.localStorage.removeItem('id');
            auth.signOut();
            window.location.assign('/');
          }}
        >
          ออกจากระบบ
        </Menu.Item>
      </Menu>
    </div>
  );
};
