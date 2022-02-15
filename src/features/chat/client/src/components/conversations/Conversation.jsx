/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useUser } from 'hooks/user/useUser';
import Flex from 'components/Flex/Flex';
import './conversation.css';
import { mediaQueryLargeDesktop, mediaQueryMobile } from 'styles/variables';

const ConversationName = styled.div`
  font-weight: 500;
  font-size: 1.6rem;

  ${mediaQueryLargeDesktop} {
    font-size: 14px;
  }

  ${mediaQueryMobile} {
    display: none;
  }
`;

const ConversationImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;

  ${mediaQueryLargeDesktop} {
    width: 40px;
    height: 40px;
  }
`;

export default function Conversation({ conversation, currentUser }) {
  const { data: user, execute: getUser } = useUser();

  useEffect(() => {
    const anotherUser = conversation.users.filter(
      (items) => items !== window.localStorage.getItem('id')
    );

    getUser(anotherUser);
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      {user && (
        <Flex
          css={css`
            margin-left: 25px;

            ${mediaQueryLargeDesktop} {
              margin-left: 15px;
            }
          `}
        >
          <ConversationImage
            src={user.imageUrl}
            alt="conversation user profile"
          />
          <ConversationName>{user.username}</ConversationName>
        </Flex>
      )}
    </div>
  );
}
