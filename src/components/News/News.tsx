import React from 'react';
import styled from '@emotion/styled';

const NewsSection = styled.div`
    width: 100%;
    padding: 60px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const NewsContainer = styled.div`
    width: 49%;
    height: 384px;
    background: #F5F5F5;
`;

export const News = () => {
    return (
        <NewsSection>
            <NewsContainer />
            <NewsContainer />
        </NewsSection>
    )
}