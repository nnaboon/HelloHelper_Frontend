
import React from 'react';
import styled from '@emotion/styled';
import { Navbar } from 'components/Navbar/Navbar';

const HomePageContainer = styled.div`
    box-sizing: border-box;
    position: relative;
    top: 165px;
    padding: 0 100px;
`;

export const HomePage = () => {
    return (
        <React.Fragment>
            <Navbar />
            <HomePageContainer>Home page</HomePageContainer>
        </React.Fragment>
    )
}