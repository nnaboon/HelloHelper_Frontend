/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import moment from 'moment';
import Flex from 'components/Flex/Flex';
import { Image } from 'antd';
import { mediaQueryLargeDesktop, mediaQueryTablet } from 'styles/variables';
import {
  mediaQueryMobile,
  mediaQueryMiniDesktop
} from '../../../../../../styles/variables';

interface MessageProps {
  message: any;
  own: Boolean;
  anotherUserImg: any;
}

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
  margin-bottom: 1em;
  margin-left: 25px;

  ${mediaQueryLargeDesktop} {
    width: 32px;
    height: 32px;
    margin-bottom: 1em;
  }

  ${mediaQueryMiniDesktop} {
    width: 26px;
    height: 26px;
  }

  ${mediaQueryTablet} {
    width: 22px;
    height: 22px;
  }

  ${mediaQueryMobile} {
  }
`;

const MessageTiming = styled.div`
  z-index: 2;
  margin-right: 8px;
  margin-bottom: 1em;
  font-size: 14px;

  ${mediaQueryLargeDesktop} {
    font-size: 12px;
  }

  ${mediaQueryTablet} {
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
  font-size: 16px;

  ${mediaQueryLargeDesktop} {
    font-size: 14px;
    padding: 10px;
    border-radius: 20px;
  }

  ${mediaQueryTablet} {
    font-size: 12px;
  }
`;

const MessageMediaOwn = styled(Image)`
  color: white;
  border-radius: 35px;
  height: 300px;
  width: 300px;

  ${mediaQueryLargeDesktop} {
    border-radius: 20px;
    height: 250px;
    width: 250px;
  }

  ${mediaQueryTablet} {
    height: 150px;
    width: 150px;
  }

  ${mediaQueryMobile} {
    height: 140px;
    width: 140px;
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
  font-size: 16px;

  ${mediaQueryLargeDesktop} {
    font-size: 14px;
    padding: 10px;
    border-radius: 20px;
  }

  ${mediaQueryTablet} {
    font-size: 12px;
  }
`;

export default function Message({
  message,
  own,
  anotherUserImg
}: MessageProps) {
  return (
    <div>
      {Boolean(own) ? (
        <MessageOwn>
          {' '}
          <MessageTop>
            {Boolean(
              message?.readStatus.filter(
                ({ userId }) => userId !== window.localStorage.getItem('id')
              )[0]?.readStatus === 1
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
                    {moment(message.createdAt).format('MMM DD,  HH:mm')}
                  </MessageTiming>
                </Flex>{' '}
                {message.media ? (
                  <MessageMediaOwn src={message.media} alt="message media" />
                ) : (
                  <MessageTextOwn
                    css={css`
                      z-index: 2;
                    `}
                  >
                    {message.messageText}
                  </MessageTextOwn>
                )}
              </Flex>
            ) : (
              <Flex itemAlign="flex-end">
                <Flex itemAlign="flex-end">
                  <MessageTiming>
                    {moment(message.createdAt).format('MMM DD,  HH:mm')}
                  </MessageTiming>
                </Flex>{' '}
                {message.media ? (
                  <MessageMediaOwn src={message.media} alt="message media" />
                ) : (
                  <MessageTextOwn
                    css={css`
                      z-index: 2;
                    `}
                  >
                    {message.messageText}
                  </MessageTextOwn>
                )}
              </Flex>
            )}
          </MessageTop>
        </MessageOwn>
      ) : (
        <MessageAnother>
          <MessageTop>
            <MessageImg src={anotherUserImg} alt="chat user avatar" />

            <Flex itemAlign="flex-end">
              {message.media ? (
                <MessageMediaOwn src={message.media} alt="message media" />
              ) : (
                <MessageText
                  css={css`
                    z-index: 2;
                  `}
                >
                  {message.messageText}
                </MessageText>
              )}
              <MessageTiming
                css={css`
                  margin-left: 10px;
                `}
              >
                {moment(message.createdAt).format('MMM DD,  HH:mm')}
              </MessageTiming>
            </Flex>
          </MessageTop>
        </MessageAnother>
      )}
    </div>
  );
}
