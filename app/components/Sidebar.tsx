"use client";

import { Team, ChatMessage } from "../types";

interface SidebarProps {
  teams: Team[];
  activeTeam: string;
  activeChannel: string;
  activeTab: "chat" | "activity" | "calls" | "files";
  messages: ChatMessage[];
  setActiveTeam: (teamId: string) => void;
  setActiveChannel: (channelId: string) => void;
  setActiveTab: (tab: "chat" | "activity" | "calls" | "files") => void;
}

export default function Sidebar({
  teams,
  activeTeam,
  activeChannel,
  activeTab,
  messages,
  setActiveTeam,
  setActiveChannel,
  setActiveTab,
}: SidebarProps) {
  const getUnreadCount = (channelId: string) => {
    return messages.filter((m) => m.channelId === channelId && m.sender !== "You" && !m.isRead).length;
  };

  return (
    <div className="w-64 bg-[#1d2024] text-white flex flex-col">
      {/* Top Navigation */}
      <div className="p-3 flex items-center space-x-3 border-b border-[#2b2e33]">
        <div className="w-8 h-8 bg-[#0078d4] rounded flex items-center justify-center">
          <span className="font-bold text-sm">T</span>
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium">Teams</div>
          <div className="text-xs text-gray-400">Switch</div>
        </div>
        <button className="p-1 hover:bg-[#2b2e33] rounded">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </button>
      </div>

      {/* Chat Section */}
      <div className="p-2 border-b border-[#2b2e33]">
        <button
          onClick={() => setActiveTab("chat")}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded transition-colors ${
            activeTab === "chat" ? "bg-[#2b2e33]" : "hover:bg-[#2b2e33]"
          }`}
        >
          <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
          <span className="text-sm">Chat</span>
        </button>
      </div>

      {/* Teams Section */}
      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-3 py-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Teams</div>
          <div className="space-y-1">
            {teams.map((team) => (
              <button
                key={team.id}
                onClick={() => {
                  setActiveTeam(team.id);
                  setActiveChannel(teams.find(t => t.id === team.id)?.id === "t1" ? "c1" : team.id === "t2" ? "c4" : "c5");
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded transition-colors ${
                  activeTeam === team.id ? "bg-[#2b2e33]" : "hover:bg-[#2b2e33]"
                }`}
              >
                <span className="text-lg">{team.icon}</span>
                <span className="text-sm flex-1 text-left">{team.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="px-3 py-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Channels</div>
          <div className="space-y-1">
            {teams
              .find((t) => t.id === activeTeam)
              ?.channels
              ?.map((channel) => {
                const unreadCount = getUnreadCount(channel.id);
                return (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded transition-colors ${
                      activeChannel === channel.id ? "bg-[#2b2e33]" : "hover:bg-[#2b2e33]"
                    }`}
                  >
                    <span className="text-gray-400">#</span>
                    <span className="text-sm flex-1 text-left">{channel.name}</span>
                    {unreadCount > 0 && (
                      <span className="bg-[#0078d4] text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[18px] text-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-2 border-t border-[#2b2e33]">
        <button
          onClick={() => setActiveTab("activity")}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded transition-colors ${
            activeTab === "activity" ? "bg-[#2b2e33]" : "hover:bg-[#2b2e33]"
          }`}
        >
          <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span className="text-sm">Activity</span>
        </button>
        <button
          onClick={() => setActiveTab("calls")}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded transition-colors ${
            activeTab === "calls" ? "bg-[#2b2e33]" : "hover:bg-[#2b2e33]"
          }`}
        >
          <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          <span className="text-sm">Calls</span>
        </button>
        <button
          onClick={() => setActiveTab("files")}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded transition-colors ${
            activeTab === "files" ? "bg-[#2b2e33]" : "hover:bg-[#2b2e33]"
          }`}
        >
          <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v2H6v2h12v-2h-4v-2h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H4V4h16v10z" />
          </svg>
          <span className="text-sm">Files</span>
        </button>
      </div>
    </div>
  );
}
