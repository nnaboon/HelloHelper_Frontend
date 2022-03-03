/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { getAuth, deleteUser } from 'firebase/auth';
import { useHistory, useLocation } from 'react-router-dom';
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
  mediaQueryMiniDesktop,
  mediaQueryLargeDesktop,
  mediaQueryExtraLargeDesktop,
  mediaQueryTablet,
  useMedia,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  SMALL_TABLET_WIDTH,
  LARGE_DESKTOP_WIDTH,
  MINI_DESKTOP_WIDTH,
  mediaQueryDesktop
} from 'styles/variables';
import { MessageOutlined } from '@ant-design/icons';
import { SideMenu } from 'components/Menu/SideMenu';
import DefaultImage from 'images/default.png';
import { useUser } from 'hooks/user/useUser';
import firebase from '../../firebase';
import { userStore } from 'store/userStore';
import { useVerifyToken } from 'hooks/useVerifyToken';
import { logout } from 'features/logout/Logout';

const NavbarSection = styled.div`
  width: 100%;
  height: 210px;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  z-index: 99;

  ${mediaQueryLargeDesktop} {
    height: 165px;
  }

  ${mediaQueryTablet} {
    height: 80px;
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
    font-size: 14px;
    font-weight: 500;
  }

  ${mediaQueryLargeDesktop} {
    > li {
      font-size: 12px;
    }
  }

  ${mediaQueryMiniDesktop} {
    padding: 20px 60px;
    > li {
      font-size: 12px;
    }
  }

  ${mediaQueryTablet} {
    padding: 0;
    margin: 0;
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
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin-left: 25px;
  cursor: pointer;
  object-fit: cover;

  ${mediaQueryLargeDesktop} {
    width: 40px;
    height: 40px;
  }

  ${mediaQuerySmallTablet} {
    right: 15px;
    top: 0;
    z-index: 10;
  }

  ${mediaQueryMobile} {
    right: 15px;
  }
`;

const SearchBarContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  top: -40px;

  ${mediaQueryLargeDesktop} {
    top: -20px;
  }

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

  const { pathname, state } = useLocation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accountStep, setAccountStep] = useState<LoginStep>(LoginStep.LOGIN);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isMiniDesktop = useMedia(`(max-width: ${MINI_DESKTOP_WIDTH}px)`);
  const isLargeDesktop = useMedia(`(max-width: ${LARGE_DESKTOP_WIDTH}px)`);

  const { userId, setUserId, me, setMe, setLoginType } = userStore;
  const { data: response, execute: getUser } = useUser();
  const { data: auth, execute: getAuth } = useVerifyToken();

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

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setAccountStep(LoginStep.LOGIN);
      } else {
        setAccountStep(LoginStep.REGISTER);
      }
    });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user && window.localStorage.getItem('id')) {
        getAuth()
          .then(() => {
            setUserId(window.localStorage.getItem('id'));
            setUserImage(user.photoURL);
            getUser(user.uid);
            setIsModalVisible(false);
            setAccount(true);
          })
          .catch((error) => {
            if (error.response.data === 'Unauthorized') {
              logout();
            }
          });
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
    if (!window.localStorage.getItem('id')) {
      setIsModalVisible(true);
    }
  }, [pathname]);

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
      <Flex
        justify="space-between"
        css={css`
          margin: 20px 0;

          ${mediaQueryLargeDesktop} {
            margin-top: 0;
            margin-bottom: 20px;
          }

          ${mediaQueryTablet} {
            margin: 20px 0;
            padding: 0 60px;
          }

          ${mediaQueryMobile} {
            margin: 0;
            padding: 0;
          }
        `}
      >
        <div>
          {isTablet ? (
            <SideMenu collapsed={collapsed} setCollapsed={setCollapsed} />
          ) : (
            <div
              style={{
                marginLeft: '60px',
                display: 'flex',
                cursor: 'pointer'
              }}
              onClick={() => {
                history.push({
                  pathname: '/'
                });
              }}
              css={css`
                width: max-content;
              `}
            >
              <div
                style={{ color: 'black', fontWeight: 700 }}
                css={css`
                  font-size: 45px;

                  ${mediaQueryLargeDesktop} {
                    font-size: 32px;
                  }

                  ${mediaQueryMiniDesktop} {
                    font-size: 28px;
                  }
                `}
              >
                HELLO HELPER
              </div>{' '}
              <MessageOutlined />
            </div>
          )}
        </div>
        <div>
          {isTablet && (
            <Search
              placeholder="ข้าวผัดป้าเขียว, ก๋วยจั๊บนายวาย, แกงกะหรี่ป้าอร โชคชัย4"
              defaultValue={state?.search}
              onSearch={onSearch}
              size="large"
              css={css`
                min-width: 500px;

                ${mediaQuerySmallTablet} {
                  min-width: 360px;
                }

                ${mediaQueryMobile} {
                  min-width: 260px;
                }

                .ant-input-group-wrapper {
                  width: unset;
                }

                .ant-input {
                  height: 30px;
                  width: 100%;
                  font-size: 14px;
                  line-height: 8.8;
                }

                .ant-btn-icon-only.ant-btn-lg {
                  height: 30px;
                  width: 30px;
                }
              `}
            />
          )}
        </div>
        <div>
          {' '}
          <NavbarList>
            {!isTablet && (
              <React.Fragment>
                {' '}
                <li
                  onClick={() => {
                    history.push({
                      pathname: response?.communityId?.includes(
                        window.localStorage.getItem('selectedCommunity')
                      )
                        ? `/community/${window.localStorage.getItem(
                            'selectedCommunity'
                          )}`
                        : response?.communityId?.length > 0
                        ? `/community/${response.communityId[0]}`
                        : `/community`
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
                      right: 15px;
                      z-index: 10;
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
                    padding-top: 15px;
                  }
                `}
              >
                ลงทะเบียน/เข้าสู่ระบบ
              </li>
            )}
          </NavbarList>{' '}
        </div>
      </Flex>
      {!isTablet && (
        <SearchBarContainer>
          <Search
            placeholder="ข้าวผัดป้าเขียว, ก๋วยจั๊บนายวาย, แกงกะหรี่ป้าอร โชคชัย4"
            defaultValue={state?.search}
            onSearch={onSearch}
            size="large"
            style={{
              width: isMobile
                ? '350px'
                : isTablet
                ? '600px'
                : isMiniDesktop
                ? '500px'
                : '700px',
              height: '40px'
            }}
            css={css`
              position: relative;

              .ant-input {
                height: 40px;
                width: 700px;
                font-size: 16px;
                line-height: 6.8713;
              }

              .ant-btn-icon-only.ant-btn-lg {
                height: 40px;
                width: 40px;
              }

              ${mediaQueryExtraLargeDesktop} {
                .ant-input {
                  height: 35px;
                  width: 100%;
                  font-size: 14px;
                }

                .ant-btn-icon-only.ant-btn-lg {
                  height: 35px;
                  width: 35px;
                }
              }
            `}
          />
        </SearchBarContainer>
      )}
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
        centered
        css={css`
          width: 500px !important;

          .ant-modal-content {
            min-height: 620px;
            height: max-content;
          }

          ${mediaQueryLargeDesktop} {
            width: 430px !important;

            .ant-modal-content {
              min-height: 620px;
              height: max-content;
            }
          }

          ${mediaQueryTablet} {
            width: 500px !important;

            .ant-modal-content {
              min-height: 620px;
              height: 620px;
            }
          }

          ${mediaQueryMobile} {
            width: 320px !important;

            .ant-modal-content {
              min-height: 550px;
              height: 550px;
            }
          }

          .ant-modal-body {
            width: 100%;
            height: 100%;
            position: absolute;
          }
        `}
      >
        <div style={{ height: '100%' }}>
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
