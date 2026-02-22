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
  { id: "m1", contactId: "u1", sender: "Alice", text: "Hello! How are you?", timestamp: new Date(Date.now() - 3600000).toISOString(), isRead: true },
  { id: "m2", contactId: "u1", sender: "You", text: "I'm good, thanks! Working on the new feature.", timestamp: new Date(Date.now() - 3500000).toISOString(), isRead: true },
  { id: "m3", contactId: "u1", sender: "Alice", text: "That sounds exciting! Let me know when you need a review.", timestamp: new Date(Date.now() - 3400000).toISOString(), isRead: true },
  { id: "m4", contactId: "u2", sender: "Bob", text: "Can we meet at 3 PM?", timestamp: new Date(Date.now() - 1800000).toISOString(), isRead: false },
  { id: "m5", contactId: "u3", sender: "Charlie", text: "Meeting started", timestamp: new Date(Date.now() - 900000).toISOString(), isRead: true },
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
