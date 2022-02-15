/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useHistory } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';
import { UserSvg } from 'components/Svg/UserSvg';
import { MessageSvg } from 'components/Svg/MessageSvg';
import UserAvatar from 'images/avatar_helper.png';
import MyAccountAvatar from 'images/avatar_user2.png';
import {
  useMedia,
  MOBILE_WIDTH,
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryLargeDesktop
} from 'styles/variables';

const CommunityMemberCard = styled.div`
  width: 100%;
  height: 130px;
  background: #ffffff;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.09);
  border-radius: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 40px;

  ${mediaQueryMobile} {
    height: 135px;
    margin-bottom: 20px;
  }
`;

const CommunityAdminBadge = styled.div`
  font-weight: normal;
  font-size: 1.2rem;
  color: #ee6400;

  ${mediaQueryLargeDesktop} {
    font-size: 14px;
  }

  ${mediaQueryMobile} {
    width: 100%;
    margin-top: -3px;
  }
`;

const CommunityMemberImage = styled.img`
  border-radius: 50%;
  width: 90px;
  height: 90px;
  margin-right: 55px;

  ${mediaQueryLargeDesktop} {
    width: 74px;
    height: 74px;
  }

  ${mediaQuerySmallTablet} {
    margin-right: 25px;
  }

  ${mediaQueryMobile} {
    width: 60px;
    height: 60px;
    margin-right: 20px;
    margin-left: 20px;
  }
`;

const UserName = styled.div`
  font-weight: 700;
  font-size: 1.7rem;
  color: #000000;
  margin-bottom: 5px;
  margin-right: 30px;

  ${mediaQueryLargeDesktop} {
    font-size: 24px;
  }

  ${mediaQuerySmallTablet} {
    margin-right: 20px;
    max-width: 150px;
  }

  ${mediaQueryMobile} {
    font-size: 16px;
    width: max-content;
    min-width: max-content;
    max-width: max-content;
  }
`;

export const CommunityMemberContent = ({ member }: any) => {
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const history = useHistory();

  return (
    <div>
      {member.map(({ id, role, username, imageUrl }) => (
        <CommunityMemberCard key={id}>
          <div
            css={css`
              display: flex;
              width: 100%;
              align-items: center;
              margin-left: 90px;
              justify-content: space-between;

              ${mediaQuerySmallTablet} {
                margin-left: 30px;
              }

              ${mediaQueryMobile} {
                padding: 20px;
                margin-left: 0;
                flex-direction: column;
              }
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;

                ${mediaQueryMobile} {
                  align-self: flex-start;
                  margin: 0;
              `}
            >
              {' '}
              <CommunityMemberImage
                src={imageUrl}
                alt="community member avatar"
              />
              <UserName>{username}</UserName>
              {Boolean(role) && (
                <CommunityAdminBadge>ผู้นำชุมชน</CommunityAdminBadge>
              )}
            </div>
            <div
              css={css`
                display: flex;
                margin-right: 80px;

                ${mediaQuerySmallTablet} {
                  margin-right: 30px;
                }

                ${mediaQueryMobile} {
                  margin: 0;
                  position: relative;
                  bottom: -13px;
                  width: 100%;
                  justify-content: space-between;
                }
              `}
            >
              {' '}
              <SecondaryButton
                css={css`
                  width: 165px;

                  ${mediaQueryLargeDesktop} {
                    width: 140px;
                  }

                  ${mediaQuerySmallTablet} {
                    width: 100px;
                  }

                  ${mediaQueryMobile} {
                    width: 45%;
                  }
                `}
              >
                <UserSvg />
                <div
                  style={{ marginLeft: 5 }}
                  onClick={() => {
                    history.push({
                      pathname: `/profile/${id}`
                    });
                  }}
                >
                  โปรไฟล์
                </div>
              </SecondaryButton>
              {id !== window.localStorage.getItem('id') && (
                <PrimaryButton
                  css={css`
                    width: 165px;

                    ${mediaQueryLargeDesktop} {
                      width: 140px;
                    }
                    ${mediaQuerySmallTablet} {
                      width: 100px;
                    }

                    ${mediaQueryMobile} {
                      width: 45%;
                    }
                  `}
                >
                  <MessageSvg />
                  <div style={{ marginLeft: 5 }}>แชท</div>
                </PrimaryButton>
              )}
            </div>
          </div>
        </CommunityMemberCard>
      ))}
    </div>
  );
};
