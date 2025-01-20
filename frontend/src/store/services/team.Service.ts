import { api } from "../api";

export interface TeamRequest {
  email: string;
  password: string;
}

export interface TeamResponse {
  data: {
    team: string;
  };
  success: boolean;
}

export const teamApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserTeam: builder.query<TeamResponse, TeamRequest>({
      query: () => ({
        url: `/myteam`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserTeamQuery } = teamApi;
