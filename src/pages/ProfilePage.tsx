/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import Flex from 'components/Flex/Flex';
import { Navbar } from 'components/Navbar/Navbar';
import { USER_DATA } from 'data/user';
import { SecondaryButton, PrimaryButton } from 'components/Button/Button';

import { SuggestedBadge, RankingBadge } from 'components/Badge/Badge';
import { RANK_BADGE } from 'components/Badge/const';
import { justifyContent } from 'styled-system';

const ProfilePageContainer = styled.div`
    box-sizing: border-box;
    position: relative;
    top: 165px;
    padding: 40px 100px;
`;

const ProfilePageUserInfoSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ProfilePageUserHelperListSection = styled.div`
    display: grid;
    grid-template-columns: minmax(auto, 510px) minmax(auto, 510px) minmax(auto, 510px);
    grid-gap: 30px;
`;

const HelperListCard = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 6px 11px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    height: 341px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 30px;
`;

const HelperListTitle = styled.div`
    font-weight: 700;
    font-size: 24px;
    color: #F86800;
`;

const HelperListHeading = styled.div`
    font-size: 12px;
    line-height: 26px;
    color: #C4C4C4;
`;

const HelperListDetail = styled.div`
    font-size: 18px;
    line-height: 26px;
    color: #000000;
`;

const UserCard = styled.div`
    width: 445px;
    height: 246px;
    background: #FFFFFF;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    display: flex;
    margin-left: 50px;
    border-sizing: border-box;
    padding: 20px;
`;

const HelperImage = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: #0F3276;
    margin-top: 15px;
`;

const UserName = styled.div`
    font-weight: 700;
    font-size: 24px;
    color: #000000;
    margin-bottom: 5px;
`;

const ProfileInfoContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const ProfileInfoListHeading = styled.div`
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #BAB8B8;

`;

const ProfileInfoListDetail = styled.div`
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    color: #F86800;
    margin-left: 8px;
`;

const SeparateLine = styled.div`
    border-bottom: 1px solid #C4C4C4;
    padding: 40px 0;
`;

export const ProfilePage = () => {
    return (
        <React.Fragment>
            <Navbar />
            <ProfilePageContainer>
                <ProfilePageUserInfoSection>
                    <UserCard>
                        <div
                            css={css`
                                display: flex;
                                width: 50%;
                                flex-direction: column;
                                align-items: center;
                                margin-right: 35px;
                            `}
                        >
                            <HelperImage />
                            <SuggestedBadge>แนะนำ</SuggestedBadge>
                        </div>
                        <div
                            css={css`
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                            `}
                        >
                            <UserName>กระทิง สีแดง</UserName>
                            <RankingBadge rankColor="#FFB800">GOLD</RankingBadge>
                        </div>
                    </UserCard>
                    <div>
                        <Flex>
                            <ProfileInfoListHeading>ขอบเขตการช่วยเหลือ</ProfileInfoListHeading>
                            <ProfileInfoListDetail>มหาลัยเกษตรศาสตร์ บางเขน</ProfileInfoListDetail>                        
                        </Flex>                
                        <ProfileInfoContainer>
                            <Flex>
                                <ProfileInfoListHeading>ยอดการช่วยเหลือ</ProfileInfoListHeading>
                                <ProfileInfoListDetail>100</ProfileInfoListDetail>
                            </Flex>
                            <Flex>
                                <ProfileInfoListHeading>กำลังติดตาม</ProfileInfoListHeading>
                                <ProfileInfoListDetail>40</ProfileInfoListDetail>                        
                            </Flex>
                            <Flex>
                                <ProfileInfoListHeading>ผู้ติดตาม</ProfileInfoListHeading>
                                <ProfileInfoListDetail>110</ProfileInfoListDetail>                        
                            </Flex>
                            <Flex>
                                <ProfileInfoListHeading>คะแนน</ProfileInfoListHeading>
                                <ProfileInfoListDetail>5.0</ProfileInfoListDetail>                        
                            </Flex>
                        </ProfileInfoContainer>                           
                    </div>
                </ProfilePageUserInfoSection>
                <SeparateLine />
                <ProfilePageUserHelperListSection>
                    {USER_DATA[0].helpList.map(({ id, name, title, location, helpSum, serviceCharge, payment}) => (
                        <HelperListCard
                            key={id}
                        >
                            <HelperListTitle>{title}</HelperListTitle>
                            <Flex justify="space-between">
                                <HelperListHeading>ผู้ให้ความช่วยเหลือ</HelperListHeading>
                                <HelperListDetail>{name}</HelperListDetail>                            
                            </Flex>
                            <Flex justify="space-between">
                                <HelperListHeading>สถานที่ให้ความช่วยเหลือ</HelperListHeading>
                                <HelperListDetail>{location}</HelperListDetail>                            
                            </Flex>
                            <Flex justify="space-between">
                                <HelperListHeading>ยอดการให้ความช่วยเหลือ</HelperListHeading>
                                <HelperListDetail>{helpSum}</HelperListDetail>                            
                            </Flex>
                            <Flex justify="space-between">
                                <HelperListHeading>ค่าบริการ</HelperListHeading>
                                <HelperListDetail>{serviceCharge}</HelperListDetail>                            
                            </Flex>
                            <Flex justify="space-between">
                                <HelperListHeading>วิธีการชำระเงิน</HelperListHeading>
                                <HelperListDetail>{payment}</HelperListDetail>                            
                            </Flex>                            
                        </HelperListCard>                        
                    ))}
                </ProfilePageUserHelperListSection>
            </ProfilePageContainer>
        </React.Fragment>
    )
}