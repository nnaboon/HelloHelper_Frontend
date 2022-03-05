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
import { Modal, Upload, message, Dropdown, Menu } from 'antd';
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
import {
  PictureOutlined,
  MoreOutlined,
  PictureFilled
} from '@ant-design/icons';
import { useChat } from 'hooks/chat/useChat';
import { useWaitForConfirmOrders } from 'hooks/order/useWaitForConfirmOrder';
import { useAddMessage } from 'hooks/chat/useAddMessage';
import { useUpdateReadStatus } from 'hooks/chat/useUpdateReadStatus';
import { useUploadMediaMessage } from 'hooks/chat/useUploadMediaMessage';
import { firestore } from '../../../../../../firebase';
import {
  mediaQueryMiniDesktop,
  mediaQuerySmallTablet
} from '../../../../../../styles/variables';

const ChatMenu = styled.div`
  flex: 3;

  ${mediaQueryTablet} {
    flex: 1;
  }
`;

const ChatMenuInput = styled.input`
  width: 90%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid gray;

  ${mediaQueryTablet} {
    display: none;
  }
`;

const ChatBox = styled.div`
  flex: 5.5;
  position: relative;

  ${mediaQueryMobile} {
    flex: 10;
  }
`;

const MessengerContainer = styled.div`
  height: 100%;
  display: flex;
  background: white;

  ${mediaQueryLargeDesktop} {
    height: 100%;
  }
`;
const ChatBoxTop = styled.div`
  height: calc(100vh - 470px);
  overflow-y: scroll;
  padding-right: 10px;
  z-index: 2;

  ${mediaQueryLargeDesktop} {
    height: calc(100vh - 365px);
  }

  ${mediaQueryMiniDesktop} {
    height: calc(100vh - 355px);
  }

  ${mediaQuerySmallTablet} {
    height: calc(100% - 100px);
  }

  ${mediaQueryMobile} {
    // height: calc(100vh - 310px);
    height: calc(100% - 120px);
  }
`;
const ChatBoxWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const ChatMenuWrapper = styled.div`
  padding: 0px 10px;
  height: 100%;

  ${mediaQueryTablet} {
    padding: 0px 10px;
  }
`;

const ChatOnlineWrapper = styled.div`
  padding: 0px 10px;
  height: 100%;
`;

const ChatMessageInput = styled.textarea`
  width: 80%;
  height: 70px;
  padding: 10px;
  resize: none;

  ${mediaQueryTablet} {
    height: 65px;
  }

  ${mediaQueryMobile} {
    width: 76%;
    height: 55px;
    padding: 5px;
    font-size: 12px;
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
  font-size: 40px;
  color: rgb(224, 220, 220);
  cursor: default;

  ${mediaQueryLargeDesktop} {
    font-size: 30px;
  }

  ${mediaQueryTablet} {
    font-size: 20px;
  }

  ${mediaQueryMobile} {
    font-size: 20px;
  }
`;

const TopBar = styled.div`
  width: 100%;
  height: 120px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: relative;
  z-index: 9;

  ${mediaQueryLargeDesktop} {
    height: 90px;
  }

  ${mediaQueryTablet} {
    padding: 10px;
    height: 80px;
  }

  ${mediaQueryMobile} {
    padding: 20px;
    height: 60px;
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
  font-size: 22px;
  line-height: 26px;
  color: #e66101;
  cursor: pointer;

  ${mediaQueryLargeDesktop} {
    font-size: 20px;
  }

  ${mediaQueryTablet} {
    font-size: 16px;
  }
`;

const RequestForm = styled.div`
  font-size: 16px;
  line-height: 26px;
  color: #000000;
  margin-top: 20px;
  cursor: pointer;

  ${mediaQueryLargeDesktop} {
    font-size: 16px;
    margin-top: 3px;
  }

  ${mediaQueryTablet} {
    font-size: 16px;
    margin-top: 0;
  }
`;

const ChatBoxBottom = styled.div`
  position: absolute;
  bottom: 0px;
  height: 80px;
  width: 100%;
  z-index: 10;

  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mediaQueryMobile} {
    height: 68px;
    width: 97%;
  }

  background: #ffff;
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
  z-index: 9;

  ${mediaQueryTablet} {
    width: 50px;
    height: 30px;
  }

  ${mediaQueryMobile} {
    height: 25px;
    font-size: 12px;
  }
`;

export const Messenger = observer(() => {
  const [menu, setMenu] = useState<string>('form');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [chats, setChats] = useState<any[]>(null);
  const [users, setUsers] = useState<any[]>([]);

  const [currentChat, setCurrentChat] = useState<any>(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [orders, setOrders] = useState([]);
  const { execute: updateReadStatus } = useUpdateReadStatus();
  const { execute: getChats } = useChats();
  const { execute: getChat } = useChat();
  const { data: user, execute: getUser } = useUser();
  const { execute: addMessage } = useAddMessage();
  const { execute: uploadMedia } = useUploadMediaMessage();
  const { data: waitConfirmOrder, execute: getWaitConfirmOrder } =
    useWaitForConfirmOrders();

  const scrollRef = useRef(null);
  const { me } = userStore;

  const isDesktop = useMedia(`max-width: ${DESKTOP_WIDTH}px`);
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isLargeDesktop = useMedia(`(max-width: ${LARGE_DESKTOP_WIDTH}px)`);

  const history = useHistory();
  const { pathname, state } = useLocation();
  const query = pathname?.split('/')[2];

  const dropDownMenu = (
    <Menu
      css={css`
        z-index: 99;
      `}
    >
      <Menu.Item key="1">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          css={css`
            z-index: 99;
          `}
          onClick={() => {
            setMenu('wait');
            setIsModalVisible(true);
          }}
        >
          <div>ออเดอร์รอการยืนยัน</div>
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => {
            setMenu('form');
            setIsModalVisible(true);
          }}
        >
          <div>ฟอร์มความช่วยเหลือ</div>
        </div>
      </Menu.Item>
    </Menu>
  );

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      senderUserId: window.localStorage.getItem('id'),
      receiverUserId: user?.userId,
      messageText: newMessage
    };

    try {
      addMessage(pathname?.split('/')[2], message).then((res) => {
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
            senderUserId: window.localStorage.getItem('id'),
            receiverUserId: user?.userId,
            media: res.data
          };

          setMessages((messages) => [
            ...messages,
            {
              senderUserId: window.localStorage.getItem('id'),
              receiverUserId: user?.userId,
              media: res.data,
              createdBy: window.localStorage.getItem('id')
            }
          ]);

          addMessage(pathname?.split('/')[2], message);
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
    // if (window.localStorage.getItem('id')) {
    getChats(window.localStorage.getItem('id')).then((res) => {
      setChats(res.data);
    });
    if (query !== undefined) {
      getChat(pathname?.split('/')[2]).then((res) =>
        setMessages(res.data[0].messages)
      );
    }
    // }
  }, []);

  useEffect(() => {
    const doc = firestore
      .collection('chats')
      .doc(pathname?.split('/')[2])
      .collection('messages');

    const observer = doc.onSnapshot(
      async (docSnapshot) => {
        // if (pathname?.split('/')[2]) {
        await updateReadStatus(pathname?.split('/')[2], {
          senderUserId: window.localStorage.getItem('id')
        });

        //   if (pathname?.split('/')[2] === query) {
        await getChat(pathname?.split('/')[2]).then((res) =>
          setMessages(res.data[0].messages)
        );
        // }
        // }
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );

    return () => observer();
  }, [query]);

  // useEffect(() => {
  //   if (query && chats?.length > 0) {
  //     const messages =
  //       chats.length > 0
  //         ? chats.filter(({ chatId }) => chatId === query)[0].messages
  //         : [];
  //     setMessages(messages);
  //     setCurrentChat(query);

  //     // const currentChatRoom =
  //     //   chats.length > 0
  //     //     ? chats.filter(({ chatId }) => chatId === query)[0]
  //     //     : undefined;
  //     // const anotherUser = currentChatRoom?.users.filter(
  //     //   (items) => items !== window.localStorage.getItem('id')
  //     // );

  //     // getUser(anotherUser);
  //   }
  // }, [query, chats]);

  useEffect(() => {
    if (query) {
      setCurrentChat(pathname?.split('/')[2]);
      getWaitConfirmOrder(query).then((res) => setOrders(res.data));

      const currentChatRoom = chats?.filter(
        ({ chatId }) => chatId === query
      )[0];
      const anotherUser = currentChatRoom?.users.filter(
        (items) => items !== window.localStorage.getItem('id')
      );
      getUser(anotherUser);
      getChat(pathname?.split('/')[2]).then((res) =>
        setMessages(res.data[0].messages)
      );
    }
  }, [query, chats]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <WrapperContainer
      css={css`
        top: 210px;
        overflow-y: unset;
        padding: 0 20px !important;
        height: calc(100% - 230px);
        position: relative;

        ${mediaQueryLargeDesktop} {
          top: 165px;
          padding: 0px 20px !important;
          height: calc(100% - 185px);
        }

        ${mediaQueryMiniDesktop} {
          height: calc(100% - 175px);
        }

        ${mediaQueryTablet} {
          top: 80px;
          padding: 10px 10px 0px !important;
          height: calc(100% - 100px);
        }

        ${mediaQueryMobile} {
          top: 65px;
          padding: 8px 8px 0px !important;
          height: calc(100% - 70px);
        }
      `}
    >
      {chats ? (
        <React.Fragment>
          <MessengerContainer>
            <ChatMenu>
              <ChatMenuWrapper>
                {chats?.map((c) => (
                  <div
                    onClick={() => {
                      setCurrentChat(c);
                      history.push(`/chat/${c.chatId}`);

                      updateReadStatus(c.chatId, {
                        senderUserId: window.localStorage.getItem('id')
                      });
                    }}
                  >
                    <Conversation
                      conversation={c}
                      username={c.user.username}
                      imageUrl={c.user.imageUrl}
                      currentUser={window.localStorage.getItem('id')}
                    />
                  </div>
                ))}
              </ChatMenuWrapper>
            </ChatMenu>
            <ChatBox>
              <ChatBoxWrapper>
                {currentChat && users ? (
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
                          <UserName
                            onClick={() =>
                              history.push(`/profile/${user?.userId}`)
                            }
                          >
                            {user?.username}
                          </UserName>
                        </div>
                        {!isMobile && (
                          <RequestForm onClick={() => setIsModalVisible(true)}>
                            ฟอร์มการช่วยเหลือ
                          </RequestForm>
                        )}
                        {isMobile && (
                          <Dropdown.Button
                            icon={<MoreOutlined />}
                            overlay={dropDownMenu}
                            trigger={['click']}
                            css={css`
                              position: absolute;
                              z-index: 8;
                              top: 40px;
                              color: #0000;
                              right: 25px;

                              .ant-dropdown-trigger {
                                border: none;
                                z-index: 8;
                              }

                              .ant-dropdown-menu {
                                z-index: 8;
                              }

                              .ant-dropdown
                                .ant-dropdown-placement-bottomRight {
                                z-index: 8;
                                top: 570px;
                              }

                              .ant-dropdown-trigger > span {
                                background-color: white !important;
                                z-index: 8;
                              }

                              .ant-dropdown-menu-item,
                              .ant-dropdown-menu-submenu-title {
                                z-index: 8;
                              }

                              &:selection {
                                color: #fff;
                                z-index: 8;
                                background: transparent;
                              }

                              svg {
                                font-size: 24px;
                              }

                              ${mediaQueryTablet} {
                                svg {
                                  font-size: 22px;
                                }
                              }

                              ${mediaQueryMobile} {
                                right: 8px;
                                top: 10px;

                                svg {
                                  font-size: 17px;
                                }
                              }
                            `}
                          />
                        )}
                      </LeftInnerContainer>
                    </TopBar>
                    <ChatBoxTop>
                      <div
                        css={css`
                          z-index: 9;
                        `}
                      ></div>
                      {messages ? (
                        messages.map((m) => (
                          <div
                            ref={scrollRef}
                            css={css`
                              z-index: 2;
                            `}
                          >
                            <Message
                              message={m}
                              anotherUserImg={user?.imageUrl}
                              own={Boolean(
                                m.createdBy ===
                                  window.localStorage.getItem('id')
                              )}
                              css={css`
                                z-index: 2;
                              `}
                            />
                          </div>
                        ))
                      ) : (
                        <Loading />
                      )}
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
                      <Flex
                        itemAlign="center"
                        width="20%"
                        justify="center"
                        css={css`
                          z-index: 9;
                        `}
                      >
                        <Upload showUploadList={false} onChange={handleChange}>
                          <PictureFilled
                            css={css`
                              font-size: 32px;
                              margin-right: 15px;
                              cursor: pointer;
                              z-index: 9;

                              ${mediaQueryLargeDesktop} {
                                font-size: 32px;
                              }

                              ${mediaQueryTablet} {
                                font-size: 25px;
                                margin-left: 10px;
                              }

                              ${mediaQueryMobile} {
                                font-size: 20px;
                              }
                            `}
                          />
                        </Upload>
                        <ChatSubmitButton onClick={handleSubmit}>
                          ส่ง
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
            {!isMobile && (
              <ChatOnline>
                <ChatOnlineWrapper>
                  <WaitingToConfirmOrders
                    waitConfirmOrder={orders}
                    setWaitConfirmOrder={setOrders}
                  />
                </ChatOnlineWrapper>
              </ChatOnline>
            )}
          </MessengerContainer>
          <Modal
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            maskClosable={false}
            centered
            css={css`
              width: 36% !important;

              .ant-modal-content {
                height: 950px !important;
              }

              .ant-form-item-control-input {
                width: 100% !important;
              }

              .ant-modal-body {
                height: 100%;
              }

              ${mediaQueryLargeDesktop} {
                width: 600px !important;

                .ant-modal-content {
                  height: 700px !important;
                }
              }

              ${mediaQueryTablet} {
                width: 500px !important;

                .ant-modal-content {
                  height: 700px !important;
                }
              }

              ${mediaQueryMobile} {
                width: 85% !important;

                .ant-modal-content {
                  height: 600px !important;
                  overflow-y: scroll;
                }
              }

              .ant-col-16 {
                max-width: unset;
              }
            `}
          >
            {menu === 'form' ? (
              <OrderForm
                data={state}
                setIsModalVisible={setIsModalVisible}
                setOrder={setOrders}
              />
            ) : (
              <WaitingToConfirmOrders
                waitConfirmOrder={orders}
                setWaitConfirmOrder={setOrders}
              />
            )}
          </Modal>
        </React.Fragment>
      ) : (
        <Loading height="calc(100vh - 285px)" />
      )}
    </WrapperContainer>
  );
});
