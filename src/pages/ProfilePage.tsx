/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { Text } from 'components/Text';
import Flex from 'components/Flex/Flex';
import { Navbar } from 'components/Navbar/Navbar';
import { USER_DATA } from 'data/user';
import { SecondaryButton, PrimaryButton } from 'components/Button/Button';

import { SuggestedBadge, RankingBadge } from 'components/Badge/Badge';

import { RANK_BADGE } from 'components/Badge/const';
import { justifyContent, alignItems } from 'styled-system';

const ProfilePageContainer = styled.div`
    box-sizing: border-box;
    position: relative;
    top: 165px;
    padding: 40px 100px;
`;

const ProfilePageUserInfoSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
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
    padding: 35px;
    position: relative;
`;

const HelperListTitle = styled.div`
    font-weight: 700;
    font-size: 24px;
    color: #F86800;
    margin-bottom: 8px;
`;

const HelperListHeading = styled.div`
    font-size: 12px;
    line-height: 26px;
    color: #C4C4C4;
    min-width: 150px;
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
    grid-template-columns: minmax(300px, auto) minmax(300px, auto);
    grid-gap: 40px;
`;

const ProfileInfoListHeading = styled.div`
    font-weight: 500;
    font-size: 16px;
    line-height: 14px;
    color: #BAB8B8;

`;

const ProfileInfoListDetail = styled.div`
    font-weight: 700;
    font-size: 23px;
    line-height: 21px;
    color: #F86800;
    margin-left: 12px;
`;

const SeparateLine = styled.div`
    border-bottom: 1px solid #C4C4C4;
    margin: 50px 0;
`;

const SecondaryHelpButton = styled(SecondaryButton)`
    width: max-content;
    padding: 0 10px;
    position: absolute;
    bottom: 20px;
    right: 20px;

    &:hover {
        background: #F86800;
        color: #ffff;
    }
`;

export const ProfilePage = () => {
    return (
        <React.Fragment>
            <Navbar />
            <ProfilePageContainer>
                {USER_DATA.map(({ id, name, imageUrl, location, category, follower, following, helpSum, rank, rating, suggested}) => (
                    <ProfilePageUserInfoSection
                        key={id}
                    >
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
                                {Boolean(suggested) && <SuggestedBadge>แนะนำ</SuggestedBadge>}
                            </div>
                            <div
                                css={css`
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    justify-content: center;
                                `}
                            >
                                <UserName>{name}</UserName>
                                <RankingBadge rankColor={RANK_BADGE[rank].color}>{rank.toUpperCase()}</RankingBadge>
                            </div>
                        </UserCard>
                        <div>
                            <Flex marginBottom="40px" itemAlign="flex-end">
                                <ProfileInfoListHeading>ขอบเขตการช่วยเหลือ</ProfileInfoListHeading>
                                <ProfileInfoListDetail>{location}</ProfileInfoListDetail>
                            </Flex>                
                            <ProfileInfoContainer>
                                <Flex>
                                    <ProfileInfoListHeading>ยอดการช่วยเหลือ</ProfileInfoListHeading>
                                    <ProfileInfoListDetail>{helpSum}</ProfileInfoListDetail>
                                </Flex>
                                <Flex>
                                    <ProfileInfoListHeading>กำลังติดตาม</ProfileInfoListHeading>
                                    <ProfileInfoListDetail>{following}</ProfileInfoListDetail>
                                </Flex>
                                <Flex>
                                    <ProfileInfoListHeading>ผู้ติดตาม</ProfileInfoListHeading>
                                    <ProfileInfoListDetail>{follower}</ProfileInfoListDetail>
                                </Flex>
                                <Flex>
                                    <ProfileInfoListHeading>คะแนน</ProfileInfoListHeading>
                                    <ProfileInfoListDetail>{rating.toFixed(1)}</ProfileInfoListDetail>
                                </Flex>
                            </ProfileInfoContainer>                           
                        </div>
                    </ProfilePageUserInfoSection>
                ))}
                <SeparateLine />
                <Text fontWeight={500} fontSize="24px" marginY="20px">รายการความช่วยเหลือของฉัน</Text>
                <ProfilePageUserHelperListSection>
                    {USER_DATA[0].helpList.map(({ id, name, title, location, helpSum, serviceCharge, payment}) => (
                        <HelperListCard
                            key={id}
                        >
                            <HelperListTitle>{title}</HelperListTitle>
                            <Flex marginY="8px">
                                <HelperListHeading>ผู้ให้ความช่วยเหลือ</HelperListHeading>
                                <HelperListDetail>{name}</HelperListDetail>                            
                            </Flex>
                            <Flex  marginY="8px">
                                <HelperListHeading>สถานที่ให้ความช่วยเหลือ</HelperListHeading>
                                <HelperListDetail>{location}</HelperListDetail>                            
                            </Flex>
                            <Flex  marginY="8px">
                                <HelperListHeading>ยอดการให้ความช่วยเหลือ</HelperListHeading>
                                <HelperListDetail>{helpSum}</HelperListDetail>                            
                            </Flex>
                            <Flex  marginY="8px">
                                <HelperListHeading>ค่าบริการ</HelperListHeading>
                                <HelperListDetail>{serviceCharge}</HelperListDetail>                            
                            </Flex>
                            <Flex  marginY="8px">
                                <HelperListHeading>วิธีการชำระเงิน</HelperListHeading>
                                <HelperListDetail>{payment}</HelperListDetail>                            
                            </Flex>
                            <SecondaryHelpButton>ขอความช่วยเหลือ</SecondaryHelpButton>
                        </HelperListCard>                        
                    ))}
                </ProfilePageUserHelperListSection>
            </ProfilePageContainer>
        </React.Fragment>
    )
}