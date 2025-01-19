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
    getTeamForUser: builder.mutation<TeamResponse, TeamRequest>({
      query: (userId) => ({
        url: "/team",
        method: "POST",
        body: {userId},
      }),
    }),
  }),
});

export const { useGetTeamForUserMutation } = teamApi;
