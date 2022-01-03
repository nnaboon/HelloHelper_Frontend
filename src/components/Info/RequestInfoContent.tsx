/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useLocation, useHistory } from 'react-router-dom';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { Divider } from 'antd';
import Flex from 'components/Flex/Flex';
import { Text } from 'components/Text';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';
import { HelperListCard } from 'components/Card/HelperListCard';
import { SmallSuggestedRequestCard } from 'components/Card/SmallSuggestedRequestCard';
import { InfoMenu } from 'components/Menu/const';
import UserAvatar from 'images/avatar_helper.png';
import {
  useMedia,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryTablet
} from 'styles/variables';
import { InfoMenuTab } from 'components/Menu/InfoMenuTab';
import { RANK_BADGE } from 'components/Badge/const';
import { RankingBadge } from 'components/Badge/Badge';
import { SuggestedBadge } from 'components/Badge/Badge';
import { USER_DATA } from '../../data/user';
import { PROVIDE_MAPPER } from 'data/provide';

const RequestImageSection = styled.img`
  width: 420px;
  height: 510px;
  margin-bottom: 20px;

  ${mediaQueryTablet} {
    width: 100%;
    justify-self: center;
    align-self: center;
  }

  ${mediaQueryMobile} {
    height: 300px;
    justify-self: center;
    align-self: center;
  }
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

  ${mediaQueryMobile} {
    grid-template-columns: auto auto;
    grid-gap: 12px;
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

const RequestDetail = styled.div`
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

const RequestTitle = styled.div`
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

export const RequestInfoContent = ({ data }: any) => {
  const [menu, setMenu] = useState<InfoMenu>(InfoMenu.INFO);
  const history = useHistory();
  const { pathname, state } = useLocation();
  const query = pathname.split('/')[2];
  const currentMenu = ((state as any)?.info_menu || InfoMenu.INFO) as InfoMenu;
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);

  useEffect(() => {
    setMenu(currentMenu);
  }, [currentMenu]);

  return (
    // <WrapperContainer>
    //   {isMobile && <InfoMenuTab menu={menu} setMenu={setMenu} />}
    //   {menu === InfoMenu.INFO ? <div>d</div> : <div>ddd</div>}
    // </WrapperContainer>
    <React.Fragment>
      {data
        .filter(({ requestId }) => requestId === query)
        .map(
          ({
            requestId,
            userId,
            imageUrl,
            title,
            location,
            maxPrice,
            description,
            maxServiceCharge,
            category,
            hashtag,
            amount,
            payment,
            provideUserId
          }) => (
            <WrapperContainer
              key={requestId}
              css={css`
                overflow-y: scroll;
                overflow-x: hidden;

                ${mediaQueryTablet} {
                  height: calc(100vh - 140px);
                }

                ${mediaQueryMobile} {
                  height: calc(100vh - 190px);
                }
              `}
            >
              {isTablet && <InfoMenuTab menu={menu} setMenu={setMenu} />}
              {(!isTablet || menu === InfoMenu.INFO) && (
                <React.Fragment>
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
                      <RequestImageSection
                        src={imageUrl}
                        alt="request section"
                      />

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
                      marginTop="30px"
                      style={{ width: 'unset' }}
                      itemAlign={isTablet ? 'flex-start' : 'center'}
                    >
                      <RequestInfoContainer>
                        <RequestTitle>ชื่อ</RequestTitle>
                        <RequestDetail>{title}</RequestDetail>
                        <RequestTitle>สถานที่ให้ความข่วยเหลือ</RequestTitle>
                        <RequestDetail>{location.name}</RequestDetail>
                        <React.Fragment>
                          <RequestTitle>จำนวน</RequestTitle>
                          <RequestDetail>{amount}</RequestDetail>
                          <RequestTitle>ราคาสินค้าสูงสุด</RequestTitle>
                          <RequestDetail>{maxPrice}</RequestDetail>
                        </React.Fragment>
                        <RequestTitle>อัตราค่าบริการสูงสุด</RequestTitle>
                        <RequestDetail>{maxServiceCharge}</RequestDetail>
                        <RequestTitle>ช่องทางการชำระเงิน</RequestTitle>
                        <RequestDetail>{payment}</RequestDetail>
                        <RequestTitle>คำอธิบาย</RequestTitle>
                        <RequestDetail>{description}</RequestDetail>
                      </RequestInfoContainer>
                      <PrimaryButton
                        css={css`
                          ${mediaQueryTablet} {
                            width: 100%;
                            max-width: 100%;
                          }

                          ${mediaQueryMobile} {
                            width: 100%;
                            position: fixed;
                            z-index: 4;
                            bottom: 0;
                            left: 0;
                            border-radius: 0 !important;
                            height: 40px;
                          }
                        `}
                      >
                        สนใจให้ความช่วยเหลือ
                      </PrimaryButton>
                    </Flex>
                  </div>
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
                      margin: 40px 0;

                      ${mediaQueryMobile} {
                        height: 90px;
                        margin: 0;
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

                          ${mediaQueryTablet} {
                            margin-left: 45px;
                          }

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
                            USER_DATA.filter(
                              (props) => props.userId === userId
                            )[0].username
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
                  </div>
                </React.Fragment>
              )}
              {(!isTablet || menu === InfoMenu.HELPER_LIST) && (
                <React.Fragment>
                  <Text fontSize="26px" fontWeight={400}>
                    รายชื่อผู้ต้องการช่วยเหลือ
                  </Text>
                  <Flex
                    justify="flex-start"
                    itemAlign="flex-start"
                    css={css`
                      ${mediaQueryTablet} {
                        flex-direction: column;
                      }
                    `}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        width: '100%',
                        marginTop: isTablet ? '20px' : '40px'
                      }}
                    >
                      {provideUserId.map((id) => (
                        <HelperListCard
                          id={id}
                          name={
                            USER_DATA.filter((props) => props.userId === id)[0]
                              .username
                          }
                          imageUrl={UserAvatar}
                        />
                      ))}
                    </div>
                    {isTablet && (
                      <Divider
                        style={{
                          borderTopColor: '#C4C4C4',
                          color: '#7C7A7A',
                          fontSize: '18px',
                          fontWeight: 500
                        }}
                      >
                        คุณอาจจะสนใจสิ่งนี้
                      </Divider>
                    )}
                    <Flex
                      direction="column"
                      itemAlign={isTablet ? 'center' : 'flex-end'}
                    >
                      <SmallSuggestedRequestCard data={[PROVIDE_MAPPER[1]]} />
                      <SmallSuggestedRequestCard data={[PROVIDE_MAPPER[2]]} />
                      <SmallSuggestedRequestCard data={[PROVIDE_MAPPER[0]]} />
                      <SmallSuggestedRequestCard data={[PROVIDE_MAPPER[1]]} />
                    </Flex>
                  </Flex>
                </React.Fragment>
              )}
            </WrapperContainer>
          )
        )}
    </React.Fragment>
  );
};
