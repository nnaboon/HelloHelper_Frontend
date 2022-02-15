/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect, useContext, useRef } from 'react';
import moment from 'moment';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import './messenger.css';
import { observer } from 'mobx-react-lite';
import { useHistory, useLocation } from 'react-router-dom';
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import WaitingToConfirmOrders from '../../components/waitingToConfirmOrders/WaitingToConfirmOrders';
import { userStore } from 'store/userStore';
import { Loading } from 'components/Loading/Loading';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { Modal } from 'antd';
import { OrderForm } from 'components/Form/OrderForm';
import { useChats } from 'hooks/chat/useChats';
import { useUser } from 'hooks/user/useUser';
import {
  useMedia,
  mediaQueryMobile,
  MOBILE_WIDTH,
  SMALL_TABLET_WIDTH,
  DESKTOP_WIDTH,
  LARGE_DESKTOP_WIDTH,
  mediaQueryLargeDesktop
} from 'styles/variables';
import { useAddMessage } from 'hooks/chat/useAddMessage';
import { useUpdateReadStatus } from 'hooks/chat/useUpdateReadStatus';

const ChatBoxTop = styled.div`
  height: calc(100vh - 450px);
  overflow-y: scroll;
  padding-right: 10px;

  ${mediaQueryLargeDesktop} {
    height: calc(100vh - 400px);
  }
`;
const ChatBoxWrapper = styled.div`
  height: 100%;
`;

const ChatMenuWrapper = styled.div`
  padding: 0px 10px;
  height: 100%;
`;

const ChatOnlineWrapper = styled.div`
  padding: 0px 10px;
  height: 100%;
`;

const ChatMessageInput = styled.textarea`
  width: 80%;
  height: 90px;
  padding: 10px;
`;

const NoConversationText = styled.div`
  top: 45%;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  font-size: 50px;
  color: rgb(224, 220, 220);
  cursor: default;
`;

const TopBar = styled.div`
  width: 100%;
  height: 130px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: relative;
  z-index: 9;

  ${mediaQueryLargeDesktop} {
    height: 100px;
  }
`;

const RequestName = styled.div`
  font-weight: bold;
  line-height: 26px;
  font-size: 1.9rem;
  color: #000000;
  margin-left: 20px;

  ${mediaQueryLargeDesktop} {
    font-size: 18px;
  }
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 1.9rem;
  line-height: 26px;

  color: #e66101;

  ${mediaQueryLargeDesktop} {
    font-size: 24px;
  }
`;

const RequestForm = styled.div`
  font-size: 1.7rem;
  line-height: 26px;
  color: #000000;
  margin-top: 20px;
  cursor: pointer;

  ${mediaQueryLargeDesktop} {
    font-size: 18px;
    margin-top: 10px;
  }
`;

export const Messenger = observer(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { execute: updateReadStatus } = useUpdateReadStatus();
  const { data: chats, execute: getChats } = useChats();
  const { data: user, execute: getUser } = useUser();
  const { execute: addMessage } = useAddMessage();

  const scrollRef = useRef();
  const { me } = userStore;

  const isDesktop = useMedia(`max-width: ${DESKTOP_WIDTH}px`);
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isLargeDesktop = useMedia(`(max-width: ${LARGE_DESKTOP_WIDTH}px)`);

  const history = useHistory();
  const { pathname, state } = useLocation();
  const query = pathname?.split('/')[2];

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      senderUserId: me.userId,
      receiverUserId: user?.userId,
      messageText: newMessage
    };

    try {
      addMessage(query, message).then((res) => {
        setMessages(res.data);
      });
      setNewMessage('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (state) {
      setIsModalVisible(true);
    }
  }, []);

  useEffect(() => {
    if (me) {
      getChats(me.userId);
    }
  }, [me]);

  useEffect(() => {
    if (query && chats) {
      const messages = chats.filter(({ chatId }) => chatId === query)[0]
        .messages;
      setMessages(messages);
      setCurrentChat(query);

      const currentChatRoom = chats.filter(({ chatId }) => chatId === query)[0];
      const anotherUser = currentChatRoom.users.filter(
        (items) => items !== window.localStorage.getItem('id')
      );

      getUser(anotherUser);
    }
  }, [query, chats]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <WrapperContainer
      css={css`
        padding: 0 20px;
      `}
    >
      {me && chats ? (
        <React.Fragment>
          <div className="messenger">
            <div className="chatMenu">
              <ChatMenuWrapper>
                <input
                  placeholder="Search for friends"
                  className="chatMenuInput"
                />
                {chats.map((c) => (
                  <div
                    onClick={() => {
                      setCurrentChat(c);
                      history.push(`/chat/${c.chatId}`);

                      updateReadStatus(c.chatId, { senderUserId: me.userId });
                    }}
                  >
                    <Conversation conversation={c} currentUser={me} />
                  </div>
                ))}
              </ChatMenuWrapper>
            </div>
            <div className="chatBox">
              <ChatBoxWrapper>
                {currentChat && user ? (
                  <>
                    {' '}
                    <TopBar>
                      <div className="leftInnerContainer">
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'flex-end'
                          }}
                        >
                          <UserName>{user.username}</UserName>
                        </div>
                        <RequestForm onClick={() => setIsModalVisible(true)}>
                          ฟอร์มการช่วยเหลือ
                        </RequestForm>
                      </div>
                    </TopBar>
                    <ChatBoxTop>
                      <div
                        css={css`
                          z-index: 9;
                        `}
                      ></div>
                      {messages.map((m) => (
                        <div
                          ref={scrollRef}
                          css={css`
                            z-index: 2;
                          `}
                        >
                          <Message
                            message={m}
                            anotherUserImg={user.imageUrl}
                            own={
                              m.createdBy === window.localStorage.getItem('id')
                            }
                            css={css`
                              z-index: 2;
                            `}
                          />
                        </div>
                      ))}
                    </ChatBoxTop>
                    <div className="chatBoxBottom">
                      <ChatMessageInput
                        placeholder="พิมพ์ข้อความ"
                        onKeyPress={(e) =>
                          e.key === 'Enter' && !e.shiftKey && handleSubmit(e)
                        }
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                      ></ChatMessageInput>
                      <button
                        className="chatSubmitButton"
                        onClick={handleSubmit}
                      >
                        Send
                      </button>
                    </div>
                  </>
                ) : (
                  <NoConversationText>
                    เริ่มต้นการสนทนากับผู้อื่นได้ที่นี่
                  </NoConversationText>
                )}
              </ChatBoxWrapper>
            </div>
            <div className="chatOnline">
              <div className="chatOnlineWrapper">
                <WaitingToConfirmOrders setCurrentChat={setCurrentChat} />
              </div>
            </div>
          </div>
          <Modal
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            width={isMobile ? '80%' : isLargeDesktop ? '700px' : '36%'}
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
                height: 100%;

                ${mediaQueryLargeDesktop} {
                  height: 800px;
                }

                ${mediaQueryMobile} {
                  min-height: 400px;
                  height: 400px;
                  overflow-y: scroll;
                }
              }
            `}
          >
            <OrderForm data={state} setIsModalVisible={setIsModalVisible} />
          </Modal>
        </React.Fragment>
      ) : (
        <Loading height="calc(100vh - 285px)" />
      )}
    </WrapperContainer>
  );
});
