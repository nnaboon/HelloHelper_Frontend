/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { getAuth, deleteUser } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { Input, Modal, Skeleton } from 'antd';
import { observer } from 'mobx-react-lite';
import Flex from 'components/Flex/Flex';
import { RegisterForm } from 'features/login/RegisterForm';
import { LoginForm } from 'features/login/LoginForm';
import { LoginStep } from 'features/login/const';
import {
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryLargeDesktop,
  mediaQueryTablet,
  useMedia,
  MOBILE_WIDTH,
  SMALL_TABLET_WIDTH,
  LARGE_DESKTOP_WIDTH
} from 'styles/variables';
import { MessageOutlined } from '@ant-design/icons';
import { SideMenu } from 'components/Menu/SideMenu';
import DefaultImage from 'images/default.png';
import { useUser } from 'hooks/user/useUser';
import firebase from '../../firebase';
import { userStore } from 'store/userStore';
import { mediaQueryExtraLargeDesktop } from '../../styles/variables';

const NavbarSection = styled.div`
  width: 100%;
  height: 165px;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  z-index: 99;

  ${mediaQuerySmallTablet} {
    height: 130px;
  }

  ${mediaQueryMobile} {
    height: 65px;
  }
`;

const NavbarList = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: end;
  box-sizing: border-box;
  padding: 20px 100px;

  > li {
    display: inline;
    margin: 0 20px;
    cursor: pointer;
    color: #eeeee;
    font-size: 1.8rem;
  }

  ${mediaQueryLargeDesktop} {
    > li {
      font-size: 14px;
    }
  }

  ${mediaQueryTablet} {
    > li {
      margin: 0;
    }
  }

  ${mediaQueryMobile} {
    padding: 15px;

    > li {
      margin: 0;
    }
  }
`;

const MyAccount = styled.img`
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-left: 25px;
  cursor: pointer;
  object-fit: cover;

  ${mediaQueryLargeDesktop} {
    width: 40px;
    height: 40px;
  }

  ${mediaQuerySmallTablet} {
    position: absolute;
    right: 15px;
    top: 22px;
    z-index: 10;
  }

  ${mediaQueryMobile} {
    top: 12px;
  }
`;

const SearchBarContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;

  ${mediaQuerySmallTablet} {
    top: 15px;
  }

  ${mediaQueryMobile} {
    top: 40px;
  }
`;

export const Navbar = observer(() => {
  // Change to check from key in local storage.
  const [account, setAccount] = useState<boolean>(false);
  const [userImage, setUserImage] = useState<any>('');
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accountStep, setAccountStep] = useState<LoginStep>(LoginStep.LOGIN);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isLargeDesktop = useMedia(`(max-width: ${LARGE_DESKTOP_WIDTH}px)`);

  const { userId, setUserId, me, setMe, setLoginType } = userStore;
  const { data: response, execute: getUser } = useUser();

  const history = useHistory();
  const { Search } = Input;

  const onSearch = (value) => {
    setCollapsed(true);
    history.push({
      pathname: '/search',
      search: `?keyword=${value}`,
      state: {
        search: value
      }
    });
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);

    // const auth = getAuth();
    // const user = auth.currentUser;

    // deleteUser(user)
    //   .then(() => {
    //     window.localStorage.removeItem('id');
    //     window.localStorage.removeItem('loginType');
    //     window.localStorage.removeItem('access_token');
    //   })
    //   .catch((error) => {
    //     auth.signOut();
    //   });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user && window.localStorage.getItem('id')) {
        setUserId(window.localStorage.getItem('id'));
        setUserImage(user.photoURL);
        getUser(user.uid);
        setIsModalVisible(false);
        setAccount(true);
      } else if (user) {
        setIsModalVisible(true);
        getUser(user.uid);
        setLoginType(user.providerData[0].providerId);
        setAccount(true);
      } else {
        setIsModalVisible(true);
        setAccount(false);
        setAccountStep(LoginStep.LOGIN);
      }
    });
  }, []);

  useEffect(() => {
    console.log(response);
    if (response) {
      if (Object.keys(response).length !== 0) {
        setMe(response);
        setUserId(response?.userId);
        setIsModalVisible(false);

        if (!window.localStorage.getItem('selectedCommunity')) {
          window.localStorage.setItem(
            'selectedCommunity',
            response.communityId
          );
        }
      } else {
        setAccountStep(LoginStep.REGISTER);
        setIsModalVisible(true);
      }
    } else if (response !== undefined) {
      setAccountStep(LoginStep.REGISTER);
    }
  }, [response]);

  return (
    <NavbarSection>
      {' '}
      <Global
        styles={css`
          .ant-modal-content {
            border-radius: 12px;
            height: 614px;
          }
        `}
      />
      <Flex justify="space-between">
        {isSmallTablet ? (
          <SideMenu collapsed={collapsed} setCollapsed={setCollapsed} />
        ) : (
          <div
            style={{
              width: '400px',
              marginLeft: '60px',
              display: 'flex',
              cursor: 'pointer'
            }}
            onClick={() => {
              history.push({
                pathname: '/'
              });
            }}
          >
            <div
              style={{ color: 'black', fontWeight: 700 }}
              css={css`
                font-size: 45px;
                ${mediaQueryLargeDesktop} {
                  font-size: 32px;
                }
              `}
            >
              HELLO HELPER
            </div>{' '}
            <MessageOutlined />
          </div>
        )}

        <NavbarList>
          {!isSmallTablet && (
            <React.Fragment>
              {' '}
              <li
                onClick={() => {
                  history.push({
                    pathname: `/community/${
                      response.communityId.includes(
                        window.localStorage.getItem('selectedCommunity')
                      )
                        ? window.localStorage.getItem('selectedCommunity')
                        : response.communityId[0]
                    }`
                  });
                }}
              >
                ชุมชนความช่วยเหลือ
              </li>
              <li
                onClick={() => {
                  history.push({
                    pathname: '/order/provide'
                  });
                }}
              >
                รายการให้ความช่วยเหลือของฉัน
              </li>
              <li
                onClick={() => {
                  history.push({
                    pathname: '/order/request'
                  });
                }}
              >
                รายการขอความช่วยเหลือของฉัน
              </li>
              <li
                onClick={() => {
                  history.push({
                    pathname: '/chat'
                  });
                }}
              >
                กล่องข้อความ
              </li>
            </React.Fragment>
          )}

          {window.localStorage.getItem('id') ? (
            me ? (
              <React.Fragment>
                <MyAccount
                  src={me ? me.imageUrl : DefaultImage}
                  alt="my account"
                  onClick={() => {
                    setCollapsed(true);
                    if (account) {
                      history.push({
                        pathname: '/profile'
                      });
                    } else {
                      setIsModalVisible(true);
                    }
                  }}
                />{' '}
              </React.Fragment>
            ) : (
              <Skeleton.Avatar
                size="large"
                shape="circle"
                css={css`
                  position: relative;
                  right: 15px;
                  margin-left: 15px;

                  ${mediaQuerySmallTablet} {
                    position: absolute;
                    right: 15px;
                    top: 22px;
                    z-index: 10;
                  }

                  ${mediaQueryMobile} {
                    top: 12px;
                  }
                `}
              />
            )
          ) : (
            <li
              onClick={() => {
                setIsModalVisible(true);
              }}
              css={css`
                position: relative;

                ${mediaQuerySmallTablet} {
                  position: absolute;
                  right: 15px;
                  top: 22px;
                  z-index: 10;
                }

                ${mediaQueryMobile} {
                  top: 12px;
                }
              `}
            >
              ลงทะเบียน/เข้าสู่ระบบ
            </li>
          )}
        </NavbarList>
      </Flex>
      <SearchBarContainer>
        <Search
          placeholder="ข้าวผัดป้าเขียว, ก๋วยจั๊บนายวาย, แกงกะหรี่ป้าอร โชคชัย4"
          onSearch={onSearch}
          size="large"
          style={{
            width: isMobile ? '350px' : isSmallTablet ? '600px' : '700px',
            height: '40px'
          }}
          css={css`
            .ant-input {
              height: 60px;
              width: 990px;
              font-size: 1.6rem;
            }

            .ant-btn-icon-only.ant-btn-lg {
              height: 60px;
              width: 60px;
            }

            ${mediaQueryExtraLargeDesktop} {
              .ant-input {
                height: 40px;
                width: 100%;
                font-size: 16px;
              }

              .ant-btn-icon-only.ant-btn-lg {
                height: 40px;
                width: 40px;
              }
            }
          `}
        />
      </SearchBarContainer>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={isMobile ? '85%' : isLargeDesktop ? 500 : '22%'}
        maskClosable={false}
        centered
        css={css`
          .ant-modal-content {
            min-height: 820px;
            height: max-content;

            ${mediaQueryLargeDesktop} {
              min-height: 694px;
              height: max-content;
            }

            ${mediaQueryMobile} {
              min-height: 400px;
              height: 400px;
              overflow-y: scroll;
            }
          }
        `}
      >
        <div>
          {accountStep === LoginStep.LOGIN ? (
            <LoginForm
              setStep={setAccountStep}
              setIsModalVisible={setIsModalVisible}
            />
          ) : (
            <RegisterForm
              setProcessStep={setAccountStep}
              setIsModalVisible={setIsModalVisible}
            />
          )}
        </div>
      </Modal>
    </NavbarSection>
  );
});
