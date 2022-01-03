import React from 'react';
import dayjs from 'dayjs';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.css';

const Messages = ({ messages, name }) => (
  <React.Fragment>
    <ScrollToBottom className="messages">
      <div className="timeBlock backgroundWhite">
        {dayjs().format('DD/MM/YYYY')}
      </div>{' '}
      {messages.map((message, i) => (
        <div key={i}>
          {console.log('message', message)}
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  </React.Fragment>
);

export default Messages;
