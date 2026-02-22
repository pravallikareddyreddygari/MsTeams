"use client";

import { Team } from "../types";

interface TeamsProps {
  teams: Team[];
  activeTeam: string;
  setActiveTeam: (teamId: string) => void;
  setActiveTab: (tab: "chat" | "teams" | "channels") => void;
}

export default function Teams({ teams, activeTeam, setActiveTeam, setActiveTab }: TeamsProps) {
  return (
    <div className="flex-1 bg-[#f3f2f1] p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Teams</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <div
            key={team.id}
            onClick={() => {
              setActiveTeam(team.id);
              setActiveTab("channels");
            }}
            className={`p-6 rounded-lg cursor-pointer transition-all ${
              activeTeam === team.id
                ? "bg-white shadow-md ring-2 ring-[#0078d4]"
                : "bg-white hover:bg-gray-50 shadow-sm"
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[#0078d4] rounded-full flex items-center justify-center text-3xl">
                {team.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{team.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {team.id === "t1" ? "12 members" : team.id === "t2" ? "8 members" : "6 members"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition-colors">
          + Create team
        </button>
      </div>
    </div>
  );
}
