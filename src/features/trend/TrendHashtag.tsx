import styled from '@emotion/styled';
import React from 'react';


const TrendHashtagSection = styled.div`
    width: auto;
    height: calc( 100vh - 56px);
    margin-right: 10px;
    border-left: 1px solid rgb(239, 243, 244);
`;

export const TrendHashtag = () => {
    return (
        <div>
            <TrendHashtagSection>Trend Hashtag section</TrendHashtagSection>            
        </div>

    )
}