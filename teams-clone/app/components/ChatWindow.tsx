"use client";

import { Contact, Message } from "../types";
import { useRef, useEffect } from "react";

interface ChatWindowProps {
  contact: Contact | undefined;
  messages: Message[];
  onSendMessage: (e: React.FormEvent) => void;
  newMessage: string;
  setNewMessage: (message: string) => void;
}

export default function ChatWindow({
  contact,
  messages,
  onSendMessage,
  newMessage,
  setNewMessage,
}: ChatWindowProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col bg-[#efeae2]">
      {/* Chat Header */}
      <div className="bg-[#008069] p-3 flex items-center shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-xl">
            {contact?.avatar || "👤"}
          </div>
          <div>
            <h3 className="text-white font-semibold">{contact?.name || "Select a contact"}</h3>
            <p className="text-xs text-gray-200">
              {contact?.status === "online" ? "online" : "last seen today at 10:30 AM"}
            </p>
          </div>
        </div>
        <div className="ml-auto flex space-x-3 text-white">
          <button className="hover:text-gray-200">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </button>
          <button className="hover:text-gray-200">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
          <button className="hover:text-gray-200">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v2H6v2h12v-2h-4v-2h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H4V4h16v10z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
        style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", backgroundRepeat: "repeat", backgroundSize: "400px" }}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <p className="text-center">Messages are end-to-end encrypted</p>
            <p className="text-center text-sm">No one outside of this chat can read or listen to them</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-3 py-2 shadow-sm ${
                  message.sender === "You"
                    ? "bg-[#d9fdd3] rounded-tr-none"
                    : "bg-white rounded-tl-none"
                }`}
              >
                <p className="text-gray-800 text-sm">{message.text}</p>
                <div className="flex items-center justify-end space-x-1 mt-1">
                  <span className="text-[10px] text-gray-500">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {message.sender === "You" && (
                    <span className="text-gray-500">
                      {message.isRead ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.41 11.93 6 13.34l5.66 5.66 12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.41 11.93 6 13.34l5.66 5.66 12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
                        </svg>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="bg-[#f0f2f5] p-3 flex items-end space-x-2">
        <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-full">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15 12c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3zm-9-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm18 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-9 8c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
          </svg>
        </button>
        <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-full">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.97 16.95L10 13.87V4h2v8.76l4.03 2.84c.69.48.77 1.51.18 2.03-.58.53-1.61.4-2.18-.27zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.84 1.84 3.18 3.18 1.83-1.83zM3 5.27L5.27 3l1.84 1.84L4.84 7.07 3 5.27zM19 19H5V5h14v14z" />
          </svg>
        </button>
        <div className="flex-1 relative">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a884] focus:border-transparent resize-none min-h-[44px] max-h-32 bg-white"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSendMessage(e);
              }
            }}
          />
        </div>
        <button
          type="submit"
          onClick={onSendMessage}
          disabled={!newMessage.trim()}
          className="p-3 bg-[#00a884] text-white rounded-full hover:bg-[#008f6f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
