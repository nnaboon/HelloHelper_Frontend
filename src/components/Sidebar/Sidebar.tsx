import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { CATEGORY } from 'data/category';
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';


const SidebarSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    height: calc( 100vh - 65px);
    width: 25%;
    padding-left: 25px;
    padding-right: 25px;
    border-right: 1px solid rgb(239, 243, 244);
    z-index: 3;
`;

const SidebarItem = styled.div`
    width: 100%;
    max-width: 170px;
    margin-right: 60px;
    margin-bottom: 15px;
    font-size: 20px;
    cursor: pointer;
    padding: 20px;
    border-radius: 20px;

    &:hover {
        background: rgb(239, 243, 244);
    }
`;

const SidebarLink = styled.a`
    text-decoration: none;
`


export const Sidebar = () => {
    return (
        <SidebarSection>
            {CATEGORY.map(({ name, url }) => (
                <SidebarItem>
                    <SidebarLink
                        href={url}
                    >
                        {name}
                    </SidebarLink>                        
                </SidebarItem>
            ))}
        </SidebarSection>
    )
}