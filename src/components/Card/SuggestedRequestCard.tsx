/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { RankingBadge } from '../Badge/Badge';
import { RANK_BADGE } from 'components/Badge/const';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import DefaultImage from 'images/default.png';
import {
  useMedia,
  mediaQueryMobile,
  mediaQueryTablet,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  SMALL_TABLET_WIDTH,
  mediaQuerySmallTablet
} from 'styles/variables';
import { USER_DATA } from 'data/user';
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
  margin-left: 5px;

  ${mediaQueryTablet} {
    min-width: 430px;
    padding: 20px;
    margin-top: 40px;
    margin-left: 0;
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
  line-height: 28px;
  margin-bottom: 20px;

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
    width: 100%;
    max-width: 100%;
    margin-left: 0;
  }
`;

const RequestImageSection = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 200px;
  width: 45%;
  height: 100%;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  object-fit: cover;

  ${mediaQuerySmallTablet} {
    position: absolute;
    top: -20px;
    min-width: 100%;
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
  font-size: 12px;
  line-height: 16px;
  color: #c4c4c4;
  max-width: 91px;
  margin-right: 13px;
  width: 80px;
  text-align: end;

  ${mediaQuerySmallTablet} {
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
    font-size: 16px;
    width: 185px;
    -webkit-line-clamp: 1;
`;

const RequestDataContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;

  ${mediaQueryTablet} {
    margin-bottom: 12px;
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
          userId,
          title,
          imageUrl,
          name,
          payment,
          serviceCharge,
          location,
          rank,
          user
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

                ${mediaQuerySmallTablet} {
                  flex-direction: column;
                  width: 100%;
                }
              `}
            >
              <div
                css={css`
                  display: flex;
                  width: 90%;

                  ${mediaQueryTablet} {
                    width: 100%;
                  }
                `}
              >
                <RequestImageSection
                  src={imageUrl ? imageUrl : DefaultImage}
                  alt="request"
                />
              </div>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  position: relative;
                  left: 20px;

                  ${mediaQuerySmallTablet} {
                    position: absolute;
                    top: 57%;
                    left: 0;
                    padding: 0 15px;
                  }

                  ${mediaQueryMobile} {
                    top: 50%;
                  }
                `}
              >
                <RequestTitle>{title}</RequestTitle>
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
