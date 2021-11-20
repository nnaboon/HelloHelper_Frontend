/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { SuggestedBadge, RankingBadge } from '../Badge/Badge';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';

interface RequestCardProps {
    title: string;
    imageURL?: string;
    ranking?: string;
    name?: string;
    location?: string;
    helpSum?: number;
    rate?: number;
    billing?: string;
}

const CardContainer = styled.div`
    width: 448px;
    height: 341px;
    background: #FFFFFF;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 40px 30px;
    box-sizing: border-box;
    position: relative;
`;

const RequestTitle = styled.div`
    font-weight: 800;
    font-size: 24px;
`;

const HelperImage = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: yellow;
    margin-top: 15px;
`;

const RequestDataTitle = styled.div`
    font-family: Roboto;
    font-size: 12px;
    line-height: 16px;
    color: #C4C4C4;
    text-align: end;
    max-width: 91px;
`;

const RequestDataInfo = styled.div`
    font-size: 18px;
    line-height: 26px;
    color: #000000;
    margin-left: 15px;
`;


export const RequestHelperCard = ({title, imageURL} : RequestCardProps) => {
    return (
        <CardContainer>
            <RequestTitle>{title}</RequestTitle>
            <div
                css={css`
                    display: flex;
                `}
            >
                <div
                    css={css`
                        display: flex;
                        width: 48%;
                        flex-direction: column;
                    `}
                >
                    <HelperImage />
                    <SuggestedBadge>แนะนำ</SuggestedBadge>
                    <RankingBadge rankColor="linear-gradient(270deg, #FFE200 -34.75%, #EF8227 27.67%, #DB4D99 102.99%, rgba(255, 184, 0, 0) 103.01%);">PLATINUM</RankingBadge>
                </div>
                <div
                    css={css`
                        display: flex;
                        flex-direction: column;
                        margin-top: 30px;
                    `}
                >
                    <div
                        css={css`
                            display: flex;
                            align-items: center;
                        `}
                    >
                        <RequestDataTitle>ชื่อ</RequestDataTitle>
                        <RequestDataInfo>Ed Sheeran</RequestDataInfo>                        
                    </div>
                </div>
            </div>
        </CardContainer>
    )
}

export const RequestCard = ({title, imageURL} : RequestCardProps) => {
    return (
        <CardContainer>
            <RequestTitle>{title}</RequestTitle>
        </CardContainer>
    )
}