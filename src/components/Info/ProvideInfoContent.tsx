/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useLocation, useHistory } from 'react-router-dom';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import Flex from 'components/Flex/Flex';
import { Text } from 'components/Text';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';
import { HelpMenu } from 'components/Menu/const';
import { UserSvg } from 'components/Svg/UserSvg';

const ProvideImage = styled.img`
  width: 420px;
  height: 510px;
  background: yellow;
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
            payment
          }) => (
            <WrapperContainer key={id}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Flex
                  direction="column"
                  justify="flex-start"
                  itemAlign="flex-start"
                  style={{ width: 'unset', position: 'relative', left: '6%' }}
                >
                  <ProvideImage />
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
                  marginTop="80px"
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
                    <SecondaryButton style={{ width: '35%', height: '45px' }}>
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
                    <PrimaryButton style={{ width: '35%', height: '45px' }}>
                      สนใจขอความช่วยเหลือ
                    </PrimaryButton>
                  </Flex>
                </Flex>
              </div>
            </WrapperContainer>
          )
        )}
    </React.Fragment>
  );
};
