/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { Input, Modal } from 'antd';
import UserPic from '../../images/avatar_user.png';
import Flex from 'components/Flex/Flex';
import { RegisterForm } from 'features/login/RegisterForm';
import { LoginForm } from 'features/login/LoginForm';
import { LoginStep } from 'features/login/const';

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
    const [account, setAccount] = useState<Boolean>(false);
    const history = useHistory();
    const { search } = useLocation();
    const { Search } = Input;
    const onSearch = value => {
        history.push({
            pathname: '/search',
            search: `?keyword=${value}`
        })
    }
      const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    
    return (
        <NavbarSection>
            <Global
                styles={css`
                    .ant-modal-content {
                        border-radius: 12px;
                        height: 614px;
                    }
                `}
            />
            <Flex justify="space-between">
                <div
                    style={{ width: '100px', height: '40px', background: 'blue' }}
                    onClick={() => {
                        history.push({
                            pathname: '/'
                        })
                    }}
                >
                    Home
                </div>
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
                    <MyAccount
                        src={UserPic}
                        alt="my account"
                        onClick={() => {
                            // history.push({
                            //     pathname: '/login'
                            // })
                            setIsModalVisible(true)
                        }}
                    />
                </NavbarList>                
            </Flex>
            <SearchBarContainer>
                <Search
                    placeholder="ข้าวผัดป้าเขียว, ก๋วยจั๊บนายวาย, แกงกะหรี่ป้าอร โชคชัย4"
                    onSearch={onSearch}
                    size="large"
                    style={{ width: '700px', height: '40px' }}
                />
            </SearchBarContainer>
            <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={500}
                maskClosable={false}
                centered
            >
                <LoginForm />
                {/* <RegisterForm /> */}
            </Modal>
        </NavbarSection>            

    )
}