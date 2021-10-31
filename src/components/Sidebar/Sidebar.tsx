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
    max-width: 150px;
    margin-right: 60px;
    cursor: pointer;
    padding: 12px;
    &:hover {
        background: pink;
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