/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { CATEGORY } from 'data/category';
import { mediaQueryLargeDesktop } from 'styles/variables';
import { mediaQueryMiniDesktop } from '../../styles/variables';
import { Menu, Switch, Divider } from 'antd';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LinkOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

const SidebarSection = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  width: 25%;
  align-items: end;
  padding-left: 25px;
  border-right: 1px solid rgb(239, 243, 244);
  z-index: 3;
  top: 200px;
  left: 0;
  height: 100%;
  overflow-y: scroll;

  ${mediaQueryLargeDesktop} {
    height: calc(100% - 165px);
  }

  ${mediaQueryLargeDesktop} {
    top: 160px;
  }
`;

const SidebarItem = styled.div<{ isActive: boolean }>`
  width: max-content;
  max-width: 460px;
  margin-right: 20px;
  margin-bottom: 20px;
  font-size: ${(props) => (props.isActive ? '24px' : '22px')};
  cursor: pointer;
  padding: 10px;
  border-radius: 20px;
  font-weight: ${(props) => (props.isActive ? 700 : 400)};
  color: ${(props) => (props.isActive ? '#EE6400' : 'black')};

  ${mediaQueryLargeDesktop} {
    max-width: 280px;
    margin-bottom: 8px;
    font-size: ${(props) => (props.isActive ? '19px' : '16px')};
  }

  ${mediaQueryMiniDesktop} {
    top: 144px;
    padding: 8px 10px;
    margin-bottom: 5px;
  }
`;

const SidebarLink = styled.div`
  text-decoration: none;
`;

export const Sidebar = () => {
  const history = useHistory();
  const location = useLocation();
  const [isActive, setIsActive] = useState<string>('');
  const query = location.pathname.split('/')[1];

  useEffect(() => {
    if (location.pathname) {
      setIsActive(location.pathname.split('/')[1]);
    } else {
      setIsActive('food');
    }
  }, [location]);

  return (
    <SidebarSection>
      {/* {CATEGORY.map(({ name, id }) => (
        <SidebarItem key={id} isActive={id === isActive ? true : false}>
          <SidebarLink
            onClick={() => {
              setIsActive(id);
              history.push({
                pathname: `${id}`
              });
            }}
          >
            {name}
          </SidebarLink>
        </SidebarItem>
      ))} */}
      <Menu
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f9f9f9',
          border: 'none'
        }}
        mode={'inline'}
      >
        <SubMenu key="food" title="ด้านอาหาร">
          <Menu.Item
            key="savory"
            onClick={() => {
              history.push({
                pathname: 'food'
              });
            }}
          >
            อาหารคาว
          </Menu.Item>
          <Menu.Item
            key="dessert"
            onClick={() => {
              history.push({
                pathname: 'dessert'
              });
            }}
          >
            ขนมหวาน
          </Menu.Item>
          <Menu.Item
            key="season"
            onClick={() => {
              history.push({
                pathname: 'season'
              });
            }}
          >
            เครื่องปรุง
          </Menu.Item>
        </SubMenu>
        <SubMenu key="cloth" title="ด้านเครื่องแต่งกาย">
          <Menu.Item
            key="cloth"
            onClick={() => {
              history.push({
                pathname: 'cloth'
              });
            }}
          >
            เสื้อ
          </Menu.Item>
          <Menu.Item
            key="bottom"
            onClick={() => {
              history.push({
                pathname: 'bottom'
              });
            }}
          >
            กางเกง
          </Menu.Item>
          <Menu.Item
            key="shoes"
            onClick={() => {
              history.push({
                pathname: 'shoes'
              });
            }}
          >
            รองเท้า
          </Menu.Item>
          <Menu.Item
            key="underwear"
            onClick={() => {
              history.push({
                pathname: 'underwear'
              });
            }}
          >
            ชุดชั้นใน
          </Menu.Item>
          <Menu.Item
            key="exercise"
            onClick={() => {
              history.push({
                pathname: 'exercise'
              });
            }}
          >
            ชุดออกกำลัง
          </Menu.Item>
          <Menu.Item
            key="jewelry"
            onClick={() => {
              history.push({
                pathname: 'jewelry'
              });
            }}
          >
            เครื่องประดับ
          </Menu.Item>
        </SubMenu>
        <SubMenu key="furniture" title="ด้านเครื่องใช้ในบ้าน">
          <Menu.Item
            key="living"
            onClick={() => {
              history.push({
                pathname: 'furniture'
              });
            }}
          >
            ห้องนั่งเล่น
          </Menu.Item>
          <Menu.Item
            key="kitchen"
            onClick={() => {
              history.push({
                pathname: 'kitchen'
              });
            }}
          >
            ห้องครัว
          </Menu.Item>
          <Menu.Item
            key="bathroom"
            onClick={() => {
              history.push({
                pathname: 'bathroom'
              });
            }}
          >
            ห้องน้ำ
          </Menu.Item>
          <Menu.Item
            key="bedroom"
            onClick={() => {
              history.push({
                pathname: 'bedroom'
              });
            }}
          >
            ห้องนอน
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          key="electronic"
          onClick={() => {
            history.push({
              pathname: 'electronic'
            });
          }}
        >
          ด้านเครื่องใช้ไฟฟ้า
        </Menu.Item>
        <Menu.Item
          key="agriculture"
          onClick={() => {
            history.push({
              pathname: 'mobile'
            });
          }}
        >
          ด้านการเกษตร
        </Menu.Item>
        <Menu.Item
          key="anime"
          onClick={() => {
            history.push({
              pathname: 'mobile'
            });
          }}
        >
          ด้านการ์ตูน
        </Menu.Item>
        <Menu.Item
          key="stationary"
          onClick={() => {
            history.push({
              pathname: 'mobile'
            });
          }}
        >
          ด้านหนังสือและเครื่องเขียน
        </Menu.Item>
        <Menu.Item
          key="music"
          onClick={() => {
            history.push({
              pathname: 'mobile'
            });
          }}
        >
          ด้านเพลงและดนตรี
        </Menu.Item>
        <Menu.Item
          key="mobile"
          onClick={() => {
            history.push({
              pathname: 'mobile'
            });
          }}
        >
          ด้านมือถือและอุปกรณ์เสริม
        </Menu.Item>
        <Menu.Item
          key="sports"
          onClick={() => {
            history.push({
              pathname: 'sports'
            });
          }}
        >
          ด้านกีฬา
        </Menu.Item>
        <Menu.Item
          key="health"
          onClick={() => {
            history.push({
              pathname: 'health'
            });
          }}
        >
          ด้านสุขภาพและความงาม
        </Menu.Item>
        <Menu.Item
          key="toy"
          onClick={() => {
            history.push({
              pathname: 'toy'
            });
          }}
        >
          ด้านของเล่น
        </Menu.Item>
      </Menu>
    </SidebarSection>
  );
};
