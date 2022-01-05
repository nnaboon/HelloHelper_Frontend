/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useLocation, useHistory } from 'react-router-dom';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import Flex from 'components/Flex/Flex';
import { CATEGORY } from 'data/category';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';
import { UserSvg } from 'components/Svg/UserSvg';
import { Divider, Dropdown, Menu } from 'antd';
import { RankingBadge } from 'components/Badge/Badge';
import { SuggestedBadge } from 'components/Badge/Badge';
import { RANK_BADGE } from 'components/Badge/const';
import UserAvatar from 'images/avatar_helper.png';
import ProvideImage from 'images/request.jpeg';
import MyAccountAvatar from 'images/avatar_user2.png';

import { RequestFormModal } from 'components/Form/RequestForm';
import {
  useMedia,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryTablet
} from 'styles/variables';
import { MoreOutlined } from '@ant-design/icons';

import { myAccountUserId, USER_DATA } from 'data/user';
import { PROVIDE_MAPPER } from 'data/provide';
import { EditSvg } from 'components/Svg/EditSvg';
import { DeleteSvg } from 'components/Svg/DeleteSvg';
import { EyeOffSvg } from 'components/Svg/EyeOffSvg';

const ProvideImageSection = styled.img`
  width: 420px;
  height: 510px;
  margin-bottom: 20px;

  ${mediaQueryTablet} {
    width: 100%;
    justify-self: center;
    align-self: center;
  }

  ${mediaQuerySmallTablet} {
    justify-self: flex-start;
    align-self: flex-start;
  }

  ${mediaQueryMobile} {
    width: 100%;
    height: 300px;
  }
`;

const ProvideCategoryButton = styled(PrimaryButton)`
  width: max-content;
  min-width: 140px;
  padding: 10px 15px;
  height: 40px;
  margin: 10px 8px 10px 0px;
`;

const ProvideHashtagButton = styled(SecondaryButton)`
  width: max-content;
  min-width: 80px;
  padding: 10px 15px;
  height: 40px;
  margin: 10px 8px 10px 0px;
`;

const ProvideInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 180px 400px;
  grid-gap: 40px;
  margin-bottom: 60px;

  ${mediaQuerySmallTablet} {
    grid-template-columns: 144px 400px;
  }

  ${mediaQueryMobile} {
    grid-template-columns: auto auto;
    grid-gap: 12px;
  }
`;

const ProvideDetail = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
  min-width: 200px;
  line-height: 31px;

  ${mediaQueryMobile} {
    font-size: 16px;
  }
`;

const ProvideTitle = styled.div`
  font-size: 14px;
  line-height: 26px;
  color: #848484;
  min-width: 90px;
  max-width: 150px;

  ${mediaQueryMobile} {
    min-width: unset;
    max-width: unset;
  }
`;

const HelperImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 15px;

  ${mediaQueryMobile} {
    width: 65px;
    height: 65px;
  }
`;

const UserName = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  margin-bottom: 5px;
  margin-right: 30px;
  min-width: 140px;
  width: max-content;

  ${mediaQueryMobile} {
    min-width: max-content;
    font-size: 16px;
    margin-right: 0;
  }
`;

export const ProvideInfoContent = ({ data }: any) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const history = useHistory();
  const { pathname } = useLocation();
  const query = pathname.split('/')[3];
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);

  const dropDownMenu = (
    <Menu
      // onClick={handleMenuClick}
      css={css`
        z-index: 99;
      `}
    >
      <Menu.Item key="1">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          css={css`
            z-index: 99;
          `}
          onClick={() => {
            setIsModalVisible(true);
          }}
        >
          <EditSvg style={{ marginRight: '8px' }} />

          <div>แก้ไข</div>
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <EyeOffSvg style={{ marginRight: '18px' }} />
          <div>ซ่อน</div>
        </div>
      </Menu.Item>
      <Menu.Item key="3">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <DeleteSvg style={{ marginRight: '18px' }} />
          <div>ลบ</div>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <React.Fragment>
      {PROVIDE_MAPPER.filter(({ provideId }) => provideId === query).map(
        ({
          provideId,
          userId,
          imageUrl,
          title,
          location,
          description,
          provideSum,
          serviceCharge,
          category,
          hashtag,
          payment
        }) => (
          <WrapperContainer
            key={provideId}
            css={css`
              overflow-y: scroll;

              ${mediaQueryTablet} {
                height: calc(100vh - 200px);
              }

              ${mediaQueryMobile} {
                height: calc(100vh - 190px);
              }
            `}
          >
            {userId === myAccountUserId && (
              <Dropdown.Button
                // onClick={handleButtonClick}
                icon={<MoreOutlined />}
                overlay={dropDownMenu}
                css={css`
                  position: absolute;
                  z-index: 8;
                  top: 40px;
                  color: #0000;
                  right: 25px;

                  .ant-dropdown-trigger {
                    border: none;
                    z-index: 8;
                  }

                  .ant-dropdown-menu {
                    z-index: 8;
                  }

                  .ant-dropdown .ant-dropdown-placement-bottomRight {
                    z-index: 8;
                    top: 570px;
                  }

                  .ant-dropdown-trigger > span {
                    background-color: white !important;
                    z-index: 8;
                  }

                  .ant-dropdown-menu-item,
                  .ant-dropdown-menu-submenu-title {
                    z-index: 8;
                  }

                  &:selection {
                    color: #fff;
                    z-index: 8;
                    background: transparent;
                  }

                  svg {
                    font-size: 24px;
                  }

                  ${mediaQueryMobile} {
                    right: 8px;
                    top: 10px;
                  }
                `}
              />
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: `${isTablet ? 'column' : 'row'}`
              }}
            >
              <Flex
                direction="column"
                justify="flex-start"
                itemAlign="flex-start"
                style={{ width: 'unset', position: 'relative' }}
              >
                <ProvideImageSection src={ProvideImage} alt="provide img" />
                <Flex
                  css={css`
                    width: 600px;
                    flex-wrap: wrap;

                    ${mediaQueryMobile} {
                      width: 100%;
                    }
                  `}
                >
                  {category.map((items) => (
                    <ProvideCategoryButton
                      onClick={() => {
                        history.push({
                          pathname: `/${items}`
                        });
                      }}
                    >
                      {CATEGORY.filter(({ id }) => id === items)[0].name}
                    </ProvideCategoryButton>
                  ))}
                </Flex>
                <Flex
                  css={css`
                    width: 600px;
                    flex-wrap: wrap;

                    ${mediaQueryMobile} {
                      width: 100%;
                    }
                  `}
                >
                  {hashtag.map((items) => (
                    <ProvideHashtagButton
                      onClick={() => {
                        history.push({
                          pathname: `/search`,
                          search: `?keyword=${items}`
                        });
                      }}
                    >
                      #{items}
                    </ProvideHashtagButton>
                  ))}
                </Flex>
              </Flex>
              <Flex
                direction="column"
                marginTop="30px"
                style={{ width: 'unset' }}
                itemAlign={isTablet ? 'flex-start' : 'center'}
              >
                <ProvideInfoContainer>
                  <ProvideTitle>ชื่อ</ProvideTitle>
                  <ProvideDetail>{title}</ProvideDetail>
                  <ProvideTitle>
                    {isMobile ? 'สถานที่' : 'สถานที่ให้ความข่วยเหลือ'}
                  </ProvideTitle>
                  <ProvideDetail>{location.name}</ProvideDetail>
                  <ProvideTitle>ยอดการช่วยเหลือ</ProvideTitle>
                  <ProvideDetail>{provideSum} ครั้ง</ProvideDetail>
                  <ProvideTitle>อัตราค่าบริการ</ProvideTitle>
                  <ProvideDetail>{serviceCharge} บาท</ProvideDetail>
                  <ProvideTitle>ช่องทางการชำระเงิน</ProvideTitle>
                  <ProvideDetail>{payment}</ProvideDetail>
                  <ProvideTitle>คำอธิบาย</ProvideTitle>
                  <ProvideDetail>{description}</ProvideDetail>
                </ProvideInfoContainer>
                <Flex>
                  <PrimaryButton
                    style={{ height: '45px' }}
                    css={css`
                      ${mediaQueryTablet} {
                        width: 100%;
                        max-width: 100%;
                      }
                      ${mediaQueryMobile} {
                        position: fixed;
                        z-index: 4;
                        bottom: 0;
                        left: 0;
                        border-radius: 0 !important;
                      }
                    `}
                  >
                    ขอความช่วยเหลือ
                  </PrimaryButton>
                </Flex>
              </Flex>
            </div>
            <Divider />
            <div
              css={css`
                width: 100%;
                height: 140px;
                display: flex;
                align-items: center;
                background: #ffffff;
                box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.09);
                border-radius: 12px;
                justify-content: space-between;

                ${mediaQueryMobile} {
                  height: 90px;
                }
              `}
            >
              <div style={{ display: 'flex' }}>
                <div
                  css={css`
                    display: flex;
                    width: 20%;
                    flex-direction: column;
                    align-items: center;
                    margin-left: 170px;
                    margin-right: 60px;

                    ${mediaQuerySmallTablet} {
                      margin-left: 45px;
                    }

                    ${mediaQueryMobile} {
                      margin: 0 30px;
                    }
                  `}
                >
                  <HelperImage
                    src={
                      userId === myAccountUserId ? MyAccountAvatar : UserAvatar
                    }
                    alt="user avatar"
                  />
                  {Boolean(1) && (
                    <SuggestedBadge
                      css={css`
                        ${mediaQueryMobile} {
                          left: 0;
                        }
                      `}
                    >
                      แนะนำ
                    </SuggestedBadge>
                  )}
                </div>
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                  `}
                >
                  <UserName>
                    {
                      USER_DATA.filter((props) => props.userId === userId)[0]
                        .username
                    }
                  </UserName>
                  <RankingBadge
                    rankColor={
                      RANK_BADGE[
                        USER_DATA.filter((props) => props.userId === userId)[0]
                          .rank
                      ].color
                    }
                    css={css`
                      margin-top: -10px;
                    `}
                  >
                    {USER_DATA.filter(
                      (props) => props.userId === userId
                    )[0].rank.toUpperCase()}
                  </RankingBadge>
                </div>
              </div>

              {!isTablet && (
                <SecondaryButton
                  css={css`
                    margin-right: 100px;
                    width: 140px;
                    z-index: 5;
                  `}
                  onClick={() => {
                    history.push({
                      pathname: `/profile/${userId}`
                    });
                  }}
                >
                  <UserSvg />
                  <div>โปรไฟล์</div>
                </SecondaryButton>
              )}
            </div>
          </WrapperContainer>
        )
      )}
      <RequestFormModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        requestData={{
          ...PROVIDE_MAPPER.filter(({ provideId }) => provideId === query)[0],
          type: 'provide'
        }}
      />
    </React.Fragment>
  );
};
