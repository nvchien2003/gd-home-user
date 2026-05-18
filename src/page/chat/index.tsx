
import { useState } from 'react';
import { Search, Send, MoreVertical, Phone, Video } from 'lucide-react';

interface MessagePreview {
  id: number;
  user: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  avatar: string;
}

const MESSAGES: MessagePreview[] = [
  { id: 1, user: "Sarah Jenkins", lastMessage: "Is the villa available for next weekend?", time: "2h ago", unread: true, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" },
  { id: 2, user: "Michael Chen", lastMessage: "Great, thanks for the info!", time: "1d ago", unread: false, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" },
  { id: 3, user: "Support", lastMessage: "Your booking #12345 has been confirmed.", time: "3d ago", unread: false, avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" },
];
export default function ChatPage() {
  const [activeChat, setActiveChat] = useState(MESSAGES[0]);
  const [newMessage, setNewMessage] = useState('');

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
          {MESSAGES.map((msg) => (
            <div 
              key={msg.id} 
              onClick={() => setActiveChat(msg)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors ${activeChat.id === msg.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : 'border-l-4 border-l-transparent'}`}
            >
              <div className="flex gap-3">
                <div className="relative flex-shrink-0">
                  <img src={msg.avatar} alt={msg.user} className="w-12 h-12 rounded-full object-cover" />
                  {msg.unread && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className={`font-medium truncate ${msg.unread ? 'text-gray-900 font-bold' : 'text-gray-700'}`}>{msg.user}</h3>
                    <span className="text-xs text-gray-400 flex-shrink-0">{msg.time}</span>
                  </div>
                  <p className={`text-sm truncate ${msg.unread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{msg.lastMessage}</p>
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
             <img src={activeChat.avatar} alt={activeChat.user} className="w-10 h-10 rounded-full object-cover" />
             <div>
               <h2 className="font-bold text-gray-900">{activeChat.user}</h2>
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
             <span className="bg-gray-200 text-gray-500 text-xs py-1 px-3 rounded-full">Yesterday</span>
           </div>
           
           <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm max-w-md text-gray-800">
                <p>Hello! I was wondering if the property is still available for the dates I selected?</p>
                <span className="text-xs text-gray-400 mt-1 block">10:30 AM</span>
              </div>
           </div>

           <div className="flex justify-end">
              <div className="bg-indigo-600 p-4 rounded-2xl rounded-tr-none shadow-sm max-w-md text-white">
                <p>Hi there! Yes, it is currently available. Would you like to schedule a viewing?</p>
                <span className="text-xs text-indigo-200 mt-1 block">10:45 AM</span>
              </div>
           </div>
           
           <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm max-w-md text-gray-800">
                <p>That would be great! Is Saturday at 2pm okay?</p>
                <span className="text-xs text-gray-400 mt-1 block">11:00 AM</span>
              </div>
           </div>
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
              />
              <button className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                <Send className="h-5 w-5" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
