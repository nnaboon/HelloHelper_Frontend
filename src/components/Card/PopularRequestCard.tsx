/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { SecondaryButton, PrimaryButton } from 'components/Button/Button';

import { SuggestedBadge, RankingBadge } from '../Badge/Badge';
import { RANK_BADGE } from 'components/Badge/const';
import styled from '@emotion/styled';
import { Rate } from 'antd';

import { MessageSvg } from 'components/Svg/MessageSvg';
import { UserSvg } from 'components/Svg/UserSvg';

import { getStar } from 'components/Star/getStar';
import DefaultImage from 'images/default.png';
import { useUser } from 'hooks/user/useUser';
import { userStore } from 'store/userStore';
import { ProvideCardContainer } from './Card';

import {
  useMedia,
  MOBILE_WIDTH,
  SMALL_TABLET_WIDTH,
  mediaQueryTablet,
  mediaQueryMobile,
  mediaQuerySmallTablet,
  TABLET_WIDTH
} from 'styles/variables';
import { SkeletonLoading } from 'components/Loading/SkeletonLoading';
import { useAddChatRoom } from 'hooks/chat/useAddChatRoom';
import { mediaQueryLargeDesktop } from '../../styles/variables';

const RequestHelperCardContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-top: 30px;
  position: relative;
  justify-content: center;

  ${mediaQuerySmallTablet} {
    justify-content: center;
    margin: 10px 0;
  }

  ${mediaQueryMobile} {
    width: 100%;
    overflow-x: visible;
  }
`;

const RequestTitle = styled.div`
  font-weight: 800;
  font-size: 1.5rem;
  margin-bottom: 20px;
  word-break: break-all;
  white-space: pre-wrap;

  ${mediaQueryLargeDesktop} {
    font-size: 18px;
  }

  ${mediaQueryMobile} {
    font-size: 18px;
    line-height: 17px;
  }
`;

const HelperImage = styled.img`
  width: 85px;
  height: 85px;

  border-radius: 50%;
  margin-top: 15px;
  object-fit: cover;

  ${mediaQueryLargeDesktop} {
    width: 70px;
    height: 70px;
  }

  ${mediaQuerySmallTablet} {
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
  max-width: 120px;
  margin-right: 15px;
  width: 111px;
  text-align: end;

  ${mediaQueryLargeDesktop} {
    max-width: 80px;
    font-size: 12px;
  }

  ${mediaQuerySmallTablet} {
    max-width: unset;
    width: unset;
    text-align: start;
  }

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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  width: 60%;

  ${mediaQueryLargeDesktop} {
    font-size: 15px;
  }

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

  ${mediaQueryLargeDesktop} {
    margin-bottom: 8px;
  }
`;

export const PopularRequestSection = observer(({ data }: any) => {
  const history = useHistory();
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);
  const { execute: addChatRoom } = useAddChatRoom();

  const { me } = userStore;

  return (
    <RequestHelperCardContainer>
      {true ? (
        <React.Fragment>
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
              <ProvideCardContainer key={id}>
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
                      width: 100%;
                    `}
                  >
                    {!isSmallTablet && (
                      <div
                        css={css`
                          display: flex;
                          width: 30%;
                          flex-direction: column;
                          align-items: center;
                          margin-top: -13px;
                          margin-right: 20px;

                          ${mediaQueryLargeDesktop} {
                            margin-right: 30px;
                          }
                        `}
                      >
                        <HelperImage
                          src={user.imageUrl ?? DefaultImage}
                          alt="user"
                          loading="lazy"
                        />
                        {Boolean(user?.recommend) && (
                          <SuggestedBadge>แนะนำ</SuggestedBadge>
                        )}
                        <div
                          style={{
                            display: 'flex',
                            marginBottom: '8px',
                            marginTop: '4px'
                          }}
                        >
                          {getStar(user.rating)}
                        </div>

                        <RankingBadge rankColor={RANK_BADGE[user.rank].color}>
                          {user.rank.toUpperCase()}
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
                          width: 100%;
                        }
                      `}
                    >
                      <RequestDataContent>
                        <RequestDataTitle>ชื่อ</RequestDataTitle>
                        <RequestDataInfo>{user.username}</RequestDataInfo>
                      </RequestDataContent>
                      <RequestDataContent>
                        <RequestDataTitle>
                          {isSmallTablet
                            ? 'สถานที่'
                            : `สถานที่ให้\nความช่วยเหลือ`}
                        </RequestDataTitle>
                        <RequestDataInfo>{location.name}</RequestDataInfo>
                      </RequestDataContent>
                      <RequestDataContent>
                        <RequestDataTitle>
                          {isSmallTablet
                            ? `จำนวนการให้ความช่วยเหลือนี้`
                            : `จำนวนการให้\nความช่วยเหลือนี้`}
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
                            bottom: 15px;
                            align-items: center;
                          `}
                        >
                          <div
                            css={css`
                              display: flex;
                              flex-direction: column;
                              margin-right: 10px;
                              align-items: center;
                            `}
                          >
                            <HelperImage
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
                              align-items: center;
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
                              {getStar(user.rating)}
                            </div>
                            <RankingBadge
                              rankColor={RANK_BADGE[user.rank].color}
                            >
                              {user.rank.toUpperCase()}
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
                              {rating?.toFixed(1)}{' '}
                              <Rate count={1} defaultValue={1} />
                            </RequestDataInfo>
                          </RequestDataContent>
                          <RequestDataContent>
                            <RequestDataTitle>ค่าบริการ</RequestDataTitle>
                            <RequestDataInfo>
                              {serviceCharge} บาท
                            </RequestDataInfo>
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
                    bottom: 20px;
                    right: 30px;
                    align-items: center;
                    z-index: 3;

                    ${mediaQueryLargeDesktop} {
                      right: 20px;
                      bottom: 15px;
                    }

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
                      css={css`
                        font-size: 18px;

                        ${mediaQueryLargeDesktop} {
                          font-size: 14px;
                        }
                      `}
                    >
                      <UserSvg />
                      <div>โปรไฟล์</div>
                    </SecondaryButton>
                  )}
                  {userId !== window.localStorage.getItem('id') && (
                    <PrimaryButton
                      css={css`
                        font-size: 18px;

                        ${mediaQueryLargeDesktop} {
                          font-size: 14px;
                        }

                        ${mediaQuerySmallTablet} {
                          height: 30px;
                          border-radius: 5px;
                          margin: 0;
                        }
                      `}
                      onClick={() => {
                        addChatRoom({
                          providerUserId: userId,
                          requesterUserId: me.userId
                        }).then((res) => {
                          history.push(`/chat/${res.data}`);
                        });
                      }}
                    >
                      <MessageSvg
                        css={css`
                          margin-right: 5px;
                        `}
                      />
                      <div>แชท</div>
                    </PrimaryButton>
                  )}
                </div>
              </ProvideCardContainer>
            )
          )}
        </React.Fragment>
      ) : (
        <SkeletonLoading />
      )}
    </RequestHelperCardContainer>
  );
});
