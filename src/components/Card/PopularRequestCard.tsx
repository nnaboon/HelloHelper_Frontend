/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { SecondaryButton, PrimaryButton } from 'components/Button/Button';

import { SuggestedBadge, RankingBadge } from '../Badge/Badge';
import { RANK_BADGE } from 'components/Badge/const';
import styled from '@emotion/styled';
import { Divider, Rate, Carousel } from 'antd';

import { MessageSvg } from 'components/Svg/MessageSvg';
import { UserSvg } from 'components/Svg/UserSvg';

import { getStar } from 'components/Star/getStar';
import UserAvatar from 'images/avatar_helper.png';
import { mediaQueryMobile } from 'styles/variables';
import { useMedia, MOBILE_WIDTH } from 'styles/variables';
import { USER_DATA } from 'data/user';

const RequestHelperCardContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-bottom: 40px;
  position: relative;

  ${mediaQueryMobile} {
    width: 100%;
    overflow-x: visible;
    margin-bottom: 30px;
    justify-content: center;
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
  margin-right: 20px;
  position: relative;
  top: -20px;
  margin-top: 20px;
  cursor: pointer;
  max-width: 550px;

  ${mediaQueryMobile} {
    width: 90%;
    height: 270px;
    min-width: 90%;
    padding: 20px;
    display: flex;
    justify-content: center;
    margin: 20px 0;
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

  ${mediaQueryMobile} {
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

  ${mediaQueryMobile} {
    font-size: 16px;
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
                {!isMobile && (
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
                      {isMobile ? 'สถานที่' : `สถานที่ให้\nความช่วยเหลือ`}
                    </RequestDataTitle>
                    <RequestDataInfo>{location.name}</RequestDataInfo>
                  </RequestDataContent>
                  <RequestDataContent>
                    <RequestDataTitle>
                      {isMobile
                        ? `การให้ความช่วยเหลือนี้`
                        : `ยอดการให้\nความช่วยเหลือนี้`}
                    </RequestDataTitle>
                    <RequestDataInfo>
                      {provideSum.toLocaleString()} ครั้ง
                    </RequestDataInfo>
                  </RequestDataContent>
                  {isMobile && (
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
                  {!isMobile && (
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
                        <RequestDataInfo>{serviceCharge}</RequestDataInfo>
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
              {!isMobile && (
                <SecondaryButton
                  onClick={() => {
                    history.push({ pathname: `/profile/${userId}` });
                  }}
                >
                  <UserSvg />
                  <div>โปรไฟล์</div>
                </SecondaryButton>
              )}

              <PrimaryButton>
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
