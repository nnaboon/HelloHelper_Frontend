/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { PrimaryButton, SecondaryButton } from '../Button/Button';
import { MessageSvg } from 'components/Svg/MessageSvg';
import { UserSvg } from 'components/Svg/UserSvg';
import { useMedia, mediaQueryMobile, mediaQueryTablet } from 'styles/variables';
import { useHistory } from 'react-router-dom';
import { useAddChatRoom } from 'hooks/chat/useAddChatRoom';

interface HelperListCardProps {
  id: string;
  name: string;
  imageUrl?: string;
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

export const HelperListCard = ({ id, name, imageUrl }: HelperListCardProps) => {
  const history = useHistory();
  const { execute: addChatRoom } = useAddChatRoom();

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
        {id !== window.localStorage.getItem('id') && (
          <PrimaryButton
            css={css`
              ${mediaQueryMobile} {
                width: 50%;
              }
            `}
            onClick={() => {
              addChatRoom({
                providerUserId: id,
                requesterUserId: window.localStorage.getItem('id')
              }).then((res) => {
                history.push(`/chat/${res.data}`);
              });
            }}
          >
            <MessageSvg style={{ marginRight: '5px' }} />
            <div>แชท</div>
          </PrimaryButton>
        )}
      </div>
    </HelperListCardContainer>
  );
};
