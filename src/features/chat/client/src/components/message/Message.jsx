/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import moment from 'moment';
import Flex from 'components/Flex/Flex';
import { mediaQueryLargeDesktop } from 'styles/variables';
import './message.css';
import { mediaQueryTablet } from '../../../../../../styles/variables';

const MessageAnother = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const MessageOwn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  align-items: flex-end;
  margin-right: 20px;
`;

const MessageTop = styled.div`
  display: flex;
  align-items: flex-end;
  z-index: 2;
`;

const MessageImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  margin-bottom: 2em;
  margin-left: 25px;

  ${mediaQueryLargeDesktop} {
    width: 32px;
    height: 32px;
    margin-bottom: 1em;
  }

  ${mediaQueryLargeDesktop} {
    width: 22px;
    height: 22px;
  }
`;

const MessageTiming = styled.div`
  z-index: 2;
  margin-right: 8px;
  margin-bottom: 1em;
  font-size: 1.2rem;

  ${mediaQueryLargeDesktop} {
    font-size: 12px;
  }

  ${mediaQueryLargeDesktop} {
    font-size: 10px;
  }
`;

const MessageTextOwn = styled.p`
  white-space: pre-wrap;
  background-color: #ff6b00;
  color: white;
  padding: 12px 20px;
  border-radius: 35px;
  max-width: 300px;
  width: max-content;
  min-width: max-content;
  font-size: 1.6rem;

  ${mediaQueryLargeDesktop} {
    font-size: 16px;
    padding: 10px;
    border-radius: 20px;
  }

  ${mediaQueryLargeDesktop} {
    font-size: 12px;
  }
`;

const MessageText = styled.p`
  padding: 12px 20px;
  border-radius: 35px;
  background-color: rgb(245, 241, 241);
  color: black;
  max-width: 300px;
  width: max-content;
  min-width: max-content;
  white-space: pre-wrap;
  font-size: 1.6rem;

  ${mediaQueryLargeDesktop} {
    font-size: 16px;
    padding: 10px;
    border-radius: 20px;
  }

  ${mediaQueryLargeDesktop} {
    font-size: 12px;
  }
`;

export default function Message({ message, own, anotherUserImg }) {
  return (
    <div>
      {Boolean(own) ? (
        <MessageOwn>
          {' '}
          <MessageTop>
            {Boolean(
              message.readStatus.filter(
                ({ userId }) => userId !== window.localStorage.getItem('id')
              )[0].readStatus === 1
            ) ? (
              <Flex itemAlign="flex-end">
                {' '}
                <Flex direction="column" itemAlign="flex-end">
                  <div
                    css={css`
                      margin-right: 8px;
                      font-size: 1.2rem;

                      ${mediaQueryLargeDesktop} {
                        font-size: 12px;
                      }

                      ${mediaQueryTablet} {
                        font-size: 10px;
                      }
                    `}
                  >
                    Read
                  </div>
                  <MessageTiming>
                    {moment(message.createdAt).format('HH:MM')}
                  </MessageTiming>
                </Flex>{' '}
                <MessageTextOwn
                  css={css`
                    z-index: 2;
                  `}
                >
                  {message.messageText}
                </MessageTextOwn>{' '}
              </Flex>
            ) : (
              <Flex itemAlign="flex-end">
                <Flex itemAlign="flex-end">
                  <MessageTiming>
                    {moment(message.createdAt).format('HH:MM')}
                  </MessageTiming>
                </Flex>{' '}
                <MessageTextOwn>{message.messageText}</MessageTextOwn>{' '}
              </Flex>
            )}
          </MessageTop>
        </MessageOwn>
      ) : (
        <MessageAnother>
          <MessageTop>
            <MessageImg src={anotherUserImg} alt="chat user avatar" />

            <Flex itemAlign="flex-end">
              <MessageText>{message.messageText}</MessageText>{' '}
              <MessageTiming
                css={css`
                  margin-left: 10px;
                `}
              >
                {moment(message.createdAt).format('HH:MM')}
              </MessageTiming>
            </Flex>
          </MessageTop>
        </MessageAnother>
      )}
    </div>
  );
}
