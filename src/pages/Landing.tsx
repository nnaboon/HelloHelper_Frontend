/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState} from 'react';
import styled from '@emotion/styled';
import { Input, Space, Modal, Button } from 'antd';
import { css, jsx, useTheme } from '@emotion/react'
import OrangeCircle from '../images/circle-orange-background.png';
import { CategoryButton } from 'components/CategoryButton/CategoryButton';
import { PopularRequestCard, TopTenRequestCard } from 'components/Card/Card';
import ShoppingBag from '../images/shopping-bag.png';
import { Text } from 'components/Text';
import { TOP_TEN_SEARCH_WEEKLY } from 'data/search';
import { TopSearchButton } from 'components/Button/Button';
import { PostRequestButton } from 'components/Button/PostRequestButton';


export const TopTenSearchContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    grid-gap: 28px;
    padding: 10px;
    overflow-x: scroll;
`;

export const LandingPage = () => {
    const { Search } = Input;
    const onSearch = value => console.log(value);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
    return (
        <div
            css={css`
                padding-left: 200px;
            `}
        >
            <img
                src={OrangeCircle}
                alt="orange background"
                css={css`
                    z-index: -1;
                    position: relative;
                    top: 0;
                    left: 25%;
                    width: 75%;
                `}
            />
            <img
                src={ShoppingBag}
                alt="orange background"
                css={css`
                    z-index: -1;
                    position: relative;
                    right: 15%;
                    top: 70px;
                `}
            />
            <Text
                fontSize="48px"
                css={css`
                    top: -160px;
                    position: relative;
                `}
            >
                Find rare
            </Text>
            <Text
                fontSize="36px"
                css={css`
                    top: -140px;
                    position: relative;
                    white-space: pre;

                `}
            >
                แพลตฟอร์มประสานความช่วยเหลือ{'\n'}
                สำหรับการซื้อสินค้าหายาก
            </Text>
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
            <PostRequestButton />

            <Search
                placeholder="ข้าวผัดป้าเขียว, ก๋วยจั๊บนายวาย, แกงกะหรี่ป้าอร โชคชัย4"
                onSearch={onSearch}
                size="large"
                style={{ width: '700px', height: '40px' }}
            />

            <Search
                placeholder="ค้นหาสถานที่"
                onSearch={onSearch}
                size="large"
                style={{ width: '462px', height: '60px' }}
            />
        </div>
    )
}