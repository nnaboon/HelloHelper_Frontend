/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import Flex from 'components/Flex/Flex';
import { RequestStatusBadge } from 'components/Badge/Badge';
import {
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQuerySmallTablet,
  mediaQueryLargeDesktop
} from 'styles/variables';
import { Skeleton } from 'antd';

interface MyRequestListProps {
  data: any;
  user: any;
}

const HelperListCard = styled.div`
  min-width: 200px;
  width: 100%;
  background: #ffffff;
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
    min-width: 150px;
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

  ${mediaQuerySmallTablet} {
    width: 330px;
  }

  ${mediaQueryMobile} {
    font-size: 16px;
    -webkit-line-clamp: 2;
  }
`;

export const MyRequestList = ({ data, user }: MyRequestListProps) => {
  const history = useHistory();

  return (
    <HelperListCard
      key={data.id}
      onClick={() => {
        history.push({
          pathname: `/request/${data.title}/${data.id}`,
          state: {
            type: 'request'
          }
        });
      }}
    >
      {user ? (
        <React.Fragment>
          {(data.providedUserId.length > 0 || !Boolean(data.visibility)) && (
            <RequestStatusBadge
              status={
                data.providedUserId.length > 0
                  ? 2
                  : Boolean(data.visibility)
                  ? undefined
                  : 0
              }
              css={css`
                position: absolute;
                right: 10px;
                top: 15px;
                margin-left: 0;
                margin-bottom: 10px;
              `}
            >
              {data.providedUserId.length > 0 && Boolean(data.visibility)
                ? 'ช่วยเหลือแล้ว'
                : !Boolean(data.visibility)
                ? 'ซ่อน'
                : null}
            </RequestStatusBadge>
          )}
          <Flex direction="column" justify="flex-start" itemAlign="flex-start">
            <HelperListTitle
              css={css`
                margin-top: 5px;
              `}
            >
              {data.title}{' '}
            </HelperListTitle>

            <Flex marginBottom="10px">
              <HelperListHeading>ผู้ให้ความช่วยเหลือ</HelperListHeading>
              <HelperListDetail>{user.username}</HelperListDetail>
            </Flex>
            <Flex marginBottom="10px">
              <HelperListHeading>สถานที่ให้ความช่วยเหลือ</HelperListHeading>
              <HelperListDetail>{data.location.name}</HelperListDetail>
            </Flex>
            <Flex marginBottom="10px">
              <HelperListHeading>จำนวน</HelperListHeading>
              <HelperListDetail>{data.number}</HelperListDetail>
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
        </React.Fragment>
      ) : (
        <Skeleton />
      )}
    </HelperListCard>
  );
};
