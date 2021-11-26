/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useLocation, useHistory } from 'react-router-dom';
import { Navbar } from 'components/Navbar/Navbar';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { Divider } from 'components/Divider/Divider';
import Flex from 'components/Flex/Flex';
import { Text } from 'components/Text';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';
import { HelperListCard } from 'components/Card/HelperListCard';
import { SmallSuggestRequestCard } from 'components/Card/SmallSuggestRequestCard';
import { SUGGESTED_REQUEST_DATA } from 'data/request';
import { USER_DATA } from 'data/user';

const RequestImage = styled.img`
  width: 420px;
  height: 510px;
  background: yellow;
  margin-bottom: 20px;
`;

const RequestCategoryButton = styled(PrimaryButton)`
  width: max-content;
  min-width: 140px;
  padding: 10px 15px;
  height: 40px;
  margin: 10px 8px 10px 0px;
`;

const RequestHashtagButton = styled(SecondaryButton)`
  width: max-content;
  min-width: 80px;
  padding: 10px 15px;
  height: 40px;
  margin: 10px 8px 10px 0px;
`;

const RequestInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 180px 400px;
  grid-gap: 40px;
  margin-bottom: 60px;
`;

const RequestDetail = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
  min-width: 200px;
`;

const RequestTitle = styled.div`
  font-size: 14px;
  line-height: 26px;
  color: #cacaca;
  min-width: 90px;
  max-width: 150px;
`;

export const ProvideInfoPage = () => {
  const history = useHistory();
  const location = useLocation();
  const query = location.pathname.split('/')[2];
  return (
    <React.Fragment>
      {SUGGESTED_REQUEST_DATA.filter(({ id }) => id === query).map(
        ({
          id,
          name,
          imageUrl,
          title,
          location,
          maxPrice,
          amount,
          message,
          maxServiceCharge,
          category,
          hashtag,
          payment,
          helper,
          rank
        }) => (
          <WrapperContainer key={id}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Flex
                direction="column"
                justify="flex-start"
                itemAlign="flex-start"
                style={{ width: 'unset', position: 'relative', left: '6%' }}
              >
                <RequestImage />
                <Flex
                  css={css`
                    width: 600px;
                    flex-wrap: wrap;
                  `}
                >
                  {category.map((items) => (
                    <RequestCategoryButton
                      onClick={() => {
                        history.push({
                          pathname: `/${items}`
                        });
                      }}
                    >
                      {items}
                    </RequestCategoryButton>
                  ))}
                </Flex>
                <Flex
                  css={css`
                    width: 600px;
                    flex-wrap: wrap;
                  `}
                >
                  {hashtag.map((items) => (
                    <RequestHashtagButton
                      onClick={() => {
                        history.push({
                          pathname: `/search`,
                          search: `?keyword=${items}`
                        });
                      }}
                    >
                      #{items}
                    </RequestHashtagButton>
                  ))}
                </Flex>
              </Flex>
              <Flex
                direction="column"
                marginTop="80px"
                style={{ width: 'unset' }}
              >
                <RequestInfoContainer>
                  <RequestTitle>ชื่อ</RequestTitle>
                  <RequestDetail>{title}</RequestDetail>
                  <RequestTitle>สถานที่ให้ความข่วยเหลือ</RequestTitle>
                  <RequestDetail>{location}</RequestDetail>
                  <RequestTitle>จำนวน</RequestTitle>
                  <RequestDetail>{amount}</RequestDetail>
                  <RequestTitle>จำกัดราคา</RequestTitle>
                  <RequestDetail>{maxServiceCharge}</RequestDetail>
                  <RequestTitle>ช่องทางการชำระเงิน</RequestTitle>
                  <RequestDetail>{payment}</RequestDetail>
                  <RequestTitle>คำอธิบาย</RequestTitle>
                  <RequestDetail>{message}</RequestDetail>
                </RequestInfoContainer>
                <PrimaryButton style={{ width: '100%' }}>
                  สนใจให้ความช่วยเหลือ
                </PrimaryButton>
              </Flex>
            </div>
            <Divider />
            <Text fontSize="24px" fontWeight={400}>
              รายชื่อผู้ต้องการช่วยเหลือ
            </Text>
            <Flex justify="flex-start" itemAlign="flex-start">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  width: '100%',
                  marginTop: '40px'
                }}
              >
                {helper.map(({ id, name, imageUrl }) => (
                  <HelperListCard id={id} name={name} imageUrl={imageUrl} />
                ))}
              </div>
              <Flex direction="column" itemAlign="flex-end">
                <SmallSuggestRequestCard />
                <SmallSuggestRequestCard />
              </Flex>
            </Flex>
          </WrapperContainer>
        )
      )}
    </React.Fragment>
  );
};
