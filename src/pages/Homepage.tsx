/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState} from 'react';
import styled from '@emotion/styled';
import { Input} from 'antd';
import { css, jsx, useTheme } from '@emotion/react'
import { PopularRequestCard } from 'components/Card/PopularRequestCard';
import { TopTenRequestCard } from 'components/Card/TopTenRequestCard';
import { Text } from 'components/Text';
import { TOP_TEN_SEARCH_WEEKLY } from 'data/search';
import { TopSearchButton } from 'components/Button/Button';
import { PostRequestButton } from 'components/Button/PostRequestButton';
import { SuggestedRequestCard } from 'components/Card/SuggestedRequestCard';
import { Navbar } from 'components/Navbar/Navbar';
import { zIndex } from 'styled-system';

const HomePageContainer = styled.div`
    box-sizing: border-box;
    position: relative;
    top: 165px;
    padding: 40px 100px;
`;

const TopTenSearchContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    grid-gap: 28px;
    padding: 10px;
    overflow-x: scroll;
`;

const HomePageNavbar = styled(Navbar)`
    z-index: 2;
`;

export const HomePage = () => {

    const { Search } = Input;
    const onSearch = value => console.log(value);

    return (
        <React.Fragment>
            <HomePageNavbar />
            <HomePageContainer>
                <div
                    css={css`
                        justify-content: space-between;
                        display: flex;
                `}>
                    <Search
                        placeholder="ค้นหาสถานที่"
                        onSearch={onSearch}
                        size="large"
                        style={{ width: '462px', height: '60px' }}
                    />
                    <PostRequestButton />                
                </div>
                <PopularRequestCard
                    title={'ข้าวมันไก่โชคชัน 111'}
                    imageURL={"dfhjfioashfa"}
                />
                <TopTenSearchContainer>
                    {
                        TOP_TEN_SEARCH_WEEKLY.map(({ name }) => (
                            <TopSearchButton>{name}</TopSearchButton>
                        ))
                    }                
                </TopTenSearchContainer>
                <TopTenRequestCard
                    title={'ข้าวมันไก่โชคชัน 111'}
                    imageURL={"dfhjfioashfa"}
                />
                <SuggestedRequestCard
                    title={'ข้าวมันไก่โชคชัน 111'}
                    imageURL={"dfhjfioashfa"}
                />    

            </HomePageContainer>
        </React.Fragment>
    )
}