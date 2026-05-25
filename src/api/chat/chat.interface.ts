export interface Conversation {
  id: string | number;
  user?: string;
  title?: string;
  participantName?: string;
  lastMessage?: string;
  lastMessageAt?: string;
  time?: string;
  unread?: boolean;
  unreadCount?: number;
  avatar?: string;
  participantAvatar?: string;
}

export interface ChatMessage {
  id: string | number;
  conversationId?: string | number;
  content?: string;
  message?: string;
  senderId?: string | number;
  fromMe?: boolean;
  createdAt?: string;
  time?: string;
}

export interface SendMessagePayload {
  content: string;
}
