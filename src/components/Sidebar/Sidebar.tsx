import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { CATEGORY } from 'data/category';

const SidebarSection = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  width: 25%;
  align-items: end;
  padding-left: 25px;
  padding-right: 25px;
  border-right: 1px solid rgb(239, 243, 244);
  z-index: 3;
  top: 165px;
  left: 0;
  height: 100%;
  overflow-y: hidden;
  margin-top: 40px;
`;

const SidebarItem = styled.div<{ isActive: boolean }>`
  width: max-content;
  max-width: 260px;
  margin-right: 20px;
  margin-bottom: 15px;
  font-size: ${(props) => (props.isActive ? '22px' : '20px')};
  cursor: pointer;
  padding: 10px;
  border-radius: 20px;
  font-weight: ${(props) => (props.isActive ? 700 : 500)};
  color: ${(props) => (props.isActive ? '#EE6400' : 'black')};
  background: ${(props) =>
    props.isActive ? 'rgba(255, 116, 0, 0.23)' : 'transparent'};
`;

const SidebarLink = styled.div`
  text-decoration: none;
`;

export const Sidebar = () => {
  const history = useHistory();
  const location = useLocation();
  const [isActive, setIsActive] = useState<string>('');

  useEffect(() => {
    if (location.pathname) {
      setIsActive(location.pathname.split('/')[1]);
    } else {
      setIsActive('food');
    }
  }, [location]);

  return (
    <SidebarSection>
      {CATEGORY.map(({ name, id }) => (
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
      ))}
    </SidebarSection>
  );
};
