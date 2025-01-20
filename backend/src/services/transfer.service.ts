import { TransferRepo } from "../repos/transfer.repo";

interface TransferFilters {
  teamName?: string;
  playerName?: string;
  minPrice?: number;
  maxPrice?: number;
}

const generateWhereClause = (filters: TransferFilters) => {
    const whereClause: any = {};

    if (filters.teamName) {
        console.log({teamName: filters.teamName})
      whereClause.seller = whereClause.seller || {};
      whereClause.seller.name = {
        contains: filters.teamName,
        mode: "insensitive",
      };
    }

    if (filters.playerName) {
        console.log({playerName: filters.playerName})

      whereClause.player = whereClause.player || {};
      whereClause.player.name = {
        contains: filters.playerName,
        mode: "insensitive",
      };
    }

    if (filters.minPrice) {
        console.log({min: filters.minPrice})

      whereClause.askingPrice = {
        ...(whereClause.askingPrice || {}),
        gte: filters.minPrice,
      };
    }

    if (filters.maxPrice) {
        console.log({max: filters.maxPrice})

      whereClause.askingPrice = {
        ...(whereClause.askingPrice || {}),
        lte: filters.maxPrice,
      };
    }

    return whereClause
}

export const TransferService = {
  getGlobalTransfers: async (filters: TransferFilters) => {
    return await TransferRepo.getGlobalTransfers(generateWhereClause(filters));
  },
  getUserTransfersByUserId: async (userId: string) => {
    return await TransferRepo.getUserTransfersByUserId(userId);
  },
  getTransferWithOwnershipCheck: async (transferId: string, userId: string) => {
    return await TransferRepo.getTransferWithOwnershipCheck(transferId, userId)
  },
  deleteUserTransfer: async (transferId: string) => {
    return await TransferRepo.deleteUserTransfer(transferId)
  },
};
