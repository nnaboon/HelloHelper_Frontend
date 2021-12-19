/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useLocation, useHistory } from 'react-router-dom';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import Flex from 'components/Flex/Flex';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';
import { UserSvg } from 'components/Svg/UserSvg';
import { Divider } from 'antd';
import { RankingBadge } from 'components/Badge/Badge';
import { SuggestedBadge } from 'components/Badge/Badge';
import { RANK_BADGE } from 'components/Badge/const';
import UserAvatar from 'images/avatar_helper.png';
import ProvideImage from 'images/request.jpeg';
import { useMedia, MOBILE_WIDTH, mediaQueryMobile } from 'styles/variables';
import { USER_DATA } from '../../data/user';
import { PROVIDE_MAPPER } from '../../data/provide';

const ProvideImageSection = styled.img`
  width: 420px;
  height: 510px;
  margin-bottom: 20px;

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
  color: #cacaca;
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
  const history = useHistory();
  const { pathname } = useLocation();
  const query = pathname.split('/')[2];
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

  return (
    <React.Fragment>
      {(data ?? PROVIDE_MAPPER)
        .filter(({ provideId }) => provideId === query)
        .map(
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
                ${mediaQueryMobile} {
                  height: calc(100vh - 170px);
                  overflow-y: scroll;
                }
              `}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: `${isMobile ? 'column' : 'row'}`
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
                        {items}
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
                    <ProvideDetail>{serviceCharge}</ProvideDetail>
                    <ProvideTitle>ช่องทางการชำระเงิน</ProvideTitle>
                    <ProvideDetail>{payment}</ProvideDetail>
                    <ProvideTitle>คำอธิบาย</ProvideTitle>
                    <ProvideDetail>{description}</ProvideDetail>
                  </ProvideInfoContainer>
                  <Flex>
                    <PrimaryButton
                      style={{ height: '45px' }}
                      css={css`
                        ${mediaQueryMobile} {
                          width: 100%;
                          position: fixed;
                          z-index: 99;
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

                      ${mediaQueryMobile} {
                        margin: 0 30px;
                      }
                    `}
                  >
                    <HelperImage src={UserAvatar} alt="user avatar" />
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
                          USER_DATA.filter(
                            (props) => props.userId === userId
                          )[0].rank
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

                {!isMobile && (
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
    </React.Fragment>
  );
};
