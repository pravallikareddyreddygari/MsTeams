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

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
}

export interface Message {
  id: string;
  contactId: string;
  sender: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}
