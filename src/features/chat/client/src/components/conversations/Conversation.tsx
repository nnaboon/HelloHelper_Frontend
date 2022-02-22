/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useUser } from 'hooks/user/useUser';
import Flex from 'components/Flex/Flex';
import {
  mediaQueryLargeDesktop,
  mediaQueryTablet,
  mediaQueryMobile
} from 'styles/variables';

interface ConversationProps {
  conversation: any;
  currentUser: any;
}

const ConversationSection = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 10px;

  ${mediaQueryLargeDesktop} {
    margin-bottom: 0;
  }
`;

const ConversationName = styled.div`
  font-weight: 500;
  font-size: 1.7rem;

  ${mediaQueryLargeDesktop} {
    font-size: 16px;
  }

  ${mediaQueryMobile} {
    display: none;
  }
`;

const ConversationImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;

  ${mediaQueryLargeDesktop} {
    width: 45px;
    height: 45px;
  }

  ${mediaQueryTablet} {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`;

export const Conversation = ({
  conversation,
  currentUser
}: ConversationProps) => {
  const { data: user, execute: getUser } = useUser();

  useEffect(() => {
    const anotherUser = conversation.users.filter(
      (items) => items !== window.localStorage.getItem('id')
    );

    getUser(anotherUser);
  }, [currentUser, conversation]);

  return (
    <ConversationSection>
      {user && (
        <Flex
          css={css`
            margin-left: 25px;

            ${mediaQueryLargeDesktop} {
              margin-left: 15px;
            }

            ${mediaQueryTablet} {
              margin-left: 0px;
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
    </ConversationSection>
  );
};