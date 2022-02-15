/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import moment from 'moment';
import Flex from 'components/Flex/Flex';
import { mediaQueryLargeDesktop } from 'styles/variables';
import './message.css';

export default function Message({ message, own, anotherUserImg }) {
  return (
    <div
      className={own ? 'message own' : 'message'}
      css={css`
        z-index: 2;
      `}
    >
      <div
        className="messageTop"
        css={css`
          z-index: 2;
        `}
      >
        {!Boolean(own) && (
          <img className="messageImg" src={anotherUserImg} alt="" />
        )}

        {Boolean(own) ? (
          Boolean(
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
                  `}
                >
                  Read
                </div>
                <div
                  // className="messageBottom"
                  css={css`
                    z-index: 2;
                    margin-right: 8px;
                    margin-bottom: 1em;
                  `}
                >
                  {moment(message.createdAt).format('HH:MM')}
                </div>
              </Flex>{' '}
              <p
                className="messageText"
                css={css`
                  z-index: 2;
                `}
              >
                {message.messageText}
              </p>{' '}
            </Flex>
          ) : (
            <Flex itemAlign="flex-end">
              <Flex itemAlign="flex-end">
                <div
                  // className="messageBottom"
                  css={css`
                    z-index: 2;
                    margin-right: 8px;
                    margin-bottom: 1em;
                  `}
                >
                  {moment(message.createdAt).format('HH:MM')}
                </div>
              </Flex>{' '}
              <p
                className="messageText"
                css={css`
                  z-index: 2;
                `}
              >
                {message.messageText}
              </p>{' '}
            </Flex>
          )
        ) : (
          <Flex itemAlign="flex-end">
            <p
              className="messageText"
              css={css`
                z-index: 2;
              `}
            >
              {message.messageText}
            </p>{' '}
            <div
              css={css`
                z-index: 2;
                margin-left: 8px;
                margin-bottom: 1em;
              `}
            >
              {moment(message.createdAt).format('HH:MM')}
            </div>
          </Flex>
        )}
      </div>
    </div>
  );
}
