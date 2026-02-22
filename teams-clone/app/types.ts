export interface Team {
  id: string;
  name: string;
  icon: string;
  channels?: Channel[];
}

export interface Channel {
  id: string;
  teamId: string;
  name: string;
  type: "standard" | "private" | "group";
}

export interface ChatMessage {
  id: string;
  channelId: string;
  sender: string;
  text: string;
  timestamp: string;
}
