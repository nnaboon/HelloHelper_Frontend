/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import Layout, { Content } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { Navbar } from 'components/Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import { HelpMenu, HELP_MENU_MAPPER } from 'components/Menu/const';
import { MenuTab } from 'components/Menu/MenuTab';
import { Divider } from 'components/Divider/Divider';
import Flex from 'components/Flex/Flex';
import { PopularRequestSection } from 'components/Card/PopularRequestCard';
import { useHistory } from 'react-router-dom';
import { SecondaryButton, PrimaryButton } from 'components/Button/Button';
import { POPULAR_REQUEST_DATA } from 'data/helper';

import { SuggestedBadge, RankingBadge } from 'components/Badge/Badge';
import { RANK_BADGE } from 'components/Badge/const';
import { flexBasis } from 'styled-system';

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
    margin-bottom: 10px;
`;

const HelperImage = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: #0F3276;
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

const SearchResultContent = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 30px;
    overflow: scroll;
    position: relative;
    top: 200px;
`;

const SearchResultCard = styled.div`
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

export const SearchResultPage = () => {
    const [menu, setMenu] = useState<HelpMenu>(
        HelpMenu.REQUEST
    );
    const history = useHistory();
    const { state } = useLocation();
    const currentMenu = ((state as any)?.menu ||
        HelpMenu.REQUEST) as HelpMenu;

    useEffect(() => {
        setMenu(currentMenu);
    }, [currentMenu]);
    
    return (
        <div>
            <Navbar />
            <Layout>
                <Sidebar />
                <Layout>
                    <Content>
                        <Flex justify="center" direction="column" style={{ position: 'relative', top: '165px', height: 'calc( 100vh - 165px)', width: '100%' }}>
                            <div style={{ position: 'fixed', top: '165px' }}>
                                <MenuTab menu={menu} setMenu={setMenu} />
                                <Divider style={{ width: '60%' }} />                        
                            </div>
                            <SearchResultContent>
                    {POPULAR_REQUEST_DATA.map(({ id, title, imageUrl, name, payment, serviceRate, location, helpSum, rank }) => (
                        <CardContainer
                            key={id}
                            onClick={() => {
                                history.push({
                                    pathname: `/${id}/${title}`
                                })
                            }}
                        >
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
                            </SearchResultContent>
                        </Flex>                      
                    </Content>
                                    
                </Layout>

            </Layout>

        </div>
    )
}