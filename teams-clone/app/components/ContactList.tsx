"use client";

import { Contact } from "../types";

interface ContactListProps {
  contacts: Contact[];
  activeContact: string;
  setActiveContact: (contactId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function ContactList({
  contacts,
  activeContact,
  setActiveContact,
  searchQuery,
  setSearchQuery,
}: ContactListProps) {
  return (
    <div className="w-1/3 bg-[#e5ddd5] flex flex-col border-r border-gray-200">
      {/* Header */}
      <div className="bg-[#008069] p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 font-semibold">
            👤
          </div>
          <h1 className="text-white text-lg font-semibold">WhatsApp</h1>
        </div>
        <div className="flex space-x-3 text-white">
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

      {/* Search */}
      <div className="p-2 bg-[#f0f2f5]">
        <div className="bg-white rounded-lg px-3 py-2 flex items-center">
          <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-500 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p>No chats found</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setActiveContact(contact.id)}
              className={`flex items-center px-4 py-3 cursor-pointer border-b border-gray-200 transition-colors ${
                activeContact === contact.id ? "bg-[#f0f2f5]" : "hover:bg-[#f5f6f6]"
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl">
                  {contact.avatar}
                </div>
                {contact.status === "online" && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-gray-900 font-medium truncate">{contact.name}</h3>
                  <span className="text-xs text-gray-500">10:30 AM</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-500 truncate">Hello! How are you?</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
