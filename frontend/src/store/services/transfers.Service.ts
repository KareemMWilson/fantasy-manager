import { api } from "../api";

export interface TeamResponse {
  data: {
    team: string;
  };
  success: boolean;
}

export interface QueryType {
  playerName: string;
  teamName: string;
  priceRange: [number, number];
}

export const teamApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGlobalTransfers: builder.query<TeamResponse, QueryType>({
      query: (query: QueryType) => {
        const {playerName, teamName, priceRange} = query
        const [minPrice, maxPrice] = priceRange

        return {
          url: `/transfers`,
          method: "GET",
          params: {
            playerName,
            teamName,
            minPrice,
            maxPrice
          }
        };
      },
    }),
  }),
});

export const { useGetGlobalTransfersQuery, useLazyGetGlobalTransfersQuery } = teamApi;
