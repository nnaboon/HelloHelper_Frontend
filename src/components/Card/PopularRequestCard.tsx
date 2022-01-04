/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { SecondaryButton, PrimaryButton } from 'components/Button/Button';

import { SuggestedBadge, RankingBadge } from '../Badge/Badge';
import { RANK_BADGE } from 'components/Badge/const';
import styled from '@emotion/styled';
import { Rate } from 'antd';

import { MessageSvg } from 'components/Svg/MessageSvg';
import { UserSvg } from 'components/Svg/UserSvg';

import { getStar } from 'components/Star/getStar';
import UserAvatar from 'images/avatar_helper.png';

import {
  useMedia,
  MOBILE_WIDTH,
  SMALL_TABLET_WIDTH,
  mediaQueryTablet,
  mediaQueryMobile,
  mediaQuerySmallTablet
} from 'styles/variables';
import { USER_DATA } from 'data/user';

const RequestHelperCardContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-top: 30px;
  position: relative;

  ${mediaQuerySmallTablet} {
    justify-content: center;
    margin: 10px 0;
  }

  ${mediaQueryMobile} {
    width: 100%;
    overflow-x: visible;
  }
`;

const CardContainer = styled.div`
  min-width: 448px;
  height: 370px;
  width: 95%;
  background: #ffffff;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 40px 30px;
  box-sizing: border-box;
  position: relative;
  position: relative;
  top: -20px;
  margin-top: 20px;
  cursor: pointer;
  max-width: 550px;

  ${mediaQueryTablet} {
    min-width: 430px;
  }

  ${mediaQuerySmallTablet} {
    min-width: 336px;
  }

  ${mediaQueryMobile} {
    width: 90%;
    height: 270px;
    min-width: 90%;
    padding: 20px;
    display: flex;
    justify-content: center;
  }
`;

const RequestTitle = styled.div`
  font-weight: 800;
  font-size: 24px;
  margin-bottom: 10px;

  ${mediaQueryMobile} {
    font-size: 18px;
    line-height: 17px;
  }
`;

const HelperImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-top: 15px;

  ${mediaQuerySmallTablet} {
    width: 55px;
    height: 55px;
    margin-top: 0;
  }
`;

const RequestDataTitle = styled.div`
  font-size: 14px;
  white-space: pre-wrap;
  line-height: 20px;
  color: #c4c4c4;
  max-width: 110px;
  margin-right: 15px;
  width: 95px;
  text-align: end;

  ${mediaQueryMobile} {
    max-width: unset;
    width: unset;
    text-align: start;
  }
`;

const RequestDataInfo = styled.div`
  font-size: 18px;
  line-height: 26px;
  color: #000000;
  white-space: wrap;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${mediaQuerySmallTablet} {
    width: 100%;
  }

  ${mediaQueryMobile} {
    font-size: 16px;
    width: 185px;
    -webkit-line-clamp: 1;
  }
`;

const RequestDataContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const PopularRequestSection = ({ data }: any) => {
  const history = useHistory();
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);

  return (
    <RequestHelperCardContainer>
      {data.map(
        ({
          provideId,
          userId,
          title,
          serviceCharge,
          location,
          provideSum,
          rating
        }) => (
          <CardContainer key={provideId}>
            <div
              onClick={() => {
                history.push({
                  pathname: `/${title}/${provideId}`,
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
                {!isSmallTablet && (
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
                    <HelperImage src={UserAvatar} alt="user" loading="lazy" />
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
                    <RankingBadge
                      rankColor={
                        RANK_BADGE[
                          USER_DATA.filter(
                            (props) => props.userId === userId
                          )[0].rank
                        ].color
                      }
                    >
                      {USER_DATA.filter(
                        (props) => props.userId === userId
                      )[0].rank.toUpperCase()}
                    </RankingBadge>
                  </div>
                )}
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    margin-left: -13px;

                    ${mediaQuerySmallTablet} {
                      margin: 0;
                    }
                  `}
                >
                  <RequestDataContent>
                    <RequestDataTitle>ชื่อ</RequestDataTitle>
                    <RequestDataInfo>
                      {
                        USER_DATA.filter((props) => props.userId === userId)[0]
                          .username
                      }
                    </RequestDataInfo>
                  </RequestDataContent>
                  <RequestDataContent>
                    <RequestDataTitle>
                      {isSmallTablet ? 'สถานที่' : `สถานที่ให้\nความช่วยเหลือ`}
                    </RequestDataTitle>
                    <RequestDataInfo>{location.name}</RequestDataInfo>
                  </RequestDataContent>
                  <RequestDataContent>
                    <RequestDataTitle>
                      {isSmallTablet
                        ? `การให้ความช่วยเหลือนี้`
                        : `ยอดการให้\nความช่วยเหลือนี้`}
                    </RequestDataTitle>
                    <RequestDataInfo>
                      {provideSum.toLocaleString()} ครั้ง
                    </RequestDataInfo>
                  </RequestDataContent>
                  {isSmallTablet && (
                    <div
                      css={css`
                        display: flex;
                        position: absolute;
                        bottom: 0px;
                      `}
                    >
                      <div
                        css={css`
                          display: flex;
                          flex-direction: column;
                          margin-right: 10px;
                        `}
                      >
                        <HelperImage src={UserAvatar} alt="user" />
                        <SuggestedBadge>แนะนำ</SuggestedBadge>
                      </div>

                      <div
                        css={css`
                          display: flex;
                          flex-direction: column;
                        `}
                      >
                        {' '}
                        <div
                          style={{
                            display: 'flex',
                            marginBottom: '8px',
                            marginTop: '-4px'
                          }}
                        >
                          {getStar(rating)}
                        </div>
                        <RankingBadge
                          rankColor={
                            RANK_BADGE[
                              USER_DATA.filter(
                                (props) => props.userId === userId
                              )[0].rank
                            ].color
                          }
                        >
                          {USER_DATA.filter(
                            (props) => props.userId === userId
                          )[0].rank.toUpperCase()}
                        </RankingBadge>
                      </div>
                    </div>
                  )}
                  {!isSmallTablet && (
                    <div>
                      {' '}
                      <RequestDataContent>
                        <RequestDataTitle>
                          คะแนนการให้ความช่วยเหลือนี้
                        </RequestDataTitle>
                        <RequestDataInfo>
                          {rating.toFixed(1)}{' '}
                          <Rate count={1} defaultValue={1} />
                        </RequestDataInfo>
                      </RequestDataContent>
                      <RequestDataContent>
                        <RequestDataTitle>ค่าบริการ</RequestDataTitle>
                        <RequestDataInfo>{serviceCharge} บาท</RequestDataInfo>
                      </RequestDataContent>
                    </div>
                  )}
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

                ${mediaQueryMobile} {
                  bottom: 12px;
                }
              `}
            >
              {!isSmallTablet && (
                <SecondaryButton
                  onClick={() => {
                    history.push({ pathname: `/profile/${userId}` });
                  }}
                >
                  <UserSvg />
                  <div>โปรไฟล์</div>
                </SecondaryButton>
              )}

              <PrimaryButton
                css={css`
                  ${mediaQuerySmallTablet} {
                    min-width: 80px;
                    height: 30px;
                    border-radius: 5px;
                    font-size: 16px;
                    margin: 0;
                  }
                `}
              >
                <MessageSvg style={{ marginRight: '5px' }} />
                <div>แชท</div>
              </PrimaryButton>
            </div>
          </CardContainer>
        )
      )}
    </RequestHelperCardContainer>
  );
};
