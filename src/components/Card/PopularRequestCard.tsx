/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { SecondaryButton, PrimaryButton } from 'components/Button/Button';
import { POPULAR_REQUEST_DATA, TOP_TEN_REQUEST_DATA } from 'data/helper';

import { SuggestedBadge, RankingBadge } from '../Badge/Badge';
import { RANK_BADGE } from 'components/Badge/const';
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

const RequestHelperCardContainer = styled.div`
    display: flex;
    overflow-x: scroll;
    margin-bottom: 40px;
    position: relative;
`;

const CardContainer = styled.div`
    width: 448px;
    height: 341px;
    background: #FFFFFF;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 40px 30px;
    box-sizing: border-box;
    position: relative;
    min-width: 448px;
    margin-right: 20px;
    position: relative;
    top: -20px;
    margin-top: 40px;

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
    font-size: 12px;
    line-height: 16px;
    color: #C4C4C4;
    max-width: 91px;
    margin-right: 15px;
`;

const RequestDataInfo = styled.div`
    font-size: 18px;
    line-height: 26px;
    color: #000000;
`;

const RequestDataContent = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
`;

export const PopularRequestCard = ({title, imageURL} : RequestCardProps) => {
    return (
        <RequestHelperCardContainer>
            {POPULAR_REQUEST_DATA.map(({ title, imageUrl, name, payment, serviceRate, location, helpSum, rank }) => (
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
                                width: 32%;
                                flex-direction: column;
                                align-items: center;
                                margin-right: 35px;
                            `}
                        >
                            <HelperImage />
                            <SuggestedBadge>แนะนำ</SuggestedBadge>
                            <RankingBadge rankColor={RANK_BADGE[rank].color}>{rank.toUpperCase()}</RankingBadge>
                        </div>
                        <div
                            css={css`
                                display: flex;
                                flex-direction: column;
                                margin-top: 30px;
                            `}
                        >
                            <RequestDataContent>                            
                                <RequestDataTitle>ชื่อ</RequestDataTitle>
                                <RequestDataInfo>{name}</RequestDataInfo>
                            </RequestDataContent>
                            <RequestDataContent>                            
                                <RequestDataTitle>สถานที่ให้ความช่วยเหลือ</RequestDataTitle>
                                <RequestDataInfo>{location}</RequestDataInfo>
                            </RequestDataContent>
                            <RequestDataContent>                            
                                <RequestDataTitle>ยอดการให้ความช่วยเหลือ</RequestDataTitle>
                                <RequestDataInfo>{helpSum.toLocaleString()}</RequestDataInfo>
                            </RequestDataContent>
                            <RequestDataContent>                            
                                <RequestDataTitle>ค่าบริการ</RequestDataTitle>
                                <RequestDataInfo>{serviceRate}</RequestDataInfo>
                            </RequestDataContent>
                            <RequestDataContent>                            
                                <RequestDataTitle>วิธีการชำระเงิน</RequestDataTitle>
                                <RequestDataInfo>{payment}</RequestDataInfo>
                            </RequestDataContent>
                            
                        </div>
                        <div
                            css={css`
                                display: flex;
                                position: absolute;
                                bottom: 10px;
                                right: 20px;
                                align-items: center;
                            `}
                        >
                            <SecondaryButton>โปรไฟล์</SecondaryButton>
                            <PrimaryButton>แชท</PrimaryButton>
                        </div>
                    </div>
                </CardContainer>
            ))}
        </RequestHelperCardContainer>

    )
}