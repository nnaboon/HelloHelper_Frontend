/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { observer } from 'mobx-react-lite';
import { useHistory, useLocation } from 'react-router-dom';
import { Conversation } from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import { WaitingToConfirmOrders } from '../../components/waitingToConfirmOrders/WaitingToConfirmOrders';
import { userStore } from 'store/userStore';
import { Loading } from 'components/Loading/Loading';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { Modal, Upload, message } from 'antd';
import Flex from 'components/Flex/Flex';
import { OrderForm } from 'components/Form/OrderForm';
import { useChats } from 'hooks/chat/useChats';
import { useUser } from 'hooks/user/useUser';
import {
  useMedia,
  mediaQueryMobile,
  mediaQueryTablet,
  MOBILE_WIDTH,
  SMALL_TABLET_WIDTH,
  DESKTOP_WIDTH,
  LARGE_DESKTOP_WIDTH,
  mediaQueryLargeDesktop
} from 'styles/variables';
import { PictureOutlined } from '@ant-design/icons';
import { useAddMessage } from 'hooks/chat/useAddMessage';
import { useUpdateReadStatus } from 'hooks/chat/useUpdateReadStatus';
import { useUploadMediaMessage } from 'hooks/chat/useUploadMediaMessage';
import { firestore } from '../../../../../../firebase';

const ChatMenu = styled.div`
  flex: 3;

  ${mediaQueryMobile} {
    flex: 1;
  }
`;

const ChatMenuInput = styled.input`
  width: 90%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid gray;

  ${mediaQueryMobile} {
    display: none;
  }
`;

const ChatBox = styled.div`
  flex: 5.5;

  ${mediaQueryMobile} {
    flex: 10;
  }
`;

const MessengerContainer = styled.div`
  height: calc(100vh - 200px);
  display: flex;
  background: white;

  ${mediaQueryLargeDesktop} {
    height: calc(100vh - 180px);
  }
`;
const ChatBoxTop = styled.div`
  height: calc(100vh - 450px);
  overflow-y: scroll;
  padding-right: 10px;

  ${mediaQueryLargeDesktop} {
    height: calc(100vh - 400px);
  }

  ${mediaQueryTablet} {
    height: calc(100vh - 365px);
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
  resize: none;

  ${mediaQueryTablet} {
    height: 65px;
  }
`;

const LeftInnerContainer = styled.div`
  flex: 0.5;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 3%;
  color: white;
  flex-direction: column;
  z-index: 99;
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
  font-size: 2.5rem;
  line-height: 26px;

  color: #e66101;

  ${mediaQueryLargeDesktop} {
    font-size: 24px;
  }

  ${mediaQueryTablet} {
    font-size: 18px;
  }
`;

const RequestForm = styled.div`
  font-size: 1.8rem;
  line-height: 26px;
  color: #000000;
  margin-top: 20px;
  cursor: pointer;

  ${mediaQueryLargeDesktop} {
    font-size: 18px;
    margin-top: 10px;
  }

  ${mediaQueryTablet} {
    font-size: 16px;
  }
`;

const ChatBoxBottom = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatOnline = styled.div`
  flex: 3;
  height: 100%;

  ${mediaQueryMobile} {
    flex: 1px;
  }
`;

const ChatSubmitButton = styled.button`
  width: 70px;
  height: 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: teal;
  color: white;
`;

export const Messenger = observer(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chats, setChats] = useState<any[]>(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { execute: updateReadStatus } = useUpdateReadStatus();
  const { execute: getChats } = useChats();
  const { data: user, execute: getUser } = useUser();
  const { execute: addMessage } = useAddMessage();
  const { execute: uploadMedia } = useUploadMediaMessage();

  const scrollRef = useRef(null);
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

  const handleChange = (info) => {
    var formData = new FormData();
    formData.append('img', info.file.originFileObj);

    if (info.file.status === 'error') {
      uploadMedia(formData)
        .then((res) => {
          const message = {
            senderUserId: me.userId,
            receiverUserId: user?.userId,
            media: res.data
          };

          addMessage(query, message).then((res) => {
            setMessages(res.data);
          });
        })
        .catch((error) => {
          message.error('อัปโหลดรูปไม่สำเร็จ');
        });
    }
  };

  useEffect(() => {
    if (state) {
      setIsModalVisible(true);
    }
  }, []);

  useEffect(() => {
    if (me) {
      getChats(me.userId).then((res) => setChats(res.data));
    }
  }, [me]);

  useEffect(() => {
    const doc = firestore.collection('chats');
    const entities = [];

    const observer = doc.onSnapshot(
      (docSnapshot) => {
        getChats(me.userId).then((res) => setChats(res.data));
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );

    setChats(entities);
    return () => observer();
  }, []);

  useEffect(() => {
    console.log(chats);
    if (query && chats?.length > 0) {
      const messages =
        chats.length > 0
          ? chats.filter(({ chatId }) => chatId === query)[0].messages
          : [];
      setMessages(messages);
      setCurrentChat(query);

      const currentChatRoom =
        chats.length > 0
          ? chats.filter(({ chatId }) => chatId === query)[0]
          : undefined;
      const anotherUser = currentChatRoom?.users.filter(
        (items) => items !== window.localStorage.getItem('id')
      );

      getUser(anotherUser);
    }
  }, [query, chats]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <WrapperContainer
      css={css`
        padding: 0 20px;
      `}
    >
      {me && chats ? (
        <React.Fragment>
          <MessengerContainer>
            <ChatMenu>
              <ChatMenuWrapper>
                <ChatMenuInput placeholder="Search for friends" />
                {chats.map((c) => (
                  <div
                    onClick={() => {
                      setCurrentChat(c);
                      history.push(`/chat/${c.chatId}`);

                      updateReadStatus(c.chatId, {
                        senderUserId: me.userId
                      });
                    }}
                  >
                    <Conversation conversation={c} currentUser={me} />
                  </div>
                ))}
              </ChatMenuWrapper>
            </ChatMenu>
            <ChatBox>
              <ChatBoxWrapper>
                {currentChat && user ? (
                  <React.Fragment>
                    {' '}
                    <TopBar>
                      <LeftInnerContainer>
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
                      </LeftInnerContainer>
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
                            own={Boolean(
                              m.createdBy === window.localStorage.getItem('id')
                            )}
                            css={css`
                              z-index: 2;
                            `}
                          />
                        </div>
                      ))}
                    </ChatBoxTop>
                    <ChatBoxBottom>
                      <ChatMessageInput
                        placeholder="พิมพ์ข้อความ"
                        onKeyPress={(e) =>
                          e.key === 'Enter' && !e.shiftKey && handleSubmit(e)
                        }
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                      ></ChatMessageInput>
                      <Flex itemAlign="center" width="20%" justify="center">
                        <Upload showUploadList={false} onChange={handleChange}>
                          <PictureOutlined
                            css={css`
                              font-size: 2.5rem;
                              margin-right: 15px;

                              ${mediaQueryLargeDesktop} {
                                font-size: 32px;
                              }

                              ${mediaQueryMobile} {
                                font-size: 16px;
                              }
                            `}
                          />
                        </Upload>
                        <ChatSubmitButton onClick={handleSubmit}>
                          Send
                        </ChatSubmitButton>
                      </Flex>
                    </ChatBoxBottom>
                  </React.Fragment>
                ) : (
                  <NoConversationText>
                    เริ่มต้นการสนทนากับผู้อื่นได้ที่นี่
                  </NoConversationText>
                )}
              </ChatBoxWrapper>
            </ChatBox>
            <ChatOnline>
              <ChatOnlineWrapper>
                <WaitingToConfirmOrders />
              </ChatOnlineWrapper>
            </ChatOnline>
          </MessengerContainer>
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
