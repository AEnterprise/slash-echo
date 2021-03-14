export interface Payload {
  id: string;
  type: number;
  data: ApplicationCommandInteractionData|null;
  guild_id: string;
  channel_id: string;
  member: GuildMember;
  token: string;
  version: number;
}

export interface ApplicationCommandInteractionData {
  id: string;
  name: string;
  options: ApplicationCommandInteractionDataOption[];
}

export interface GuildMember {
  roles: string[];
}

export interface ApplicationCommandInteractionDataOption {
  name: string;
  value: string|null;
  type: number,
  options: ApplicationCommandInteractionDataOption[]|null;
}