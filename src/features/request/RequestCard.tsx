/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx, useTheme } from '@emotion/react'
import { REQUEST } from 'data/request';
import { Text } from 'components/Text';
import qs from 'query-string'

const RequestSection = styled.div`
    height: calc( 100vh - 65px);
    overflow-y: scroll;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    width: auto%;
    min-width: 550px;
    max-width: 700px;
    padding: 20px 50px;
    border-bottom: 1px solid rgb(239, 243, 244);
    background: #ffff;
`

const RequestOwner = styled.div`
    display: flex;
    align-items: center;
`;

const RequestContentSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 50px;
`;

const RequestImage = styled.img`
    width: 90%;
    height: 280px;
    margin: 20px 0px;
    border-radius: 8px;
    object-fit: fill;
`;

const RequestOwnerImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

const RequestLocationSection = styled.div`
    display: flex;
`;

const RequestMessageLocation = styled.div`
    width: 90%;
    margin: 10px 0;
`;

const RequestHelperSection = styled.div`
    display: flex;
    align-items: center;
`;

const RequestBottomSection = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const RequestCard = () => {

    const pathname = window.location.pathname.split('/')[1];

    return (
        <RequestSection>
            {(pathname === '' ? REQUEST : REQUEST.filter(({category}) => category.includes(pathname))).map(({ owner, userImageURL, title, location, requestImageURL, message, helper }) => (
                <Card key="title">
                    <RequestContentSection>
                        <RequestImage
                            src={requestImageURL}
                            alt="request img"
                        />
                        <Text fontSize="20px" fontWeight={800}>{title}</Text>
                        <RequestLocationSection>
                            <Text fontSize="16px" marginRight="6px">{location.province}</Text>
                            <Text fontSize="16px">{location.district}</Text>               
                        </RequestLocationSection>
                        <RequestMessageLocation>
                            <Text fontSize="16px" fontWeight={400}>{message}</Text>
                        </RequestMessageLocation>
                    </RequestContentSection>
                    <RequestBottomSection>
                        <RequestOwner>
                            <RequestOwnerImage
                                src={userImageURL}
                                alt="user pic"
                            />
                            <Text
                                fontSize="18px"
                                fontWeight={800}
                                marginLeft={10}
                            > 
                                {owner}
                            </Text>                        
                        </RequestOwner>
                    <RequestHelperSection>
                        helper {helper.length}
                    </RequestHelperSection>                        
                    </RequestBottomSection>



                    {/* <div
                        css={css`
                            display: flex;
                            flex-direction: column;
                        `}
                    >
                        {helper.map(({ username, imageURL }) => (
                            <div>
                                <div>{imageURL}</div>     
                                <div>{username}</div>                 
                            </div>

                        ))}
                    </div> */}
                </Card>

            ))}
        </RequestSection>
    )
}