/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { SecondaryButton, PrimaryButton } from 'components/Button/Button';

import { SuggestedBadge, RankingBadge } from '../Badge/Badge';
import { RANK_BADGE } from 'components/Badge/const';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { Rate } from 'antd';

import { MessageSvg } from 'components/Svg/MessageSvg';
import { UserSvg } from 'components/Svg/UserSvg';
import UserAvatar from 'images/avatar_helper.png';
import { mediaQueryMobile, MOBILE_WIDTH, useMedia } from 'styles/variables';
import { getStar } from 'components/Star/getStar';
import { USER_DATA } from 'data/user';

const RequestHelperCardContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  position: relative;

  ${mediaQueryMobile} {
    overflow-x: visible;
    margin-bottom: 30px;
    width: 100%;
  }
`;

const CardContainer = styled.div`
  min-width: 500px;
  height: 380px;
  width: 95%;
  max-width: 600px;
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

  ${mediaQueryMobile} {
    width: 100%;
    height: 250px;
    min-width: 100%;
    padding: 20px;
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

const HelperImageSection = styled.img`
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

export const SmallSuggestedRequestCard = ({ data }: any) => {
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
                    <HelperImageSection src={UserAvatar} alt="user avatar" />
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
                      สถานที่ให้{'\n'}ความช่วยเหลือ
                    </RequestDataTitle>
                    <RequestDataInfo>{location.name}</RequestDataInfo>
                  </RequestDataContent>
                  <RequestDataContent>
                    <RequestDataTitle>
                      ยอดการให้{'\n'}ความช่วยเหลือนี้
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
                        <HelperImageSection src={UserAvatar} alt="user" />
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
                          {rating} <Rate count={1} defaultValue={1} />
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
                bottom: 15px;
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
