/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { SecondaryButton, PrimaryButton } from 'components/Button/Button';
import { SuggestedBadge, RankingBadge } from '../Badge/Badge';
import { RANK_BADGE } from 'components/Badge/const';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { MessageSvg } from 'components/Svg/MessageSvg';
import { UserSvg } from 'components/Svg/UserSvg';
import { getStar } from '../Star/getStar';
import { Rate } from 'antd';

const CardContainer = styled.div`
  width: 550px;
  height: 370px;
  background: #ffffff;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 40px 30px;
  box-sizing: border-box;
  position: relative;
  min-width: 500px;
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
  background: #0f3276;
  margin-top: 15px;
`;

const RequestDataTitle = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: #c4c4c4;
  max-width: 110px;
  margin-right: 15px;
  width: 95px;
  text-align: end;
  white-space: pre-wrap;
`;

const RequestDataInfo = styled.div`
  font-size: 18px;
  line-height: 26px;
  color: #000000;
`;

const TopTenRequestCardContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  margin: 40px 0;
  position: relative;
`;

const TopTenRequestDataContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const TopTenRequestSection = ({ data }: any) => {
  const history = useHistory();

  return (
    <TopTenRequestCardContainer>
      {data.map(
        ({
          id,
          title,
          imageUrl,
          name,
          payment,
          serviceCharge,
          location,
          helpSum,
          rank,
          rating
        }) => (
          <CardContainer key={id}>
            <div
              onClick={() => {
                history.push({
                  pathname: `/${title}/${id}`,
                  state: {
                    type: 'provide'
                  }
                });
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
                    margin-top: -13px;
                    margin-right: 35px;
                  `}
                >
                  <HelperImage />
                  <SuggestedBadge>แนะนำ</SuggestedBadge>
                  <div
                    style={{
                      display: 'flex',
                      marginBottom: '8px',
                      marginTop: '-4px'
                    }}
                  >
                    {getStar(rating)}
                  </div>

                  <RankingBadge rankColor={RANK_BADGE[rank].color}>
                    {rank.toUpperCase()}
                  </RankingBadge>
                </div>
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                  `}
                >
                  <TopTenRequestDataContent>
                    <RequestDataTitle>ชื่อ</RequestDataTitle>
                    <RequestDataInfo>{name}</RequestDataInfo>
                  </TopTenRequestDataContent>
                  <TopTenRequestDataContent>
                    <RequestDataTitle>
                      สถานที่ให้{'\n'}ความช่วยเหลือ
                    </RequestDataTitle>
                    <RequestDataInfo>{location}</RequestDataInfo>
                  </TopTenRequestDataContent>
                  <TopTenRequestDataContent>
                    <RequestDataTitle>
                      ยอดการให้ {'\n'}ความช่วยเหลือ
                    </RequestDataTitle>
                    <RequestDataInfo>
                      {helpSum.toLocaleString()} ครั้ง
                    </RequestDataInfo>
                  </TopTenRequestDataContent>
                  <TopTenRequestDataContent>
                    <RequestDataTitle>
                      คะแนนการให้ความช่วยเหลือนี้
                    </RequestDataTitle>
                    <RequestDataInfo>
                      5.0 <Rate count={1} defaultValue={1} />
                    </RequestDataInfo>
                  </TopTenRequestDataContent>
                  <TopTenRequestDataContent>
                    <RequestDataTitle>ค่าบริการ</RequestDataTitle>
                    <RequestDataInfo>{serviceCharge}</RequestDataInfo>
                  </TopTenRequestDataContent>
                </div>
              </div>
            </div>
            <div
              css={css`
                display: flex;
                position: absolute;
                bottom: 10px;
                right: 20px;
                align-items: center;
                z-index: 3;
              `}
            >
              <SecondaryButton
                onClick={() => {
                  history.push({ pathname: `/profile/${id}` });
                }}
              >
                <UserSvg />
                <div>โปรไฟล์</div>
              </SecondaryButton>
              <PrimaryButton>
                <MessageSvg style={{ marginRight: '5px' }} />
                <div>แชท</div>
              </PrimaryButton>
            </div>
          </CardContainer>
        )
      )}
    </TopTenRequestCardContainer>
  );
};
