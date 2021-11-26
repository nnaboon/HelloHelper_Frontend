/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { SecondaryButton, PrimaryButton } from 'components/Button/Button';
import { TOP_TEN_REQUEST_DATA } from 'data/helper';
import { SuggestedBadge, RankingBadge } from '../Badge/Badge';
import StarIcon from 'images/rating-star.png';
import { RANK_BADGE } from 'components/Badge/const';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';

const CardContainer = styled.div`
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

const TopTenRequestCardContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  margin: 40px 0;
  position: relative;
`;

const TopTenRequestDataContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

export const TopTenRequestSection = () => {
  const history = useHistory();

  return (
    <TopTenRequestCardContainer>
      {TOP_TEN_REQUEST_DATA.map(
        ({
          id,
          title,
          imageUrl,
          name,
          payment,
          serviceRate,
          location,
          helpSum,
          rank
        }) => (
          <CardContainer key={id}>
            <div
              onClick={() => {
                history.push({
                  pathname: `/${title}/${id}`
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
                    <img
                      src={StarIcon}
                      alt="star"
                      style={{
                        width: '26px',
                        height: '26px',
                        marginRight: '2px'
                      }}
                    />
                    <img
                      src={StarIcon}
                      alt="star"
                      style={{
                        width: '26px',
                        height: '26px',
                        marginRight: '2px'
                      }}
                    />
                    <img
                      src={StarIcon}
                      alt="star"
                      style={{
                        width: '26px',
                        height: '26px',
                        marginRight: '2px'
                      }}
                    />
                    <img
                      src={StarIcon}
                      alt="star"
                      style={{
                        width: '26px',
                        height: '26px',
                        marginRight: '2px'
                      }}
                    />
                    <img
                      src={StarIcon}
                      alt="star"
                      style={{
                        width: '26px',
                        height: '26px',
                        marginRight: '2px'
                      }}
                    />
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
                    <RequestDataTitle>สถานที่ให้ความช่วยเหลือ</RequestDataTitle>
                    <RequestDataInfo>{location}</RequestDataInfo>
                  </TopTenRequestDataContent>
                  <TopTenRequestDataContent>
                    <RequestDataTitle>ยอดการให้ความช่วยเหลือ</RequestDataTitle>
                    <RequestDataInfo>
                      {helpSum.toLocaleString()}
                    </RequestDataInfo>
                  </TopTenRequestDataContent>
                  <TopTenRequestDataContent>
                    <RequestDataTitle>ค่าบริการ</RequestDataTitle>
                    <RequestDataInfo>{serviceRate}</RequestDataInfo>
                  </TopTenRequestDataContent>
                  <TopTenRequestDataContent>
                    <RequestDataTitle>วิธีการชำระเงิน</RequestDataTitle>
                    <RequestDataInfo>{payment}</RequestDataInfo>
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
                  history.push({ pathname: '/profile' });
                }}
              >
                โปรไฟล์
              </SecondaryButton>
              <PrimaryButton>แชท</PrimaryButton>
            </div>
          </CardContainer>
        )
      )}
    </TopTenRequestCardContainer>
  );
};
