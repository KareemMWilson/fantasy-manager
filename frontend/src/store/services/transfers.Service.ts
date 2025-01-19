import { api } from "../api";



export interface TeamResponse {
  data: {
    team: string;
  };
  success: boolean;
}

export interface QueryType {
    playerName:  string
    teamName: string
    price: [number, number]
}

export const teamApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGlobalTransfers: builder.mutation<TeamResponse, unknown>({
      query: (query: QueryType) => ({
        url: `/transfers?playerName=${query.playerName}teamName=${query.teamName}price=${query.price}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetGlobalTransfersMutation } = teamApi;
