
import { useEffect, useMemo, useState } from 'react';
import { Search, Send, MoreVertical, Phone, Video } from 'lucide-react';
import { useChatConversationsQuery, useChatMessagesQuery, useSendMessageMutation } from '../../hook/api.hooks';
import type { Conversation } from '../../api/chat/chat.interface';

export default function ChatPage() {
  const { data: conversations = [], isLoading, isError } = useChatConversationsQuery();
  const [activeChat, setActiveChat] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const activeChatId = activeChat?.id ?? conversations[0]?.id;
  const { data: messages = [] } = useChatMessagesQuery(activeChatId);
  const sendMessage = useSendMessageMutation(activeChatId);
  const selectedChat = useMemo(
    () => conversations.find((conversation) => conversation.id === activeChatId) ?? activeChat ?? conversations[0],
    [activeChat, activeChatId, conversations],
  );

  useEffect(() => {
    if (!activeChat && conversations[0]) setActiveChat(conversations[0]);
  }, [activeChat, conversations]);

  const displayName = (conversation?: Conversation) =>
    conversation?.user ?? conversation?.participantName ?? conversation?.title ?? "Conversation";
  const displayAvatar = (conversation?: Conversation) =>
    conversation?.avatar ?? conversation?.participantAvatar ?? "/image/avatar.png";
  const displayTime = (value?: string) => value ? new Date(value).toLocaleString() : "";

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChatId) return;
    sendMessage.mutate({ content: newMessage.trim() });
    setNewMessage("");
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-white flex border-t border-gray-200">
      {/* Sidebar List */}
      <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 flex flex-col bg-gray-50">
        <div className="p-4 border-b border-gray-200 bg-white">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search messages" 
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg transition-all outline-none text-sm"
            />
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto">
          {isLoading && <p className="p-4 text-sm text-gray-500">Loading conversations...</p>}
          {isError && <p className="p-4 text-sm text-red-500">Unable to load conversations.</p>}
          {!isLoading && !isError && conversations.length === 0 && <p className="p-4 text-sm text-gray-500">No conversations.</p>}
          {conversations.map((msg) => (
            <div 
              key={msg.id} 
              onClick={() => setActiveChat(msg)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors ${activeChatId === msg.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : 'border-l-4 border-l-transparent'}`}
            >
              <div className="flex gap-3">
                <div className="relative flex-shrink-0">
                  <img src={displayAvatar(msg)} alt={displayName(msg)} className="w-12 h-12 rounded-full object-cover" />
                  {(msg.unread || Boolean(msg.unreadCount)) && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className={`font-medium truncate ${(msg.unread || Boolean(msg.unreadCount)) ? 'text-gray-900 font-bold' : 'text-gray-700'}`}>{displayName(msg)}</h3>
                    <span className="text-xs text-gray-400 flex-shrink-0">{msg.time ?? displayTime(msg.lastMessageAt)}</span>
                  </div>
                  <p className={`text-sm truncate ${(msg.unread || Boolean(msg.unreadCount)) ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{msg.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="hidden md:flex flex-col flex-grow bg-white">
        {/* Chat Header */}
        <div className="h-16 px-6 border-b border-gray-200 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <img src={displayAvatar(selectedChat)} alt={displayName(selectedChat)} className="w-10 h-10 rounded-full object-cover" />
             <div>
               <h2 className="font-bold text-gray-900">{displayName(selectedChat)}</h2>
               <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                 <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                 Online
               </p>
             </div>
           </div>
           <div className="flex items-center gap-4 text-gray-400">
             <button className="hover:text-indigo-600 transition-colors"><Phone className="h-5 w-5" /></button>
             <button className="hover:text-indigo-600 transition-colors"><Video className="h-5 w-5" /></button>
             <button className="hover:text-indigo-600 transition-colors"><MoreVertical className="h-5 w-5" /></button>
           </div>
        </div>

        {/* Messages */}
        <div className="flex-grow p-6 overflow-y-auto bg-gray-50 space-y-4">
           <div className="text-center">
             <span className="bg-gray-200 text-gray-500 text-xs py-1 px-3 rounded-full">Messages</span>
           </div>
           {messages.length === 0 && <p className="text-sm text-gray-500 text-center">No messages yet.</p>}
           {messages.map((message) => (
             <div key={message.id} className={`flex ${message.fromMe ? "justify-end" : "justify-start"}`}>
                <div className={`${message.fromMe ? "bg-indigo-600 rounded-tr-none text-white" : "bg-white rounded-tl-none text-gray-800"} p-4 rounded-2xl shadow-sm max-w-md`}>
                  <p>{message.content ?? message.message}</p>
                  <span className={`text-xs ${message.fromMe ? "text-indigo-200" : "text-gray-400"} mt-1 block`}>{message.time ?? displayTime(message.createdAt)}</span>
                </div>
             </div>
           ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
           <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-xl">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-grow bg-transparent px-4 py-2 outline-none text-gray-900"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
              />
              <button onClick={handleSendMessage} className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                <Send className="h-5 w-5" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
