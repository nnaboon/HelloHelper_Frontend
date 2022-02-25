/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Flex from 'components/Flex/Flex';
import { RankingBadge, RequestStatusBadge } from '../Badge/Badge';
import { RANK_BADGE } from 'components/Badge/const';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import DefaultImage from 'images/default.png';
import {
  useMedia,
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQuerySmallTablet,
  mediaQueryLargeDesktop,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  SMALL_TABLET_WIDTH
} from 'styles/variables';
import { useUser } from 'hooks/user/useUser';

const RequestHelperCardContainer = styled.div`
  display: flex;
  margin-top: 30px;
  position: relative;

  ${mediaQueryTablet} {
    justify-content: center;
    margin: 10px 0;
  }

  ${mediaQuerySmallTablet} {
    overflow-x: hidden;
    width: 100%;
  }
`;

const CardContainer = styled.div`
  min-width: 448px;
  height: 425px;
  width: 95%;
  background: #ffffff;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  position: relative;
  top: -20px;
  margin-top: 20px;
  cursor: pointer;
  max-width: 600px;
  margin-left: 5px;

  ${mediaQueryLargeDesktop} {
    min-width: 360px;
    height: 370px;
    max-width: 550px;
  }

  ${mediaQueryTablet} {
    min-width: 430px;
    padding: 0px;
    margin-top: 40px;
    margin-left: 0;
  }

  ${mediaQuerySmallTablet} {
    min-width: 336px;
  }

  ${mediaQueryMobile} {
    width: 90%;
    height: 300px;
    min-width: 90%;
    display: flex;
    justify-content: center;
  }
`;

const RequestTitle = styled.div`
  font-weight: 800;
  line-height: 28px;
  font-size: 1.5rem;
  margin-bottom: 10px;
  word-break: break-word;

  ${mediaQueryLargeDesktop} {
    font-size: 24px;
  }
  ${mediaQueryTablet} {
    overflow-wrap: break-word;
    width: 90%;
    max-width: 200px;
    margin-left: 27px;
  }

  ${mediaQuerySmallTablet} {
    font-size: 18px;
    line-height: 17px;
    margin-bottom: 10px;
    width: unset;
    max-width: unset;
    margin-left: 0;
  }
`;

const RequestImageSection = styled.img`
  top: 0;
  left: 0;
  min-width: 200px;
  width: 100%;
  height: 100%;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  object-fit: cover;

  ${mediaQueryLargeDesktop} {
    width: 90%;
    min-width: 160px;
  }

  ${mediaQuerySmallTablet} {
    top: -20px;
    width: 100%;
    height: 200px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 12px;
  }

  ${mediaQueryMobile} {
    height: 140px;
  }
`;

const RequestDataTitle = styled.div`
  font-size: 1rem;
  line-height: 16px;
  color: #c4c4c4;
  max-width: 105px;
  margin-right: 13px;
  width: 100px;
  text-align: flex-end;
  white-space: pre-wrap;

  ${mediaQueryLargeDesktop} {
    max-width: 71px;
    width: 50%;
    margin-right: 0;
    text-align: flex-start;
    font-size: 0.85rem;
  }

  ${mediaQuerySmallTablet} {
    max-width: unset;
    min-width: 52px;
    width: unset;
    text-align: start;
  }
`;

const RequestDataInfo = styled.div`
  font-size: 1.2rem;
  line-height: 26px;
  color: #000000;

  white-space: pre-wrap;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${mediaQueryLargeDesktop} {
    font-size: 1.1rem;
  }

  ${mediaQuerySmallTablet} {
    font-size: 16px;
    width: 185px;
    -webkit-line-clamp: 1;
`;

const RequestDataContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;

  ${mediaQueryLargeDesktop} {
    margin-bottom: 14px;
  }

  ${mediaQueryTablet} {
    margin-bottom: 12px;
  }

  ${mediaQueryMobile} {
    margin-bottom: 0;
  }
`;

export const SuggestedRequestSection = ({ data }: any) => {
  const history = useHistory();
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);
  const { data: user, execute: getUser } = useUser();

  // useEffect(() => {
  //   getUser(data[0].userId);
  // }, []);

  return (
    <RequestHelperCardContainer>
      {data.map(
        ({
          id,
          title,
          imageUrl,
          payment,
          serviceCharge,
          location,
          user,
          providedUserId,
          visibility
        }) => (
          <CardContainer
            key={id}
            onClick={() => {
              history.push({
                pathname: `/request/${title}/${id}`,
                state: {
                  type: 'request'
                }
              });
            }}
          >
            <div
              css={css`
                display: flex;
                flex-direction: row;
                height: 100%;
                position: relative;

                ${mediaQuerySmallTablet} {
                  flex-direction: column;
                  width: 100%;
                }
              `}
            >
              <div
                css={css`
                  display: flex;
                  width: 100%;

                  ${mediaQueryLargeDesktop} {
                    width: 81%;
                  }

                  ${mediaQueryTablet} {
                    width: 100%;
                  }
                `}
              >
                <RequestImageSection
                  loading="lazy"
                  src={imageUrl ? imageUrl : DefaultImage}
                  alt="request"
                />
              </div>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  width: 100%;

                  position: relative;
                  padding: 25px;

                  ${mediaQueryLargeDesktop} {
                    padding: 25px 20px;
                  }

                  ${mediaQuerySmallTablet} {
                    position: absolute;
                    top: 58%;
                    left: 0;
                    width: 100%;
                    padding: 0 15px;
                  }

                  ${mediaQueryMobile} {
                    top: 46%;
                    padding: 15px;
                  }
                `}
              >
                <div style={{ display: 'inline-block', marginBottom: '10px' }}>
                  <RequestTitle>{title}</RequestTitle>

                  {providedUserId.length > 0 && (
                    <RequestStatusBadge
                      status={providedUserId.length > 0 ? 2 : undefined}
                      css={css`
                        margin-left: 0;
                      `}
                    >
                      ช่วยเหลือแล้ว
                    </RequestStatusBadge>
                  )}
                </div>

                <RequestDataContent>
                  <RequestDataTitle>ชื่อ</RequestDataTitle>
                  <RequestDataInfo>{user.username}</RequestDataInfo>
                </RequestDataContent>
                <RequestDataContent>
                  <RequestDataTitle>ระดับ</RequestDataTitle>

                  <RankingBadge rankColor={RANK_BADGE[user.rank].color}>
                    {user.rank.toUpperCase()}
                  </RankingBadge>
                </RequestDataContent>
                <RequestDataContent>
                  <RequestDataTitle>
                    {isTablet ? 'สถานที่' : `สถานที่ให้\nความช่วยเหลือ`}
                  </RequestDataTitle>
                  <RequestDataInfo>{location.name}</RequestDataInfo>
                </RequestDataContent>
                {!isSmallTablet && (
                  <React.Fragment>
                    {' '}
                    <RequestDataContent>
                      <RequestDataTitle>ค่าบริการ</RequestDataTitle>
                      <RequestDataInfo>{serviceCharge} บาท</RequestDataInfo>
                    </RequestDataContent>
                    <RequestDataContent>
                      <RequestDataTitle>วิธีชำระเงิน</RequestDataTitle>
                      <RequestDataInfo>{payment}</RequestDataInfo>
                    </RequestDataContent>
                  </React.Fragment>
                )}
              </div>
            </div>
          </CardContainer>
        )
      )}
    </RequestHelperCardContainer>
  );
};
