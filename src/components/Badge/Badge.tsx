import React from 'react';
import styled from '@emotion/styled';

export const SuggestedBadge = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    top: -15px;
    width: 62px;
    height: 26px;
    background: #EE6400;
    border-radius: 4px;
    padding: 0 5px;
    color: #ffff;
    justify-content: center;
    text-align: center;
`;


export const RankingBadge = styled.div < { rankColor: string }>`
    display: flex;
    align-items: center;
    height: 32px;
    justify-content: center;
    background: ${props => props.rankColor};
    color: #ffff;
    border-radius: 8px;
    max-width: max-content;
    padding: 0 10px;
    font-size: 20px;
    font-weight: 600;
    position: relative;
`;