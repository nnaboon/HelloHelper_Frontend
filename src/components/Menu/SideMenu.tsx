/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { observer } from 'mobx-react-lite';
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
import { userStore } from 'store/userStore';
import { CATEGORY } from 'data/category';
import { MenuSvg } from 'components/Svg/MenuSvg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryTablet
} from 'styles/variables';
import { auth } from '../../firebase';
import { logout } from 'features/logout/Logout';

interface SideMenuProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const SideMenu = observer(
  ({ collapsed, setCollapsed }: SideMenuProps) => {
    const { SubMenu } = Menu;
    const history = useHistory();

    const { me } = userStore;

    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };

    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          zIndex: 5
        }}
        css={css`
          z-index: 8;
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
            marginLeft: 20,
            width: '50px'
          }}
          css={css`
            ${mediaQuerySmallTablet} {
              position: relative;
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
            display: !collapsed ? 'block' : 'none',
            overflowY: 'scroll',
            width: '100%'
          }}
          css={css`
            height: calc(100vh - 62px);
            position: fixed;

            ${mediaQueryTablet} {
              top: 80px;
              margin-left: -60px;
            }

            ${mediaQueryMobile} {
              top: 64px;
              margin-left: 0;
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
            {CATEGORY.map(({ id, name, icon, sub }) => (
              <React.Fragment>
                {sub ? (
                  <SubMenu key={id} title={name}>
                    {sub?.map(({ id, name }) => (
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
                        <div
                          css={css`
                            margin-left: 10px;
                          `}
                        >
                          {name}
                        </div>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                ) : (
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
                    <div
                      css={css`
                        margin-left: 10px;
                      `}
                    >
                      {name}
                    </div>
                  </Menu.Item>
                )}
                {/* <Menu.Item
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
                  {sub?.map(({ id, name, icon }) => (
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
                      ))
                    </Menu.Item>
                  ))} 
                </Menu.Item>*/}
              </React.Fragment>
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
                pathname: window.localStorage.getItem('seletedCommunity')
                  ? `/community/${window.localStorage.getItem(
                      'selectedCommunity'
                    )}`
                  : me?.communityId?.length > 0
                  ? `/community/${me?.communityId[0]}`
                  : '/community'
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
              logout();
            }}
          >
            ออกจากระบบ
          </Menu.Item>
        </Menu>
      </div>
    );
  }
);
