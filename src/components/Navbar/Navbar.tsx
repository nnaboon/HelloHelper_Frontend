import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { Input } from 'antd';
import UserPic from '../../images/avatar_user.png';

const NavbarSection = styled.div`
    width: 100%;
    height: 165px;
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: column;
    background: #FF8730;
    z-index: 2;
`;

const NavbarList = styled.ul`
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: end;
    box-sizing: border-box;
    padding: 20px 100px;    
    > li {
        display:inline;
        margin: 0 20px;
        cursor: pointer;
        color: #ffff;
    }
`;

const MyAccount = styled.img`
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 25px;
`;

const SearchBarContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const Navbar = () => {    
    const history = useHistory();
    const { Search } = Input;
    const onSearch = value => {
        history.push({
            pathname: '/home',
            search: `?query=${value}`
        })
    }
    
    return (
            <NavbarSection>
                <NavbarList>
                    <li>รายการรับหิ้วของฉัน</li>
                    <li>รายการฝากหิ้วของฉัน</li>
                    <li>กล่องข้อความ</li>
                    <li
                        onClick={() => {
                            history.push({
                                pathname: '/profile'
                            })
                        }}
                    >
                        โปรไฟล์
                    </li>
                    <MyAccount src={UserPic} alt="my account" />
                </NavbarList>
                <SearchBarContainer>
                    <Search
                        placeholder="ข้าวผัดป้าเขียว, ก๋วยจั๊บนายวาย, แกงกะหรี่ป้าอร โชคชัย4"
                        onSearch={onSearch}
                        size="large"
                        style={{ width: '700px', height: '40px' }}
                    />
                </SearchBarContainer>
            </NavbarSection>            

    )
}