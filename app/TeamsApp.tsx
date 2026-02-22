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

const messages: ChatMessage[] = [
  { id: "m1", channelId: "c1", sender: "Alice", text: "Hello everyone! Welcome to the Development Team channel.", timestamp: new Date(Date.now() - 86400000).toISOString() },
  { id: "m2", channelId: "c1", sender: "Bob", text: "Hi Alice! Great to be here. 👋", timestamp: new Date(Date.now() - 86300000).toISOString() },
  { id: "m3", channelId: "c1", sender: "Charlie", text: "Hey all! Looking forward to working together.", timestamp: new Date(Date.now() - 86200000).toISOString() },
  { id: "m4", channelId: "c1", sender: "Alice", text: "We have a lot of exciting projects coming up this quarter.", timestamp: new Date(Date.now() - 7200000).toISOString() },
  { id: "m5", channelId: "c1", sender: "Bob", text: "That sounds great! What's the first project?", timestamp: new Date(Date.now() - 7100000).toISOString() },
  { id: "m6", channelId: "c1", sender: "Alice", text: "We're starting with the new customer portal. It will be built using React and TypeScript.", timestamp: new Date(Date.now() - 7000000).toISOString() },
  { id: "m7", channelId: "c1", sender: "Charlie", text: "I've been working on the design system for this.", timestamp: new Date(Date.now() - 6900000).toISOString() },
  { id: "m8", channelId: "c1", sender: "Alice", text: "Perfect! Let's make sure we coordinate on that.", timestamp: new Date(Date.now() - 6800000).toISOString() },
  { id: "m9", channelId: "c1", sender: "Bob", text: "I'll start setting up the project structure today.", timestamp: new Date(Date.now() - 6700000).toISOString() },
  { id: "m10", channelId: "c1", sender: "Charlie", text: "I'll share the design files with you.", timestamp: new Date(Date.now() - 6600000).toISOString() },
  { id: "m11", channelId: "c1", sender: "Alice", text: "Great! Let's have a quick sync-up tomorrow at 10 AM.", timestamp: new Date(Date.now() - 6500000).toISOString() },
  { id: "m12", channelId: "c1", sender: "Bob", text: "Sounds good to me.", timestamp: new Date(Date.now() - 6400000).toISOString() },
  { id: "m13", channelId: "c1", sender: "Charlie", text: "Count me in as well.", timestamp: new Date(Date.now() - 6300000).toISOString() },
  { id: "m14", channelId: "c2", sender: "David", text: "Need review on PR #42 for the login component.", timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: "m15", channelId: "c2", sender: "Eve", text: "I'll take a look at it right away.", timestamp: new Date(Date.now() - 3500000).toISOString() },
  { id: "m16", channelId: "c2", sender: "David", text: "Thanks! It's related to the responsive design fixes.", timestamp: new Date(Date.now() - 3400000).toISOString() },
  { id: "m17", channelId: "c2", sender: "Eve", text: "Looks good! Just a few minor suggestions.", timestamp: new Date(Date.now() - 3300000).toISOString() },
  { id: "m18", channelId: "c2", sender: "David", text: "Sure, I'll make those changes.", timestamp: new Date(Date.now() - 3200000).toISOString() },
  { id: "m19", channelId: "c3", sender: "Frank", text: "Backend API is ready for testing.", timestamp: new Date(Date.now() - 1800000).toISOString() },
  { id: "m20", channelId: "c3", sender: "Grace", text: "I'll run the integration tests now.", timestamp: new Date(Date.now() - 1700000).toISOString() },
  { id: "m21", channelId: "c3", sender: "Frank", text: "Let me know if you encounter any issues.", timestamp: new Date(Date.now() - 1600000).toISOString() },
  { id: "m22", channelId: "c3", sender: "Grace", text: "All tests passing! 🎉", timestamp: new Date(Date.now() - 1500000).toISOString() },
  { id: "m23", channelId: "c3", sender: "Frank", text: "Awesome! Ready to deploy then.", timestamp: new Date(Date.now() - 1400000).toISOString() },
  { id: "m24", channelId: "c4", sender: "Diana", text: "Design system update ready for review.", timestamp: new Date(Date.now() - 900000).toISOString() },
  { id: "m25", channelId: "c4", sender: "Eve", text: "I'll check it out in a bit.", timestamp: new Date(Date.now() - 800000).toISOString() },
  { id: "m26", channelId: "c4", sender: "Diana", text: "The new color palette looks great.", timestamp: new Date(Date.now() - 700000).toISOString() },
  { id: "m27", channelId: "c4", sender: "Eve", text: "Yes, much cleaner than before.", timestamp: new Date(Date.now() - 600000).toISOString() },
  { id: "m28", channelId: "c4", sender: "Diana", text: "I'll update the documentation as well.", timestamp: new Date(Date.now() - 500000).toISOString() },
  { id: "m29", channelId: "c5", sender: "Henry", text: "Product roadmap update for next quarter.", timestamp: new Date(Date.now() - 400000).toISOString() },
  { id: "m30", channelId: "c5", sender: "Ivy", text: "Can we schedule a meeting to discuss?", timestamp: new Date(Date.now() - 300000).toISOString() },
  { id: "m31", channelId: "c5", sender: "Henry", text: "Sure, I'll set up a calendar invite.", timestamp: new Date(Date.now() - 200000).toISOString() },
  { id: "m32", channelId: "c5", sender: "Ivy", text: "Thanks! Looking forward to it.", timestamp: new Date(Date.now() - 100000).toISOString() },
  { id: "m33", channelId: "c1", sender: "You", text: "Hello everyone! How's everyone doing today?", timestamp: new Date().toISOString() },
];

export default function TeamsApp() {
  const [activeTeam, setActiveTeam] = useState<string>("t1");
  const [activeChannel, setActiveChannel] = useState<string>("c1");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "m1", channelId: "c1", sender: "Alice", text: "Hello everyone! Welcome to the Development Team channel.", timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: "m2", channelId: "c1", sender: "Bob", text: "Hi Alice! Great to be here. 👋", timestamp: new Date(Date.now() - 86300000).toISOString() },
    { id: "m3", channelId: "c1", sender: "Charlie", text: "Hey all! Looking forward to working together.", timestamp: new Date(Date.now() - 86200000).toISOString() },
    { id: "m4", channelId: "c1", sender: "Alice", text: "We have a lot of exciting projects coming up this quarter.", timestamp: new Date(Date.now() - 7200000).toISOString() },
    { id: "m5", channelId: "c1", sender: "Bob", text: "That sounds great! What's the first project?", timestamp: new Date(Date.now() - 7100000).toISOString() },
    { id: "m6", channelId: "c1", sender: "Alice", text: "We're starting with the new customer portal. It will be built using React and TypeScript.", timestamp: new Date(Date.now() - 7000000).toISOString() },
    { id: "m7", channelId: "c1", sender: "Charlie", text: "I've been working on the design system for this.", timestamp: new Date(Date.now() - 6900000).toISOString() },
    { id: "m8", channelId: "c1", sender: "Alice", text: "Perfect! Let's make sure we coordinate on that.", timestamp: new Date(Date.now() - 6800000).toISOString() },
    { id: "m9", channelId: "c1", sender: "Bob", text: "I'll start setting up the project structure today.", timestamp: new Date(Date.now() - 6700000).toISOString() },
    { id: "m10", channelId: "c1", sender: "Charlie", text: "I'll share the design files with you.", timestamp: new Date(Date.now() - 6600000).toISOString() },
    { id: "m11", channelId: "c1", sender: "Alice", text: "Great! Let's have a quick sync-up tomorrow at 10 AM.", timestamp: new Date(Date.now() - 6500000).toISOString() },
    { id: "m12", channelId: "c1", sender: "Bob", text: "Sounds good to me.", timestamp: new Date(Date.now() - 6400000).toISOString() },
    { id: "m13", channelId: "c1", sender: "Charlie", text: "Count me in as well.", timestamp: new Date(Date.now() - 6300000).toISOString() },
    { id: "m14", channelId: "c2", sender: "David", text: "Need review on PR #42 for the login component.", timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: "m15", channelId: "c2", sender: "Eve", text: "I'll take a look at it right away.", timestamp: new Date(Date.now() - 3500000).toISOString() },
    { id: "m16", channelId: "c2", sender: "David", text: "Thanks! It's related to the responsive design fixes.", timestamp: new Date(Date.now() - 3400000).toISOString() },
    { id: "m17", channelId: "c2", sender: "Eve", text: "Looks good! Just a few minor suggestions.", timestamp: new Date(Date.now() - 3300000).toISOString() },
    { id: "m18", channelId: "c2", sender: "David", text: "Sure, I'll make those changes.", timestamp: new Date(Date.now() - 3200000).toISOString() },
    { id: "m19", channelId: "c3", sender: "Frank", text: "Backend API is ready for testing.", timestamp: new Date(Date.now() - 1800000).toISOString() },
    { id: "m20", channelId: "c3", sender: "Grace", text: "I'll run the integration tests now.", timestamp: new Date(Date.now() - 1700000).toISOString() },
    { id: "m21", channelId: "c3", sender: "Frank", text: "Let me know if you encounter any issues.", timestamp: new Date(Date.now() - 1600000).toISOString() },
    { id: "m22", channelId: "c3", sender: "Grace", text: "All tests passing! 🎉", timestamp: new Date(Date.now() - 1500000).toISOString() },
    { id: "m23", channelId: "c3", sender: "Frank", text: "Awesome! Ready to deploy then.", timestamp: new Date(Date.now() - 1400000).toISOString() },
    { id: "m24", channelId: "c4", sender: "Diana", text: "Design system update ready for review.", timestamp: new Date(Date.now() - 900000).toISOString() },
    { id: "m25", channelId: "c4", sender: "Eve", text: "I'll check it out in a bit.", timestamp: new Date(Date.now() - 800000).toISOString() },
    { id: "m26", channelId: "c4", sender: "Diana", text: "The new color palette looks great.", timestamp: new Date(Date.now() - 700000).toISOString() },
    { id: "m27", channelId: "c4", sender: "Eve", text: "Yes, much cleaner than before.", timestamp: new Date(Date.now() - 600000).toISOString() },
    { id: "m28", channelId: "c4", sender: "Diana", text: "I'll update the documentation as well.", timestamp: new Date(Date.now() - 500000).toISOString() },
    { id: "m29", channelId: "c5", sender: "Henry", text: "Product roadmap update for next quarter.", timestamp: new Date(Date.now() - 400000).toISOString() },
    { id: "m30", channelId: "c5", sender: "Ivy", text: "Can we schedule a meeting to discuss?", timestamp: new Date(Date.now() - 300000).toISOString() },
    { id: "m31", channelId: "c5", sender: "Henry", text: "Sure, I'll set up a calendar invite.", timestamp: new Date(Date.now() - 200000).toISOString() },
    { id: "m32", channelId: "c5", sender: "Ivy", text: "Thanks! Looking forward to it.", timestamp: new Date(Date.now() - 100000).toISOString() },
    { id: "m33", channelId: "c1", sender: "You", text: "Hello everyone! How's everyone doing today?", timestamp: new Date().toISOString() },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: `m${Date.now()}`,
      channelId: activeChannel,
      sender: "You",
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Auto-response after random delay
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
        setActiveTeam={setActiveTeam}
        setActiveChannel={setActiveChannel}
      />

      <Chat
        channel={filteredChannels.find(c => c.id === activeChannel)}
        messages={currentChannelMessages}
        onSendMessage={handleSendMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
    </div>
  );
}
