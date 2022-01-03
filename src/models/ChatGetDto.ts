export type MessageDto = {
  id: string;
  sentAt: string;
  userId: string;
  readStatus: string;
  readAt: string;
  messageText: string;
};

export type ChatUserDto = {
  id: string;
  lastMessage: string;
};

export type ProvideGetDto = {
  id: string;
  user: Array<ChatUserDto>;
  message: Array<MessageDto>;
};
