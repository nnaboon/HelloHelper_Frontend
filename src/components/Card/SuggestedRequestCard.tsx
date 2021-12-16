/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { useHistory } from 'react-router-dom';

import { RankingBadge } from '../Badge/Badge';
import { RANK_BADGE } from 'components/Badge/const';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import RequestImage from 'images/request.jpeg';
import { mediaQueryMobile, MOBILE_WIDTH } from 'styles/variables';
import { useMedia } from '../../styles/variables';

const RequestHelperCardContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-bottom: 40px;
  margin-top: 30px;
  position: relative;

  ${mediaQueryMobile} {
    overflow-x: visible;
    margin-bottom: 10px;
    margin-top: 10px;
  }
`;

const CardContainer = styled.div`
  min-width: 448px;
  width: 95%;
  height: 341px;
  background: #ffffff;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 40px 30px;
  box-sizing: border-box;
  position: relative;
  margin-right: 20px;
  position: relative;
  top: -20px;
  margin-top: 40px;
  cursor: pointer;

  ${mediaQueryMobile} {
    width: 100%;
    height: 270px;
    min-width: 100%;
    padding: 20px;
  }
`;

const RequestTitle = styled.div`
  font-weight: 800;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 20px;

  ${mediaQueryMobile} {
    font-size: 18px;
    line-height: 17px;
    margin-bottom: 10px;
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

  ${mediaQueryMobile} {
    position: absolute;
    top: -20px;
    min-width: 100%;
    width: 100%;
    height: 140px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 12px;
  }
`;

const RequestDataTitle = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #c4c4c4;
  max-width: 91px;
  margin-right: 8px;
  width: 80px;
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
  margin-bottom: 5px;
`;

export const SuggestedRequestSection = ({ data }: any) => {
  const history = useHistory();
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

  return (
    <RequestHelperCardContainer>
      {data.map(
        ({
          id,
          title,
          imageUrl,
          name,
          payment,
          maxServiceCharge,
          location,
          rank
        }) => (
          <CardContainer
            onClick={() => {
              history.push({
                pathname: `/${title}/${id}`,
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

                ${mediaQueryMobile} {
                  flex-direction: column;
                }
              `}
            >
              <div
              // css={css`
              //   display: flex;
              //   width: 90%;
              // `}
              >
                <RequestImageSection src={RequestImage} alt="request" />
              </div>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  position: absolute;
                  top: 50%;
                `}
              >
                <RequestTitle>{title}</RequestTitle>
                <RequestDataContent>
                  <RequestDataTitle>ชื่อ</RequestDataTitle>
                  <RequestDataInfo>{name}</RequestDataInfo>
                </RequestDataContent>
                <RequestDataContent>
                  <RequestDataTitle>ระดับ</RequestDataTitle>
                  <RankingBadge rankColor={RANK_BADGE[rank].color}>
                    {rank.toUpperCase()}
                  </RankingBadge>
                </RequestDataContent>
                <RequestDataContent>
                  <RequestDataTitle>
                    {isMobile ? 'สถานที่' : `สถานที่ให้\nความช่วยเหลือ`}
                  </RequestDataTitle>
                  <RequestDataInfo>{location}</RequestDataInfo>
                </RequestDataContent>
                {!isMobile && (
                  <React.Fragment>
                    {' '}
                    <RequestDataContent>
                      <RequestDataTitle>ค่าบริการ</RequestDataTitle>
                      <RequestDataInfo>{maxServiceCharge}</RequestDataInfo>
                    </RequestDataContent>
                    <RequestDataContent>
                      <RequestDataTitle>วิธีการชำระเงิน</RequestDataTitle>
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
