import styled from '@emotion/styled';
import React from 'react';
import UserPic from '../../images/avatar_user.png';

const NavbarSection = styled.div`
  width: 100%;
  min-height: 65px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: end;
  right: 100px;
`;

const NavbarList = styled.ul`
    list-style-type: none;
    display: flex;
    align-items: center;
    
    > li {
        display:inline;
        margin: 0 20px;
        cursor: pointer;
    }
`;

const MyAccount = styled.img`
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 25px;
`;
export const Navbar = () => {
    return (
        <div>
            <NavbarSection>
                <NavbarList>
                    <li>รายการรับหิ้วของฉัน</li>
                    <li>รายการฝากหิ้วของฉัน</li>
                    <MyAccount src={UserPic} alt="my account" />
                </NavbarList>
            </NavbarSection>            
        </div>

    )
}