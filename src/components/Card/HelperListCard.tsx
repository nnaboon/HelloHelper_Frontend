/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { Modal, message } from 'antd';
import { PrimaryButton, SecondaryButton } from '../Button/Button';
import { CheckOutlined } from '@ant-design/icons';
import { UserSvg } from 'components/Svg/UserSvg';
import {
  useMedia,
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQueryLargeDesktop,
  MOBILE_WIDTH,
  LARGE_DESKTOP_WIDTH
} from 'styles/variables';
import { useHistory, useLocation } from 'react-router-dom';
import { useAddChatRoom } from 'hooks/chat/useAddChatRoom';
import { useAddProvidedUser } from 'hooks/request/useProvidedUserId';

interface HelperListCardProps {
  id: string;
  name: string;
  imageUrl?: string;
  request: any;
}

const HelperListCardContainer = styled.div`
  width: 900px;
  min-width: 730px;
  height: 100px;
  background: #ffffff;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.09);
  border-radius: 12px;
  box-sizing: border-box;
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;

  &:hover {
    box-shadow: 0px 9px 16px rgba(255, 135, 48, 0.2);
  }

  ${mediaQueryTablet} {
    width: 100%;
    height: 130px;
    min-width: 100%;
    align-items: center;
    margin-bottom: 15px;
  }

  ${mediaQueryMobile} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const HelperImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;

  ${mediaQueryMobile} {
    width: 55px;
    height: 55px;
  }
`;

const HelperName = styled.div`
  font-size: 22px;
  color: #000000;
  margin-left: 50px;

  ${mediaQueryMobile} {
    font-size: 18px;
    margin-left: 20px;
    font-weight: 600;
  }
`;

export const HelperListCard = ({
  id,
  name,
  imageUrl,
  request
}: HelperListCardProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const history = useHistory();
  const { pathname } = useLocation();
  const query = pathname.split('/')[3];
  const { execute: addChatRoom } = useAddChatRoom();
  const { data: providedUser, execute: addProvidedUser } = useAddProvidedUser();

  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isLargeDesktop = useMedia(`(max-width: ${LARGE_DESKTOP_WIDTH}px)`);

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(true);
  };

  return (
    <HelperListCardContainer>
      <div
        css={css`
          display: flex;
          align-items: center;

          ${mediaQueryMobile} {
            width: 100%;
          }
        `}
      >
        <HelperImage src={imageUrl} alt="user avatar" />
        <HelperName>{name}</HelperName>
      </div>

      <div
        css={css`
          display: flex;

          ${mediaQueryMobile} {
            position: relative;
            bottom: -12px;
            width: 100%;
            justify-content: space-between;
          }
        `}
      >
        <SecondaryButton
          css={css`
            ${mediaQueryMobile} {
              width: 50%;
            }
          `}
          onClick={() => {
            history.push({ pathname: `/profile/${id}` });
          }}
        >
          <UserSvg />
          <div>โปรไฟล์</div>
        </SecondaryButton>
        {id !== window.localStorage.getItem('id') &&
          (request?.providedUserId[0]?.userId === id ? (
            <PrimaryButton
              css={css`
                cursor: default;

                ${mediaQueryMobile} {
                  width: 50%;
                }
              `}
            >
              <CheckOutlined style={{ marginRight: '5px' }} />
              <div>เลือก</div>
            </PrimaryButton>
          ) : (
            <PrimaryButton
              css={css`
                ${mediaQueryMobile} {
                  width: 50%;
                }
              `}
              onClick={() => {
                setIsModalVisible(true);
                // addChatRoom({
                //   providerUserId: id,
                //   requesterUserId: window.localStorage.getItem('id')
                // }).then((res) => {
                //   history.push(`/chat/${res.data}`);
                // });
              }}
            >
              {/* <MessageSvg style={{ marginRight: '5px' }} /> */}
              <div>เลือก</div>
            </PrimaryButton>
          ))}
      </div>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleClose}
        footer={null}
        width={isMobile ? '80%' : isLargeDesktop ? '600px' : '35%'}
        maskClosable={false}
        centered
        css={css`
          .ant-modal-body {
            height: 100%;
          }

          .ant-modal-content {
            height: 300px;

            ${mediaQueryLargeDesktop} {
              height: 200px;
            }

            ${mediaQueryMobile} {
              height: 100%;
            }
          }
        `}
      >
        คุณได้เลือกผู้ใช้งานผู้นี้เป็นผู้ให้ความช่วยเหลือของคุณ
        หากคุณยืนยันกรุณากดปุ่มยืนยัน ระบบจะนำคุณไปยังหน้าแชท
        <div
          css={css`
            display: flex;
            width: 100%;
            justify-content: flex-end;
            height: 100%;
            align-items: end;

            ${mediaQueryMobile} {
              position: relative;
              bottom: -12px;
              width: 100%;
              justify-content: space-between;
            }
          `}
        >
          <SecondaryButton
            css={css`
              width: 150px;
            `}
            onClick={handleClose}
          >
            <div>ยกเลิก</div>
          </SecondaryButton>
          <PrimaryButton
            css={css`
              width: 150px;
            `}
            onClick={() => {
              addProvidedUser(
                request.requestId,
                window.localStorage.getItem('id'),
                {
                  userId: id
                }
              )
                .then(() => {
                  addChatRoom({
                    providerUserId: id,
                    requesterUserId: window.localStorage.getItem('id')
                  }).then((res) => {
                    history.push({
                      pathname: `/chat/${res.data}`,
                      state: {
                        id: query,
                        type: 'request',
                        title: request?.title,
                        location: {
                          name: request?.location.name,
                          latitude: request?.location.latitude,
                          longitude: request?.location.longitude
                        },
                        payment: request?.payment,
                        price: request?.price as Number,
                        serviceCharge: request?.serviceCharge as Number,
                        number: request?.number as Number,
                        description: request.description,
                        userId: id
                      }
                    });
                  });
                })
                .catch((error) => {
                  message.error('คุณได้เลือกผู้ให้ความช่วยเหลือแล้ว');
                  setIsModalVisible(false);
                });
            }}
          >
            <div>ยืนยัน</div>
          </PrimaryButton>
        </div>
      </Modal>
    </HelperListCardContainer>
  );
};
