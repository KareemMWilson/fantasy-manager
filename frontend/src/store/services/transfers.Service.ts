import { api } from "../api";

export interface Transfer {
  id: string;
  askingPrice: number;
  status: "LISTED" | "SOLD" | "CANCELED";
  listedAt: string;
  soldAt: string | null;
  createdAt: string;
  updatedAt: string;
  playerId: string;
  player: {
    id: string;
    name: string;
    position: "GOALKEEPER" | "DEFENDER" | "MIDFIELDER" | "ATTACKER";
  };
  sellerId: string;
  seller: {
    id: string;
    name: string;
    user: {
      id: string;
      email: string;
    };
  };
}

export interface GetTransferResponseType {
  data: Transfer[];
  success: boolean;
}

export interface QueryType {
  playerName: string;
  teamName: string;
  priceRange: [number, number];
}

export const teamApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGlobalTransfers: builder.query<GetTransferResponseType, QueryType>({
      query: (query: QueryType) => {
        const { playerName, teamName, priceRange } = query;
        const [minPrice, maxPrice] = priceRange;

        return {
          url: `/transfers`,
          method: "GET",
          params: {
            playerName,
            teamName,
            minPrice,
            maxPrice,
          },
        };
      },
      keepUnusedDataFor: 30,
    }),
    getUserTransfers: builder.query<GetTransferResponseType, string>({
      query: (userId: string) => {
        console.log({ddd: userId})
        return {
          url: `/transfers/${userId}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 30,
    }),
  }),
});

export const {
  useGetGlobalTransfersQuery,
  useLazyGetGlobalTransfersQuery,
  useGetUserTransfersQuery,
  useLazyGetUserTransfersQuery,
} = teamApi;
