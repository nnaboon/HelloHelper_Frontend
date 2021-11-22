import React from 'react';
import { useHistory } from 'react-router-dom'
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
    height: 100%;
    overflow-y: hidden;
`;

const SidebarItem = styled.div`
    width: max-content;
    max-width: 260px;
    margin-right: 20px;
    margin-bottom: 15px;
    font-size: 20px;
    cursor: pointer;
    padding: 10px;
    border-radius: 20px;

    &:hover {
        background: rgb(239, 243, 244);
    }
`;

const SidebarLink = styled.div`
    text-decoration: none;
`;


export const Sidebar = () => {
    const history = useHistory();

    return (
        <SidebarSection>
            <SidebarItem>
                <SidebarLink
                    onClick={() => {
                        history.push({
                            pathname: '/home',
                            search: `?query=all`
                        })
                    }}
                >
                    ความช่วยเหลือทั้งหมด
                </SidebarLink>                        
            </SidebarItem>
            {CATEGORY.map(({ name, id }) => (
                <SidebarItem>
                    <SidebarLink
                        onClick={() => {
                            history.push({
                                pathname: '/home',
                                search: `?query=${id}`
                            })
                        }}
                    >
                        {name}
                    </SidebarLink>                        
                </SidebarItem>
            ))}
        </SidebarSection>
    )
}