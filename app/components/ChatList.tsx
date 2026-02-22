"use client";

import { Team, Channel } from "../types";

interface ChatListProps {
  teams: Team[];
  channels: Channel[];
  activeTeam: string;
  activeChannel: string;
  setActiveTeam: (teamId: string) => void;
  setActiveChannel: (channelId: string) => void;
  setActiveTab: (tab: "chat" | "teams" | "channels") => void;
}

export default function ChatList({
  teams,
  channels,
  activeTeam,
  activeChannel,
  setActiveTeam,
  setActiveChannel,
  setActiveTab,
}: ChatListProps) {
  const teamChannels = channels.filter((c) => c.teamId === activeTeam);

  return (
    <div className="w-64 bg-[#f3f2f1] border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Teams
          </h3>
          <div className="space-y-1">
            {teams.map((team) => (
              <button
                key={team.id}
                onClick={() => {
                  setActiveTeam(team.id);
                  setActiveTab("channels");
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                  activeTeam === team.id
                    ? "bg-[#e0e0e0] text-gray-900"
                    : "hover:bg-[#e5e5e5] text-gray-700"
                }`}
              >
                <span className="text-xl">{team.icon}</span>
                <span className="text-sm font-medium">{team.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 py-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Channels
          </h3>
          <div className="space-y-1">
            {teamChannels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                  activeChannel === channel.id
                    ? "bg-[#e0e0e0] text-gray-900"
                    : "hover:bg-[#e5e5e5] text-gray-700"
                }`}
              >
                <span className="text-gray-500">#</span>
                <span className="text-sm font-medium">{channel.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
