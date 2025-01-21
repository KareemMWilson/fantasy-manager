import { api } from "../api";

export interface TeamResponseType {
  success: boolean;
  data: TeamData;
}

export interface TeamData {
  id: string;
  name: string | null;
  budget: number;
  userId: string;
  players: Player[];
}

export interface Player {
  id: string;
  name: string;
  position: 'GOALKEEPER' | 'DEFENDER' | 'MIDFIELDER' | 'ATTACKER';
  club: string;
  value: number;
}

export const teamApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserTeam: builder.query<TeamResponseType, void>({
      query: () => ({
        url: "/team/myteam",
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetUserTeamQuery } = teamApi;
