/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { css, jsx } from '@emotion/react'
import OrangeCircle from '../images/circle-orange-background.png';
import ShoppingBag from '../images/shopping-bag.png';
import { Text } from 'components/Text';
import { PrimaryButton } from 'components/Button/Button';

export const LandingPage = () => {
    const history = useHistory();

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
                    top: 140px;
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
            <PrimaryButton
                onClick={() => {
                    history.push('/');
                }}
            >
                เริ่มใช้งาน
            </PrimaryButton>
        </div>
    )
}