"use client";

import { useState } from "react";
import ContactList from "./components/ContactList";
import ChatWindow from "./components/ChatWindow";
import { Contact, Message } from "./types";

const contacts: Contact[] = [
  { id: "u1", name: "Alice Johnson", avatar: "👩‍💻", status: "online" },
  { id: "u2", name: "Bob Smith", avatar: "👨‍🎨", status: "offline" },
  { id: "u3", name: "Charlie Brown", avatar: "🚀", status: "online" },
  { id: "u4", name: "Diana Prince", avatar: "✨", status: "away" },
  { id: "u5", name: "Eve Wilson", avatar: "🎨", status: "online" },
];

const messages: Message[] = [
  { id: "m1", contactId: "u1", sender: "Alice", text: "Hey there! 👋", timestamp: new Date(Date.now() - 3600000).toISOString(), isRead: true },
  { id: "m2", contactId: "u1", sender: "You", text: "Hi Alice! Long time no see. How are you?", timestamp: new Date(Date.now() - 3500000).toISOString(), isRead: true },
  { id: "m3", contactId: "u1", sender: "Alice", text: "I'm doing great! Just finished a project. 🎉", timestamp: new Date(Date.now() - 3400000).toISOString(), isRead: true },
  { id: "m4", contactId: "u1", sender: "Alice", text: "Want to catch up over coffee this weekend?", timestamp: new Date(Date.now() - 3300000).toISOString(), isRead: true },
  { id: "m5", contactId: "u2", sender: "Bob", text: "Did you get my last message?", timestamp: new Date(Date.now() - 1800000).toISOString(), isRead: false },
  { id: "m6", contactId: "u2", sender: "Bob", text: "We need to discuss the design changes.", timestamp: new Date(Date.now() - 1700000).toISOString(), isRead: false },
  { id: "m7", contactId: "u3", sender: "Charlie", text: "Meeting reminder: 3 PM today 📅", timestamp: new Date(Date.now() - 900000).toISOString(), isRead: true },
  { id: "m8", contactId: "u3", sender: "Charlie", text: "Don't forget to bring your laptop!", timestamp: new Date(Date.now() - 800000).toISOString(), isRead: true },
  { id: "m9", contactId: "u4", sender: "Diana", text: "Sent you the files. Check your email! 📎", timestamp: new Date(Date.now() - 600000).toISOString(), isRead: true },
  { id: "m10", contactId: "u5", sender: "Eve", text: "Happy Sunday! 🌞", timestamp: new Date(Date.now() - 300000).toISOString(), isRead: true },
  { id: "m11", contactId: "u5", sender: "Eve", text: "Hope you have a great day!", timestamp: new Date(Date.now() - 200000).toISOString(), isRead: true },
];

export default function WhatsAppApp() {
  const [activeContact, setActiveContact] = useState<string>("u1");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `m${Date.now()}`,
      contactId: activeContact,
      sender: "You",
      text: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    messages.push(message);
    setNewMessage("");
  };

  const getUnreadCount = (contactId: string) => {
    return messages.filter((m) => m.contactId === contactId && m.sender !== "You" && !m.isRead).length;
  };

  const getLastMessage = (contactId: string) => {
    const contactMessages = messages.filter((m) => m.contactId === contactId);
    if (contactMessages.length === 0) return "";
    const lastMessage = contactMessages[contactMessages.length - 1];
    return lastMessage.text;
  };

  const getLastMessageTime = (contactId: string) => {
    const contactMessages = messages.filter((m) => m.contactId === contactId);
    if (contactMessages.length === 0) return "";
    const lastMessage = contactMessages[contactMessages.length - 1];
    return new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeContactInfo = contacts.find((c) => c.id === activeContact);
  const activeContactMessages = messages.filter((m) => m.contactId === activeContact);

  return (
    <div className="flex h-screen bg-[#008069]">
      <ContactList
        contacts={filteredContacts}
        activeContact={activeContact}
        setActiveContact={setActiveContact}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        getUnreadCount={getUnreadCount}
        getLastMessage={getLastMessage}
        getLastMessageTime={getLastMessageTime}
      />

      <ChatWindow
        contact={activeContactInfo}
        messages={activeContactMessages}
        onSendMessage={handleSendMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
    </div>
  );
}
