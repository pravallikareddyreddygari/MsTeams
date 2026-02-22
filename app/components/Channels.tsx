"use client";

import { Team, Channel } from "../types";

interface ChannelsProps {
  teams: Team[];
  channels: Channel[];
  activeTeam: string;
  activeChannel: string;
  setActiveTeam: (teamId: string) => void;
  setActiveChannel: (channelId: string) => void;
}

export default function Channels({
  teams,
  channels,
  activeTeam,
  activeChannel,
  setActiveTeam,
  setActiveChannel,
}: ChannelsProps) {
  const teamChannels = channels.filter((c) => c.teamId === activeTeam);

  return (
    <div className="flex-1 bg-[#f3f2f1] p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {teams.find((t) => t.id === activeTeam)?.name} - Channels
      </h2>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            General
          </h3>
          <div className="space-y-2">
            {teamChannels
              .filter((c) => c.name === "general")
              .map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
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

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Categories
          </h3>
          <div className="space-y-2">
            {teamChannels
              .filter((c) => c.name !== "general")
              .map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
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

      <div className="mt-6">
        <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition-colors">
          + Create channel
        </button>
      </div>
    </div>
  );
}
