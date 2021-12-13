/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useLocation, useHistory } from 'react-router-dom';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import Flex from 'components/Flex/Flex';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';
import { HelpMenu } from 'components/Menu/const';
import { UserSvg } from 'components/Svg/UserSvg';
import { Divider } from 'antd';
import { RankingBadge } from 'components/Badge/Badge';
import { SuggestedBadge } from 'components/Badge/Badge';
import { RANK_BADGE } from 'components/Badge/const';
import UserAvatar from 'images/avatar_helper.png';
import ProvideImage from 'images/request.jpeg';

const ProvideImageSection = styled.img`
  width: 420px;
  height: 510px;
  margin-bottom: 20px;
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
`;

const ProvideDetail = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
  min-width: 200px;
  line-height: 31px;
`;

const ProvideTitle = styled.div`
  font-size: 14px;
  line-height: 26px;
  color: #cacaca;
  min-width: 90px;
  max-width: 150px;
`;

const HelperImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 15px;
`;

const UserName = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  margin-bottom: 5px;
  margin-right: 30px;
  min-width: 140px;
  width: max-content;
`;

export const ProvideInfoContent = ({ data }: any) => {
  const history = useHistory();
  const { pathname, state } = useLocation();
  const query = pathname.split('/')[2];
  const currentMenu = ((state as any)?.type || HelpMenu.PROVIDE) as HelpMenu;

  return (
    <React.Fragment>
      {data
        .filter(({ id }) => id === query)
        .map(
          ({
            id,
            name,
            imageUrl,
            title,
            location,
            message,
            helpSum,
            serviceCharge,
            category,
            hashtag,
            payment,
            rating
          }) => (
            <WrapperContainer key={id}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                    <ProvideTitle>สถานที่ให้ความข่วยเหลือ</ProvideTitle>
                    <ProvideDetail>{location}</ProvideDetail>
                    <ProvideTitle>ยอดการช่วยเหลือ</ProvideTitle>
                    <ProvideDetail>{helpSum}</ProvideDetail>
                    <ProvideTitle>อัตราค่าบริการ</ProvideTitle>
                    <ProvideDetail>{serviceCharge}</ProvideDetail>
                    <ProvideTitle>ช่องทางการชำระเงิน</ProvideTitle>
                    <ProvideDetail>{payment}</ProvideDetail>
                    <ProvideTitle>คำอธิบาย</ProvideTitle>
                    <ProvideDetail>{message}</ProvideDetail>
                  </ProvideInfoContainer>
                  <Flex>
                    {/* <SecondaryButton style={{ width: '55%', height: '45px' }}>
                      <UserSvg />
                      <div
                        onClick={() => {
                          history.push({
                            pathname: `/profile/${id}`
                          });
                        }}
                      >
                        โปรไฟล์
                      </div>
                    </SecondaryButton> */}
                    <PrimaryButton style={{ height: '45px' }}>
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
                    `}
                  >
                    <HelperImage src={UserAvatar} alt="user avatar" />
                    {Boolean(1) && <SuggestedBadge>แนะนำ</SuggestedBadge>}
                  </div>
                  <div
                    css={css`
                      display: flex;
                      align-items: center;
                    `}
                  >
                    <UserName>{name}</UserName>
                    <RankingBadge
                      rankColor={RANK_BADGE['platinum'].color}
                      css={css`
                        margin-top: -10px;
                      `}
                    >
                      {'platinum'.toUpperCase()}
                    </RankingBadge>
                  </div>
                </div>

                <SecondaryButton
                  css={css`
                    margin-right: 100px;
                    width: 140px;
                  `}
                >
                  <UserSvg />
                  <div
                    onClick={() => {
                      history.push({
                        pathname: `/profile/${id}`
                      });
                    }}
                  >
                    โปรไฟล์
                  </div>
                </SecondaryButton>
              </div>
            </WrapperContainer>
          )
        )}
    </React.Fragment>
  );
};
