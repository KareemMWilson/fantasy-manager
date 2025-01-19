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
    getUserTeam: builder.mutation<TeamResponse, TeamRequest>({
      query: (userId) => ({
        url: `/team?userId=${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserTeamMutation } = teamApi;
