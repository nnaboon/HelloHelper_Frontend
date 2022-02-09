/** @jsxRuntime classic */
/** @jsx jsx */
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Develop } from 'components/Empty/Develop';

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

const ENDPOINT = 'https://project-chat-application.herokuapp.com/';

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      user: 'กระทิง สีแดง',
      text: 'helปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปlo'
    },
    {
      user: 'ปลาทอง ตัวกลม',
      text: 'สวัสlปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปlปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปlปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปปดี'
    },
    {
      user: 'กระทิง สีแดง',
      text: 'hello'
    }
  ]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    setRoom(room);
    setName(name);
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    setMessages((messages) => [...messages, message]);

    setUsers(users);
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log('sendMessage', message);
    setMessages((messages) => [...messages, message]);

    setMessage('');
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={'กระทิง สีแดง'} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      {/* <TextContainer users={['naboon', 'lila']} /> */}
    </div>

    // <div
    //   css={css`
    //     position: relative;
    //     top: 200px;
    //   `}
    // >
    //   <Develop />
    // </div>
  );
};

export default Chat;
