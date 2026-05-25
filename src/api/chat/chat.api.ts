import axiosClient from "../axios";
import { unwrapData } from "../api.types";
import type { ChatMessage, Conversation, SendMessagePayload } from "./chat.interface";

export const ChatApi = {
  getConversations: async () => {
    const response = await axiosClient.get("/chat/conversations");
    return unwrapData<Conversation[]>(response);
  },

  getMessages: async (conversationId: string | number) => {
    const response = await axiosClient.get(`/chat/conversations/${conversationId}/messages`);
    return unwrapData<ChatMessage[]>(response);
  },

  sendMessage: async (conversationId: string | number, payload: SendMessagePayload) => {
    const response = await axiosClient.post(`/chat/conversations/${conversationId}/messages`, payload);
    return unwrapData<ChatMessage>(response);
  },
};
