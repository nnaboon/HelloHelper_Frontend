/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect, useContext, useRef } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import './messenger.css';
import { observer } from 'mobx-react-lite';
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
// import ChatOnline from '../../components/chatOnline/ChatOnline';
import { AuthContext } from '../../context/AuthContext';
// import axios from 'axios';
// import { io } from 'socket.io-client';
import { userStore } from 'store/userStore';
import { Loading } from 'components/Loading/Loading';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { Modal } from 'antd';
import { OrderForm } from 'components/Form/OrderForm';
import {
  useMedia,
  mediaQueryMobile,
  MOBILE_WIDTH,
  DESKTOP_WIDTH,
  mediaQueryDesktop
} from 'styles/variables';

export const Messenger = observer(() => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const { me } = userStore;
  // useEffect(() => {
  //   socket.current = io('ws://localhost:8900');
  //   socket.current.on('getMessage', (data) => {
  //     setArrivalMessage({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now()
  //     });
  //   });
  // }, []);

  // useEffect(() => {
  //   arrivalMessage &&
  //     currentChat?.members.includes(arrivalMessage.sender) &&
  //     setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage, currentChat]);

  // useEffect(() => {
  //   socket.current.emit('addUser', user._id);
  //   socket.current.on('getUsers', (users) => {
  //     setOnlineUsers(
  //       user.followings.filter((f) => users.some((u) => u.userId === f))
  //     );
  //   });
  // }, [user]);

  // useEffect(() => {
  //   const getConversations = async () => {
  //     try {
  //       const res = await axios.get('/conversations/' + user._id);
  //       setConversations(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getConversations();
  // }, [user._id]);

  // useEffect(() => {
  //   const getMessages = async () => {
  //     try {
  //       const res = await axios.get('/messages/' + currentChat?._id);
  //       setMessages(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getMessages();
  // }, [currentChat]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isDesktop = useMedia(`max-width: ${DESKTOP_WIDTH}px`);
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: me.userId,
      text: newMessage,
      conversationId: '123456'
    };

    messages.push(message);

    console.log(messages);
    // const receiverId = currentChat.members.find(
    //   (member) => member !== user._id
    // );

    // socket.current.emit('sendMessage', {
    //   senderId: user._id,
    //   receiverId,
    //   text: newMessage
    // });

    // try {
    //   const res = await axios.post('/messages', message);
    //   setMessages([...messages, res.data]);
    //   setNewMessage('');
    // } catch (err) {
    //   console.log(err);
    // }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <WrapperContainer
      css={css`
        padding: 0 20px;
      `}
    >
      {me ? (
        <React.Fragment>
          <div className="messenger">
            <div className="chatMenu">
              <div className="chatMenuWrapper">
                <input
                  placeholder="Search for friends"
                  className="chatMenuInput"
                />
                {[me, me, me, me, me].map((c) => (
                  <div onClick={() => setCurrentChat(c)}>
                    <Conversation conversation={c} currentUser={me} />
                  </div>
                ))}
              </div>
            </div>
            <div className="chatBox">
              <div className="chatBoxWrapper">
                {currentChat ? (
                  <>
                    <div className="chatBoxTop">
                      <div className="topBar">
                        <div className="leftInnerContainer">
                          <div
                            style={{ display: 'flex', alignItems: 'flex-end' }}
                          >
                            <div className="user-name">ปลาทอง ตัวกลม</div>
                            <div className="request-name">
                              ขนมปังสังขยา โชคชัย4
                            </div>
                          </div>
                          <div
                            className="request-form"
                            onClick={() => setIsModalVisible(true)}
                          >
                            ฟอร์มการช่วยเหลือ
                          </div>
                        </div>
                      </div>
                      {messages.map((m) => (
                        <div ref={scrollRef}>
                          <Message
                            message={m}
                            own={m.sender === window.localStorage.getItem('id')}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="chatBoxBottom">
                      <textarea
                        className="chatMessageInput"
                        placeholder="write something..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                      ></textarea>
                      <button
                        className="chatSubmitButton"
                        onClick={handleSubmit}
                      >
                        Send
                      </button>
                    </div>
                  </>
                ) : (
                  <span className="noConversationText">
                    เริ่มต้นการสนทนากับผู้อื่นได้ที่นี่
                  </span>
                )}
              </div>
            </div>
            {/* <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div> */}
          </div>
          <Modal
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            width={isMobile ? '75%' : 700}
            maskClosable={false}
            centered
            css={css`
              .ant-form-item-control-input {
                width: 100% !important;
              }
              .ant-col-16 {
                max-width: unset;
              }
              .ant-modal-content {
                min-height: 820px;
                height: 820px;

                @media screen and (min-width: 2000px) {
                  min-height: 900px;
                  height: max-content;
                }

                ${mediaQueryMobile} {
                  min-height: 400px;
                  height: 400px;
                  overflow-y: scroll;
                }
              }
            `}
          >
            <OrderForm />
          </Modal>
        </React.Fragment>
      ) : (
        <Loading height="calc(100vh - 285px)" />
      )}
    </WrapperContainer>
  );
});
