/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { Dropdown, Menu } from 'antd';
import { SecondaryButton, PrimaryButton } from 'components/Button/Button';
import { Text } from 'components/Text';
import UserAvatar from 'images/avatar_helper.png';

const CommunityMemberCard = styled.div`
  width: 100%;
  height: 120px;
  background: #ffffff;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.09);
  border-radius: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

const CommunityAdminBadge = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 26px;
  color: #ee6400;
`;

const CommunityMemberImage = styled.img`
  border-radius: 50%;
  width: 74px;
  height: 74px;
  margin-right: 55px;
`;

const UserName = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  margin-bottom: 5px;
  margin-right: 30px;
`;

export const CommunitySettingManageMember = ({ member }: any) => {
  const menu = (
    <Menu>
      <Menu.Item>ผู้นำชุมชน</Menu.Item>
      <Menu.Item>สมาชิกชุมขน</Menu.Item>
    </Menu>
  );

  return (
    <div style={{ margin: '40px 60px' }}>
      <Text fontWeight={500} fontSize="28px" marginY="40px">
        ผู้ต้องการเข้าร่วมชุมชน
      </Text>
      {member.map(({ id, name }) => (
        <CommunityMemberCard key={id}>
          <div
            css={css`
              display: flex;
              width: 100%;
              align-items: center;
              margin-left: 90px;
              justify-content: space-between;
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              {' '}
              <CommunityMemberImage
                src={UserAvatar}
                alt="community member avatar"
              />
              <UserName>{name}</UserName>
            </div>
            <div
              css={css`
                display: flex;
                margin-right: 80px;
              `}
            >
              {' '}
              <SecondaryButton
                css={css`
                  width: 140px;
                `}
              >
                <div>ปฏิเสธ</div>
              </SecondaryButton>
              <Dropdown overlay={menu}>
                <PrimaryButton
                  css={css`
                    width: 140px;
                  `}
                >
                  <div>ยอมรับ</div>
                </PrimaryButton>
              </Dropdown>
            </div>
          </div>
        </CommunityMemberCard>
      ))}
      <Text fontWeight={500} fontSize="28px" marginY="40px">
        ผู้นำชุมชน
      </Text>
      {member.map(({ id, name }) => (
        <CommunityMemberCard key={id}>
          <div
            css={css`
              display: flex;
              width: 100%;
              align-items: center;
              margin-left: 90px;
              justify-content: space-between;
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              {' '}
              <CommunityMemberImage
                src={UserAvatar}
                alt="community member avatar"
              />
              <UserName>{name}</UserName>
              <CommunityAdminBadge>ผู้นำชุมชน</CommunityAdminBadge>
            </div>
            <div
              css={css`
                display: flex;
                margin-right: 80px;
              `}
            >
              {' '}
              <SecondaryButton
                css={css`
                  width: 140px;
                `}
              >
                <div>ลบ</div>
              </SecondaryButton>
              <Dropdown overlay={menu}>
                <PrimaryButton
                  css={css`
                    width: 140px;
                  `}
                >
                  <div>เปลี่ยนสถานะ</div>
                </PrimaryButton>
              </Dropdown>
            </div>
          </div>
        </CommunityMemberCard>
      ))}
      <Text fontWeight={500} fontSize="28px" marginY="40px">
        สมาชิกในชุมชน
      </Text>
      {member.map(({ id, name }) => (
        <CommunityMemberCard key={id}>
          <div
            css={css`
              display: flex;
              width: 100%;
              align-items: center;
              margin-left: 90px;
              justify-content: space-between;
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              {' '}
              <CommunityMemberImage
                src={UserAvatar}
                alt="community member avatar"
              />
              <UserName>{name}</UserName>
            </div>
            <div
              css={css`
                display: flex;
                margin-right: 80px;
              `}
            >
              {' '}
              <SecondaryButton
                css={css`
                  width: 140px;
                `}
              >
                <div>ลบ</div>
              </SecondaryButton>
              <Dropdown overlay={menu}>
                <PrimaryButton
                  css={css`
                    width: 140px;
                  `}
                >
                  <div>เปลี่ยนสถานะ</div>
                </PrimaryButton>
              </Dropdown>
            </div>
          </div>
        </CommunityMemberCard>
      ))}
    </div>
  );
};
