/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useUser } from 'hooks/user/useUser';
import { firestore } from '../../../../../../firebase';
import { useHistory, useLocation } from 'react-router-dom';
import { NotificationBadge } from 'components/Badge/Badge';
import Flex from 'components/Flex/Flex';
import {
  mediaQueryLargeDesktop,
  mediaQueryTablet,
  mediaQueryMobile
} from 'styles/variables';

interface ConversationProps {
  conversation: any;
  currentUser: any;
  imageUrl?: string;
  username?: string;
}

const ConversationSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 10px;

  ${mediaQueryLargeDesktop} {
    margin-bottom: 0;
    align-items: center;
    justify-content: center;
  }

  ${mediaQueryMobile} {
    padding: 0;
  }
`;

const ConversationName = styled.div`
  font-weight: 500;
  font-size: 16px;

  ${mediaQueryLargeDesktop} {
    font-size: 14px;
  }

  ${mediaQueryTablet} {
    display: none;
  }
`;

const ConversationImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;

  ${mediaQueryLargeDesktop} {
    width: 35px;
    height: 35px;
  }

  ${mediaQueryTablet} {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  ${mediaQueryMobile} {
    width: 25px;
    height: 25px;
  }
`;

export const Conversation = ({
  conversation,
  currentUser,
  imageUrl,
  username
}: ConversationProps) => {
  const [isWaitToConfirmOrders, setIsWaitToConfirmOrders] =
    useState<boolean>(false);
  const { pathname } = useLocation();
  const history = useHistory();
  const query = pathname.split('/')[2];

  useEffect(() => {
    const doc = firestore
      .collection('orders')
      .where('chatId', '==', conversation.chatId)
      .where('providerUserId', '==', window.localStorage.getItem('id'))
      .where('status', '==', 'waiting');

    const observer = doc.onSnapshot(
      async (docSnapshot) => {
        if (docSnapshot.docs.length > 0) {
          setIsWaitToConfirmOrders(true);
        } else {
          setIsWaitToConfirmOrders(false);
        }
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );

    return () => observer();
  }, []);

  return (
    <ConversationSection>
      <Flex
        css={css`
          margin-left: 25px;

          ${mediaQueryLargeDesktop} {
            margin-left: 15px;
          }

          ${mediaQueryTablet} {
            margin-left: 0px;
            justify-content: center;
          }
        `}
      >
        <ConversationImage src={imageUrl} alt="conversation user profile" />
        <ConversationName>{username}</ConversationName>
      </Flex>
      {isWaitToConfirmOrders && <NotificationBadge />}
    </ConversationSection>
  );
};
