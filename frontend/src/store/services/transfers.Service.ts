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
  [x: string]: unknown;
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

export interface SellPlayerResponseType {
  [x: string]: unknown;
  data: {
    message: string | undefined;
    success: boolean | undefined;
  };
}

export interface SellPlayerRequestPayloadType {
  askingPrice: number;
  playerId: string;
  sellerId: string;
}

export const transferApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGlobalTransfers: builder.query<GetTransferResponseType, QueryType>({
      query: (query) => {
        const { playerName, teamName, priceRange } = query;
        const [minPrice, maxPrice] = priceRange;

        return {
          url: `/transfer`,
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
          url: `/transfer/${userId}`,
          method: "GET",
        };
      },
    }),
    deleteUserTransfer: builder.mutation<DeleteTransferResponseType, string>({
      query: (transferId) => ({
        url: `/transfer/${transferId}`,
        method: "DELETE",
      }),
    }),
    buyPlayer: builder.mutation<BuyPlayerResponseType, BuyPlayerRequestPayloadType>({
      query: ({transferId, buyerId, offeredPrice}) => ({
        url: `/transfer/buy`,
        method: "POST",
        body: {
          transferId,
          buyerId,
          offeredPrice
        }
      }),
    }),
    sellPlayer: builder.mutation<SellPlayerResponseType, SellPlayerRequestPayloadType>({
      query: ({askingPrice, sellerId, playerId}) => ({
        url: `/transfer/sell`,
        method: "POST",
        body: {
          askingPrice,
          sellerId,
          playerId
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
  useBuyPlayerMutation,
  useSellPlayerMutation
} = transferApi;
