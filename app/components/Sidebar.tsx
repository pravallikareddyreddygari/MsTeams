"use client";

import { Team } from "../types";

interface SidebarProps {
  teams: Team[];
  activeTeam: string;
  setActiveTeam: (teamId: string) => void;
  setActiveChannel: (channelId: string) => void;
}

export default function Sidebar({
  teams,
  activeTeam,
  setActiveTeam,
  setActiveChannel,
}: SidebarProps) {
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
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded hover:bg-[#2b2e33] transition-colors">
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
              ?.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded transition-colors ${
                    activeTeam === channel.teamId ? "hover:bg-[#2b2e33]" : ""
                  }`}
                >
                  <span className="text-gray-400">#</span>
                  <span className="text-sm flex-1 text-left">{channel.name}</span>
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-2 border-t border-[#2b2e33]">
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded hover:bg-[#2b2e33] transition-colors">
          <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span className="text-sm">Activity</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded hover:bg-[#2b2e33] transition-colors">
          <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <span className="text-sm">Calls</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded hover:bg-[#2b2e33] transition-colors">
          <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v2H6v2h12v-2h-4v-2h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H4V4h16v10z" />
          </svg>
          <span className="text-sm">Files</span>
        </button>
      </div>
    </div>
  );
}
