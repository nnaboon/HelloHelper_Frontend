/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { SecondaryButton, PrimaryButton } from 'components/Button/Button';
import { SUGGESTED_REQUEST_DATA } from 'data/request';

import { SuggestedBadge, RankingBadge } from '../Badge/Badge';
import { RANK_BADGE } from 'components/Badge/const';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';

const RequestHelperCardContainer = styled.div`
    display: flex;
    overflow-x: scroll;
    margin-bottom: 40px;
    margin-top: 30px;
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
    cursor: pointer;
`;

const RequestTitle = styled.div`
    font-weight: 800;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 20px;
`;

const HelperImage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    background: #0F3276;
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

export const SuggestedRequestSection = () => {
    const history = useHistory();

    return (
        <RequestHelperCardContainer>
            {SUGGESTED_REQUEST_DATA.map(({ id, title, imageUrl, name, payment, serviceRate, location, rank }) => (
                <CardContainer
                    onClick={() => {
                        history.push({
                            pathname: `/${id}/${title}`
                        })
                    }}
                >
                    <div
                        css={css`
                            display: flex;
                        `}
                    >
                        <div
                            css={css`
                                display: flex;
                                width: 90%;
                            `}
                        >
                            <HelperImage />
                        </div>
                        <div
                            css={css`
                                display: flex;
                                flex-direction: column;
                            `}
                        >
                            <RequestTitle>{title}</RequestTitle>
                            <RequestDataContent>                            
                                <RequestDataTitle>ชื่อ</RequestDataTitle>
                                <RequestDataInfo>{name}</RequestDataInfo>
                            </RequestDataContent>
                            <RequestDataContent>                            
                                <RequestDataTitle>ระดับ</RequestDataTitle>
                                <RankingBadge
                                    rankColor={RANK_BADGE[rank].color}
                                    style={{ fontSize: '18px', fontWeight: 500}}
                                >{rank.toUpperCase()}</RankingBadge>
                            </RequestDataContent>
                            <RequestDataContent>                            
                                <RequestDataTitle>สถานที่ให้ความช่วยเหลือ</RequestDataTitle>
                                <RequestDataInfo>{location}</RequestDataInfo>
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
                    </div>
                </CardContainer>
            ))}
        </RequestHelperCardContainer>

    )
}
