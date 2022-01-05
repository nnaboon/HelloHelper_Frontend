/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { Dropdown, Menu } from 'antd';
import { SecondaryButton, PrimaryButton } from 'components/Button/Button';
import { Text } from 'components/Text';
import UserAvatar from 'images/avatar_helper.png';
import MyAccountAvatar from 'images/avatar_user2.png';
import {
  useMedia,
  MOBILE_WIDTH,
  SMALL_TABLET_WIDTH,
  mediaQueryMobile,
  mediaQueryTablet
} from 'styles/variables';
import { myAccountUserId, USER_DATA } from 'data/user';

interface CommunitySettingManagerMemberProps {
  member: any[];
  joinedRequest: string[];
}

const CommunityMemberCard = styled.div`
  width: 100%;
  height: 120px;
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
  font-size: 14px;
  line-height: 26px;
  color: #ee6400;

  ${mediaQueryMobile} {
    width: 100%;
    margin-top: -8px;
  }
`;

const CommunityMemberImage = styled.img`
  border-radius: 50%;
  width: 74px;
  height: 74px;
  margin-right: 55px;

  ${mediaQueryMobile} {
    width: 60px;
    height: 60px;
    margin-right: 20px;
    margin-left: 20px;
  }
`;

const UserName = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  margin-bottom: 5px;
  margin-right: 30px;

  ${mediaQueryMobile} {
    font-size: 16px;
    width: max-content;
    margin-right: 20px;
    min-width: max-content;
  }
`;

export const CommunitySettingManageMember = ({
  member,
  joinedRequest
}: CommunitySettingManagerMemberProps) => {
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);

  const menu = (
    <Menu>
      <Menu.Item>ผู้นำชุมชน</Menu.Item>
      <Menu.Item>สมาชิกชุมขน</Menu.Item>
    </Menu>
  );

  return (
    <div style={{ margin: isSmallTablet ? 0 : '40px 60px' }}>
      <Text fontWeight={500} fontSize="28px" marginY="40px">
        ผู้ต้องการเข้าร่วมชุมชน
      </Text>
      {joinedRequest.map((userId) => (
        <CommunityMemberCard key={userId}>
          <div
            css={css`
              display: flex;
              width: 100%;
              align-items: center;
              margin-left: 90px;
              justify-content: space-between;

              ${mediaQueryTablet} {
                margin-left: 35px;
              }

              ${mediaQueryMobile} {
                margin-left: 0;
                padding: 20px;
                flex-direction: column;
              }
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;

                ${mediaQueryMobile} {
                  margin-left: 0;
                  align-self: flex-start;
                }
              `}
            >
              {' '}
              <CommunityMemberImage
                src={userId === myAccountUserId ? MyAccountAvatar : UserAvatar}
                alt="community member avatar"
              />
              <UserName>
                {
                  USER_DATA.filter((props) => props.userId === userId)[0]
                    .username
                }
              </UserName>
            </div>
            <div
              css={css`
                display: flex;
                margin-right: 80px;

                ${mediaQueryTablet} {
                  margin-right: 35px;
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
                  width: 140px;

                  ${mediaQueryTablet} {
                    width: 120px;
                    margin-right: 0;
                  }

                  ${mediaQueryMobile} {
                    width: 45%;
                  }
                `}
              >
                <div>ปฏิเสธ</div>
              </SecondaryButton>
              <Dropdown overlay={menu}>
                <PrimaryButton
                  css={css`
                    width: 140px;

                    ${mediaQueryTablet} {
                      width: 120px;
                    }

                    ${mediaQueryMobile} {
                      width: 45%;
                    }
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
      {member.map(({ userId }) => (
        <CommunityMemberCard key={userId}>
          <div
            css={css`
              display: flex;
              width: 100%;
              align-items: center;
              margin-left: 90px;
              justify-content: space-between;

              ${mediaQueryTablet} {
                margin-left: 35px;
              }

              ${mediaQueryMobile} {
                margin-left: 0;
                padding: 20px;
                flex-direction: column;
              }
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                ${mediaQueryMobile} {
                  margin-left: 0;
                  align-self: flex-start;
                }
              `}
            >
              {' '}
              <CommunityMemberImage
                src={UserAvatar}
                alt="community member avatar"
              />
              <UserName>
                {
                  USER_DATA.filter((props) => props.userId === userId)[0]
                    .username
                }
              </UserName>
            </div>
            <div
              css={css`
                display: flex;
                margin-right: 80px;

                ${mediaQueryTablet} {
                  margin-right: 35px;
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
                  width: 140px;

                  ${mediaQueryTablet} {
                    width: 120px;
                    margin-right: 0;
                  }

                  ${mediaQueryMobile} {
                    width: 45%;
                  }
                `}
              >
                <div>ลบ</div>
              </SecondaryButton>
              <Dropdown overlay={menu}>
                <PrimaryButton
                  css={css`
                    width: 140px;

                    ${mediaQueryTablet} {
                      width: 120px;
                    }

                    ${mediaQueryMobile} {
                      width: 45%;
                    }
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
      {member.map(({ userId }) => (
        <CommunityMemberCard key={userId}>
          <div
            css={css`
              display: flex;
              width: 100%;
              align-items: center;
              margin-left: 90px;
              justify-content: space-between;

              ${mediaQueryTablet} {
                margin-left: 35px;
              }

              ${mediaQueryMobile} {
                margin-left: 0;
                padding: 20px;
                flex-direction: column;
              }
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                ${mediaQueryMobile} {
                  margin-left: 0;
                  align-self: flex-start;
                }
              `}
            >
              {' '}
              <CommunityMemberImage
                src={UserAvatar}
                alt="community member avatar"
              />
              <UserName>
                {
                  USER_DATA.filter((props) => props.userId === userId)[0]
                    .username
                }
              </UserName>
            </div>
            <div
              css={css`
                display: flex;
                margin-right: 80px;

                ${mediaQueryTablet} {
                  margin-right: 35px;
                }

                ${mediaQueryMobile} {
                  margin: 0;
                  position: relative;
                  bottom: -15px;
                  width: 100%;
                  justify-content: space-between;
                }
              `}
            >
              {' '}
              <SecondaryButton
                css={css`
                  width: 140px;

                  ${mediaQueryTablet} {
                    width: 120px;
                    margin-right: 0;
                  }

                  ${mediaQueryMobile} {
                    width: 45%;
                  }
                `}
              >
                <div>ลบ</div>
              </SecondaryButton>
              <Dropdown overlay={menu}>
                <PrimaryButton
                  css={css`
                    width: 140px;

                    ${mediaQueryTablet} {
                      width: 120px;
                    }

                    ${mediaQueryMobile} {
                      width: 45%;
                    }
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
