import React from 'react';
import styled from '@emotion/styled';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { Navbar } from 'components/Navbar/Navbar';

export const SearchResultPage = () => {
    return (
        <React.Fragment>
            <Navbar />
            <Sidebar />
            <div>Result page</div>
        </React.Fragment>
    )
}