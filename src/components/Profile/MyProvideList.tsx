/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useHistory } from 'react-router-dom';
import React from 'react';
import styled from '@emotion/styled';
import Flex from 'components/Flex/Flex';
import { RequestStatusBadge } from 'components/Badge/Badge';
import { Rate, Skeleton } from 'antd';
import {
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQuerySmallTablet,
  mediaQueryLargeDesktop,
  useMedia,
  TABLET_WIDTH
} from 'styles/variables';

interface MyProvideListProps {
  data: any;
  user: any;
}

const HelperListCard = styled.div`
  background: #ffffff;
  min-width: 200px;

  box-shadow: 0px 6px 11px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  height: 400px;
  margin-top: 25px;
  margin-bottom: 20px;
  display: flex;

  box-sizing: border-box;
  padding: 35px;
  position: relative;
  cursor: pointer;

  ${mediaQueryLargeDesktop} {
    height: 370px;
  }

  ${mediaQueryTablet} {
    margin: 0;
  }

  ${mediaQueryMobile} {
    height: 360px;
    margin-top: 0;
    margin-bottom: 30px;
    padding: 25px;
  }
`;

const HelperListTitle = styled.div`
  font-weight: 700;
  font-size: 22px;
  color: #f86800;
  margin-bottom: 10px;
  width: 100%;
  word-break: break-all;

  ${mediaQueryLargeDesktop} {
    font-size: 19px;
  }

  ${mediaQueryMobile} {
    font-size: 18px;
  }
`;

const HelperListHeading = styled.div`
  font-size: 1rem;
  line-height: 26px;
  color: #c4c4c4;
  min-width: 215px;

  ${mediaQueryLargeDesktop} {
    font-size: 13px;
    min-width: 170px;
  }

  ${mediaQueryTablet} {
    min-width: 125px;
    font-size: 11px;
  }

  ${mediaQueryMobile} {
    width: max-content;
    margin-right: 10px;
  }
`;

const HelperListDetail = styled.div`
  font-size: 20px;
  line-height: 26px;
  color: #000000;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  word-break: break-all;

  ${mediaQueryLargeDesktop} {
    font-size: 16px;
  }

  ${mediaQueryTablet} {
    font-size: 14px;
  }

  ${mediaQuerySmallTablet} {
    width: 350px;
  }

  ${mediaQueryMobile} {
    font-size: 16px;
    -webkit-line-clamp: 2;
  }
`;

export const MyProvideList = ({ data, user }: MyProvideListProps) => {
  const history = useHistory();
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);

  return (
    <HelperListCard
      key={data.id}
      onClick={() => {
        history.push({
          pathname: `/provide/${data.title}/${data.id}`,
          state: {
            type: 'provide'
          }
        });
      }}
    >
      <React.Fragment>
        {' '}
        {!Boolean(data.visibility) && (
          <RequestStatusBadge
            status={0}
            css={css`
              position: absolute;
              right: 10px;
              top: 15px;
              margin-left: 0;
              margin-bottom: 10px;
            `}
          >
            ซ่อน
          </RequestStatusBadge>
        )}
        {user ? (
          <Flex
            direction="column"
            justify="flex-start"
            itemAlign="flex-start"
            css={css`
              position: relative;
            `}
          >
            {' '}
            <div
              css={css`
                display: inline-flex;
                align-items: center;
              `}
            >
              {' '}
            </div>
            <HelperListTitle>{data.title}</HelperListTitle>{' '}
            <Flex marginBottom="10px">
              <HelperListHeading>ผู้ให้ความช่วยเหลือ</HelperListHeading>
              <HelperListDetail>{user.username}</HelperListDetail>
            </Flex>
            <Flex marginBottom="10px">
              <HelperListHeading>สถานที่ให้ความช่วยเหลือ</HelperListHeading>
              <HelperListDetail>{data.location.name}</HelperListDetail>
            </Flex>
            <Flex marginBottom="10px">
              <HelperListHeading>
                {' '}
                {isTablet ? 'จำนวน' : 'จำนวนการให้ความช่วยเหลือ'}
              </HelperListHeading>
              <HelperListDetail>{data.provideSum} ครั้ง</HelperListDetail>
            </Flex>
            <Flex marginBottom="10px">
              <HelperListHeading>
                {isTablet ? 'คะแนน' : 'คะแนนการให้ความช่วยเหลือ'}
              </HelperListHeading>
              <HelperListDetail>
                {data.rating.toFixed(1)} <Rate count={1} defaultValue={1} />
              </HelperListDetail>
            </Flex>
            <Flex marginBottom="10px">
              <HelperListHeading>ค่าบริการ</HelperListHeading>
              <HelperListDetail>{data.serviceCharge} บาท</HelperListDetail>
            </Flex>
            <Flex marginBottom="10px">
              <HelperListHeading>วิธีการชำระเงิน</HelperListHeading>
              <HelperListDetail>{data.payment}</HelperListDetail>
            </Flex>
          </Flex>
        ) : (
          <Skeleton paragraph={{ rows: 6 }} />
        )}{' '}
      </React.Fragment>
    </HelperListCard>
  );
};
