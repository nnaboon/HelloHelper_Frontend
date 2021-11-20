/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx, useTheme } from '@emotion/react'
import OrangeCircle from '../images/circle-orange-background.png';
import { CategoryButton } from 'components/CategoryButton/CategoryButton';
import { RequestHelperCard } from 'components/Card/Card';
import ShoppingBag from '../images/shopping-bag.png';
import { Text } from 'components/Text';


export const LandingPage = () => {
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
            <RequestHelperCard
                title={'ข้าวมันไก่โชคชัน 111'}
                imageURL={"dfhjfioashfa"}
            />
        </div>
    )
}