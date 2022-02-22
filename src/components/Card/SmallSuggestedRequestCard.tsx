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
import DefaultImage from 'images/default.png';
import { useAddChatRoom } from 'hooks/chat/useAddChatRoom';

import {
  mediaQueryMobile,
  mediaQueryLargeDesktop,
  MOBILE_WIDTH,
  useMedia,
  mediaQueryTablet
} from 'styles/variables';
import { getStar } from 'components/Star/getStar';
import { myAccountUserId, USER_DATA } from 'data/user';

const RequestHelperCardContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  position: relative;

  ${mediaQueryMobile} {
    overflow-x: visible;
    width: 100%;
  }
`;

const CardContainer = styled.div`
  min-width: 500px;
  height: 440px;
  width: 100%;
  max-width: 600px;
  background: #ffffff;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 20px 30px;
  box-sizing: border-box;
  position: relative;
  position: relative;
  top: -20px;
  margin-top: 20px;
  margin-bottom: 10px;
  cursor: pointer;

  ${mediaQueryLargeDesktop} {
    min-width: 360px;
    height: 380px;
    max-width: 550px;
  }

  ${mediaQueryTablet} {
    margin-right: 0;
  }

  ${mediaQueryMobile} {
    width: 100%;
    height: 250px;
    min-width: 100%;
    padding: 20px;
  }
`;

const RequestTitle = styled.div`
  font-weight: 800;
  font-size: 2rem;
  margin-bottom: 10px;
  word-break: break-word;

  ${mediaQueryLargeDesktop} {
    font-size: 1.5rem;
  }

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
  object-fit: cover;

  ${mediaQueryLargeDesktop} {
    width: 90px;
    height: 90px;
  }

  ${mediaQueryMobile} {
    width: 55px;
    height: 55px;
    margin-top: 0;
  }
`;

const RequestDataTitle = styled.div`
  font-size: 0.85rem;
  white-space: pre-wrap;
  line-height: 20px;
  color: #c4c4c4;
  // max-width: 120px;
  margin-right: 15px;
  width: 111px;
  text-align: end;

  ${mediaQueryLargeDesktop} {
    font-size: 14px;
  }

  ${mediaQueryMobile} {
    max-width: unset;
    width: unset;
    text-align: start;
  }
`;

const RequestDataInfo = styled.div`
  font-size: 1.4rem;
  line-height: 26px;
  color: #000000;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${mediaQueryLargeDesktop} {
    font-size: 1.2rem;
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
  margin-bottom: 15px;

  ${mediaQueryLargeDesktop} {
    margin-bottom: 10px;
  }
`;

export const SmallSuggestedRequestCard = ({ data }: any) => {
  const history = useHistory();
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const { execute: addChatRoom } = useAddChatRoom();

  return (
    <RequestHelperCardContainer>
      {data.map(
        ({
          id,
          userId,
          title,
          serviceCharge,
          location,
          provideSum,
          rating,
          user
        }) => (
          <CardContainer key={id}>
            <div
              onClick={() => {
                history.push({
                  pathname: `/provide/${title}/${id}`,
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
                      margin-top: -7px;
                      margin-right: 35px;
                      align-items: center;
                    `}
                  >
                    <HelperImageSection
                      loading="lazy"
                      src={user.imageUrl ?? DefaultImage}
                      alt="user avatar"
                    />
                    {Boolean(user.recommend) && (
                      <SuggestedBadge>แนะนำ</SuggestedBadge>
                    )}
                    <div
                      style={{
                        display: 'flex',
                        marginBottom: '12px',
                        marginTop: '0px'
                      }}
                    >
                      {getStar(rating)}
                    </div>
                    <RankingBadge
                      rankColor={RANK_BADGE[user.rank].color}
                      css={css`
                        ${mediaQueryMobile} {
                          margin-left: 0;
                          margin-top: -5px;
                        }
                      `}
                    >
                      {user.rank.toUpperCase()}
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
                    <RequestDataInfo>{user.username}</RequestDataInfo>
                  </RequestDataContent>
                  <RequestDataContent>
                    <RequestDataTitle>
                      สถานที่ให้{'\n'}ความช่วยเหลือ
                    </RequestDataTitle>
                    <RequestDataInfo>{location.name}</RequestDataInfo>
                  </RequestDataContent>
                  <RequestDataContent>
                    <RequestDataTitle>
                      จำนวนการให้{'\n'}ความช่วยเหลือนี้
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

                        ${mediaQueryMobile} {
                          bottom: 9px;
                        }
                      `}
                    >
                      <div
                        css={css`
                          display: flex;
                          flex-direction: column;
                          margin-right: 10px;
                        `}
                      >
                        <HelperImageSection
                          src={user.imageUrl ?? DefaultImage}
                          alt="user"
                        />
                        {Boolean(user.recommend) && (
                          <SuggestedBadge>แนะนำ</SuggestedBadge>
                        )}
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
                        <RankingBadge rankColor={RANK_BADGE[user.rank].color}>
                          {user.rank.toUpperCase()}
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
              {userId !== window.localStorage.getItem('id') && (
                <PrimaryButton
                  onClick={() => {
                    addChatRoom({
                      providerUserId: userId,
                      requesterUserId: window.localStorage.getItem('id')
                    }).then((res) => {
                      history.push(`/chat/${res.data}`);
                    });
                  }}
                >
                  <MessageSvg style={{ marginRight: '5px' }} />
                  <div>แชท</div>
                </PrimaryButton>
              )}
            </div>
          </CardContainer>
        )
      )}
    </RequestHelperCardContainer>
  );
};
