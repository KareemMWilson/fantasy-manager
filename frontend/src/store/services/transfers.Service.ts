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

export interface DeleteTransferResponseType {
  [x: string]: unknown;
  data: {
    message: string | undefined;
    success: boolean | undefined;
  };
}

export interface QueryType {
  playerName: string;
  teamName: string;
  priceRange: [number, number];
}

export interface BuyPlayerResponseType {
  data: {
    message: string | undefined;
    success: boolean | undefined;
  };
}

export interface BuyPlayerRequestPayloadType {
    transferId: string
    buyerId: string
    offeredPrice: number
}

export const teamApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGlobalTransfers: builder.query<GetTransferResponseType, QueryType>({
      query: (query) => {
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
    }),
    getUserTransfers: builder.query<GetTransferResponseType, string>({
      query: (userId) => {
        console.log({ ddd: userId });
        return {
          url: `/transfers/${userId}`,
          method: "GET",
        };
      },
    }),
    deleteUserTransfer: builder.mutation<DeleteTransferResponseType, string>({
      query: (transferId) => ({
        url: `/transfers/${transferId}`,
        method: "DELETE",
      }),
    }),
    buyPlayer: builder.mutation<BuyPlayerResponseType, BuyPlayerRequestPayloadType>({
      query: ({transferId, buyerId, offeredPrice}) => ({
        url: `/transfers/buy`,
        method: "POST",
        body: {
          transferId,
          buyerId,
          offeredPrice
        }
      }),
    }),
  }),
});

export const {
  useGetGlobalTransfersQuery,
  useLazyGetGlobalTransfersQuery,
  useGetUserTransfersQuery,
  useLazyGetUserTransfersQuery,
  useDeleteUserTransferMutation,
  useBuyPlayerMutation
} = teamApi;
