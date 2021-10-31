import styled from '@emotion/styled';
import { Text } from 'components/Text';
import React from 'react';
import { HASHTAG } from 'data/hashtag';

const TrendHashtagSection = styled.div`
    height: calc( 100vh - 65px); 
    border-left: 1px solid rgb(239, 243, 244);
`;

const TrendHashtagContainer = styled.div`
    padding: 20px;
    width: 100%;
    background: purple;
    margin-left: 30px;
    border-radius: 8px;
`;

const TrendHashtagName = styled.div`
    font-weight: 800;
    font-size: 20px;
`;

const TrendHashtagCount = styled.div`
    color: rgb(83, 100, 113);
`
const TrendHashTagItem = styled.div`
    margin: 25px 0;
`


export const TrendHashtag = () => {
    return (
        <div>
            <TrendHashtagSection>
                <TrendHashtagContainer>
                    <Text fontWeight={800} fontSize="20px">Trend Hashtag section</Text>
                    {HASHTAG.map(({ name, count }) => (
                        <TrendHashTagItem>
                            <TrendHashtagName>#{name}</TrendHashtagName>
                            <TrendHashtagCount>{count.toLocaleString()} help request</TrendHashtagCount>                            
                        </TrendHashTagItem>
                    ))}
                </TrendHashtagContainer>
            </TrendHashtagSection>
        </div>

    )
}