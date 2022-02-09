import React from 'react';
import dayjs from 'dayjs';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  console.log(message.user);
  if (message.user === trimmedName) {
    isSentByCurrentUser = true;
  }

  // return isSentByCurrentUser ? (
  //   <div className="messageContainer justifyEnd">
  //     <div className="messageBox backgroundBlue">
  //       <p className="messageText colorWhite">{message.text}</p>
  //     </div>
  //     <p className="sentText pr-10 ">{dayjs().format('hh:mm')}</p>
  //   </div>
  // ) : (
  //   <div className="messageContainer justifyStart">
  //     <div className="messageBox backgroundLight">
  //       <p className="messageText colorDark">{message.text}</p>
  //     </div>
  //     <p className="sentText pl-10 ">{dayjs().format('hh:mm')}</p>
  //   </div>
  // );

  return (
    <React.Fragment>
      <div>
        {isSentByCurrentUser ? (
          <div className="messageContainer justifyEnd">
            <div className="messageBox backgroundBlue">
              <p className="messageText colorWhite">{message.text}</p>
            </div>
            <p className="sentText pr-10 ">{dayjs().format('hh:mm')}</p>
          </div>
        ) : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{message.text}</p>
            </div>
            <p className="sentText pl-10 ">{dayjs().format('hh:mm')}</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Message;
