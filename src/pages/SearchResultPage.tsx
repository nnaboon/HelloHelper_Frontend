/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { Text } from 'components/Text';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { useLocation } from 'react-router-dom';
import { HelpMenu } from 'components/Menu/const';
import { MenuTab } from 'components/Menu/MenuTab';
import { Divider } from 'components/Divider/Divider';
import Flex from 'components/Flex/Flex';
import { PostRequestButton } from 'components/Button/PostRequestButton';
import { useHistory } from 'react-router-dom';
import { POPULAR_REQUEST_DATA } from 'data/helper';
import { SUGGESTED_REQUEST_DATA } from 'data/request';
import { SuggestedRequestSection } from 'components/Card/SuggestedRequestCard';
import { PopularRequestSection } from 'components/Card/PopularRequestCard';
import { SuggestedBadge, RankingBadge } from 'components/Badge/Badge';

const CardContainer = styled.div`
  width: 95%;
  height: 341px;
  background: #ffffff;
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
  left: 8px;
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
  background: #0f3276;
  margin-top: 15px;
`;

const RequestDataTitle = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #c4c4c4;
  max-width: 91px;
  margin-right: 15px;
  width: 80px;
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
  grid-gap: 10px;
  overflow: scroll;
  position: relative;
`;

const SearchResultCard = styled.div`
  width: 448px;
  height: 341px;
  background: #ffffff;
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
  const [menu, setMenu] = useState<HelpMenu>(HelpMenu.PROVIDE);
  const history = useHistory();
  const { state } = useLocation();
  const currentMenu = ((state as any)?.menu || HelpMenu.PROVIDE) as HelpMenu;

  useEffect(() => {
    setMenu(currentMenu);
  }, [currentMenu]);

  return (
    <WrapperContainer>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div
          css={css`
            position: relative;
            display: flex;
            flex-direction: column;
            left: 25%;
            width: 75%;
          `}
        >
          <div style={{ top: '125px' }}>
            <MenuTab menu={menu} setMenu={setMenu} />
            <Divider />
            <Flex justify="space-between" marginY="20px">
              <Text fontSize="24px" fontWeight={500}>
                ผลการค้นหา ทั้งหมด {POPULAR_REQUEST_DATA.length} รายการ
              </Text>
              <PostRequestButton
                css={css`
                  margin-right: 20px;
                `}
                buttonText="ขอ/ให้ความช่วยเหลือ"
              />
            </Flex>
          </div>
          <SearchResultContent>
            {menu === HelpMenu.PROVIDE
              ? POPULAR_REQUEST_DATA.map((props) => (
                  <PopularRequestSection data={[props]} />
                ))
              : SUGGESTED_REQUEST_DATA.map((props) => (
                  <SuggestedRequestSection data={[props]} />
                ))}
          </SearchResultContent>
        </div>
      </div>
    </WrapperContainer>
  );
};
