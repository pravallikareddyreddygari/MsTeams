"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { Team, Channel, ChatMessage } from "./types";

const teams: Team[] = [
  { id: "t1", name: "Development Team", icon: "💻" },
  { id: "t2", name: "Design Team", icon: "🎨" },
  { id: "t3", name: "Product Team", icon: "🚀" },
];

const channels: Channel[] = [
  { id: "c1", teamId: "t1", name: "general", type: "standard" },
  { id: "c2", teamId: "t1", name: "frontend", type: "standard" },
  { id: "c3", teamId: "t1", name: "backend", type: "standard" },
  { id: "c4", teamId: "t2", name: "general", type: "standard" },
  { id: "c5", teamId: "t3", name: "general", type: "standard" },
];

const initialMessages: ChatMessage[] = [
  { id: "m1", channelId: "c1", sender: "Alice", text: "Hello everyone! Welcome to the Development Team channel.", timestamp: "2026-02-21T10:00:00.000Z", isRead: true },
  { id: "m2", channelId: "c1", sender: "Bob", text: "Hi Alice! Great to be here. 👋", timestamp: "2026-02-21T10:05:00.000Z", isRead: true },
  { id: "m3", channelId: "c1", sender: "Charlie", text: "Hey all! Looking forward to working together.", timestamp: "2026-02-21T10:10:00.000Z", isRead: true },
  { id: "m4", channelId: "c1", sender: "Alice", text: "We have a lot of exciting projects coming up this quarter.", timestamp: "2026-02-21T10:15:00.000Z", isRead: true },
  { id: "m5", channelId: "c1", sender: "Bob", text: "That sounds great! What's the first project?", timestamp: "2026-02-21T10:20:00.000Z", isRead: true },
  { id: "m6", channelId: "c1", sender: "Alice", text: "We're starting with the new customer portal. It will be built using React and TypeScript.", timestamp: "2026-02-21T10:25:00.000Z", isRead: true },
  { id: "m7", channelId: "c1", sender: "Charlie", text: "I've been working on the design system for this.", timestamp: "2026-02-21T10:30:00.000Z", isRead: true },
  { id: "m8", channelId: "c1", sender: "Alice", text: "Perfect! Let's make sure we coordinate on that.", timestamp: "2026-02-21T10:35:00.000Z", isRead: true },
  { id: "m9", channelId: "c1", sender: "Bob", text: "I'll start setting up the project structure today.", timestamp: "2026-02-21T10:40:00.000Z", isRead: true },
  { id: "m10", channelId: "c1", sender: "Charlie", text: "I'll share the design files with you.", timestamp: "2026-02-21T10:45:00.000Z", isRead: true },
  { id: "m11", channelId: "c1", sender: "Alice", text: "Great! Let's have a quick sync-up tomorrow at 10 AM.", timestamp: "2026-02-21T10:50:00.000Z", isRead: true },
  { id: "m12", channelId: "c1", sender: "Bob", text: "Sounds good to me.", timestamp: "2026-02-21T10:55:00.000Z", isRead: true },
  { id: "m13", channelId: "c1", sender: "Charlie", text: "Count me in as well.", timestamp: "2026-02-21T11:00:00.000Z", isRead: true },
  { id: "m14", channelId: "c2", sender: "David", text: "Need review on PR #42 for the login component.", timestamp: "2026-02-21T11:05:00.000Z", isRead: true },
  { id: "m15", channelId: "c2", sender: "Eve", text: "I'll take a look at it right away.", timestamp: "2026-02-21T11:10:00.000Z", isRead: true },
  { id: "m16", channelId: "c2", sender: "David", text: "Thanks! It's related to the responsive design fixes.", timestamp: "2026-02-21T11:15:00.000Z", isRead: true },
  { id: "m17", channelId: "c2", sender: "Eve", text: "Looks good! Just a few minor suggestions.", timestamp: "2026-02-21T11:20:00.000Z", isRead: true },
  { id: "m18", channelId: "c2", sender: "David", text: "Sure, I'll make those changes.", timestamp: "2026-02-21T11:25:00.000Z", isRead: true },
  { id: "m19", channelId: "c3", sender: "Frank", text: "Backend API is ready for testing.", timestamp: "2026-02-21T11:30:00.000Z", isRead: true },
  { id: "m20", channelId: "c3", sender: "Grace", text: "I'll run the integration tests now.", timestamp: "2026-02-21T11:35:00.000Z", isRead: true },
  { id: "m21", channelId: "c3", sender: "Frank", text: "Let me know if you encounter any issues.", timestamp: "2026-02-21T11:40:00.000Z", isRead: true },
  { id: "m22", channelId: "c3", sender: "Grace", text: "All tests passing! 🎉", timestamp: "2026-02-21T11:45:00.000Z", isRead: true },
  { id: "m23", channelId: "c3", sender: "Frank", text: "Awesome! Ready to deploy then.", timestamp: "2026-02-21T11:50:00.000Z", isRead: true },
  { id: "m33", channelId: "c1", sender: "You", text: "Hello everyone! How's everyone doing today?", timestamp: "2026-02-22T11:55:00.000Z", isRead: true },
  { id: "m34", channelId: "c1", sender: "Alice", text: "I'm good! Just finished a task.", timestamp: "2026-02-22T12:00:00.000Z", isRead: false },
  { id: "m35", channelId: "c2", sender: "Bob", text: "Can you review my PR?", timestamp: "2026-02-22T12:05:00.000Z", isRead: false },
];

export default function TeamsApp() {
  const [activeTeam, setActiveTeam] = useState<string>("t1");
  const [activeChannel, setActiveChannel] = useState<string>("c1");
  const [activeTab, setActiveTab] = useState<"chat" | "activity" | "calls" | "files">("chat");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: `m${Date.now()}`,
      channelId: activeChannel,
      sender: "You",
      text: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    setTimeout(() => {
      const responders = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Diana", "Henry", "Ivy"];
      const randomResponder = responders[Math.floor(Math.random() * responders.length)];
      const responses = [
        "That's great to hear!",
        "I agree with you.",
        "Let me know if you need help.",
        "Sounds good to me!",
        "I'll check on that.",
        "Good point!",
        "Can you elaborate more?",
        "I'm working on that right now.",
        "Let's discuss this in the meeting.",
        "Thanks for the update!",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const responseMessage: ChatMessage = {
        id: `m${Date.now() + 1}`,
        channelId: activeChannel,
        sender: randomResponder,
        text: randomResponse,
        timestamp: new Date().toISOString(),
        isRead: false,
      };

      setMessages((prev) => [...prev, responseMessage]);
    }, 1000 + Math.random() * 2000);
  };

  const filteredChannels = channels.filter(c => c.teamId === activeTeam);
  const currentChannelMessages = messages.filter(m => m.channelId === activeChannel);

  return (
    <div className="flex h-screen bg-[#f3f2f1] text-gray-900">
      <Sidebar
        teams={teams}
        activeTeam={activeTeam}
        activeChannel={activeChannel}
        activeTab={activeTab}
        messages={messages}
        setActiveTeam={setActiveTeam}
        setActiveChannel={setActiveChannel}
        setActiveTab={setActiveTab}
      />

      <Chat
        channel={filteredChannels.find(c => c.id === activeChannel)}
        messages={currentChannelMessages}
        onSendMessage={handleSendMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        activeTab={activeTab}
      />
    </div>
  );
}
