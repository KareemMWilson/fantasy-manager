import { Player } from "@prisma/client";
import { AuthRepo } from "../repos/auth.repo";
import { CompleteTransferProps, TransferRepo } from "../repos/transfer.repo";

interface TransferFilters {
  teamName?: string;
  playerName?: string;
  minPrice?: number;
  maxPrice?: number;
}

const generateWhereClause = (filters: TransferFilters) => {
  const whereClause: any = {};

  if (filters.teamName) {
    console.log({ teamName: filters.teamName });
    whereClause.seller = whereClause.seller || {};
    whereClause.seller.name = {
      contains: filters.teamName,
      mode: "insensitive",
    };
  }

  if (filters.playerName) {
    console.log({ playerName: filters.playerName });

    whereClause.player = whereClause.player || {};
    whereClause.player.name = {
      contains: filters.playerName,
      mode: "insensitive",
    };
  }

  if (filters.minPrice) {
    console.log({ min: filters.minPrice });

    whereClause.askingPrice = {
      ...(whereClause.askingPrice || {}),
      gte: filters.minPrice,
    };
  }

  if (filters.maxPrice) {
    console.log({ max: filters.maxPrice });

    whereClause.askingPrice = {
      ...(whereClause.askingPrice || {}),
      lte: filters.maxPrice,
    };
  }

  return whereClause;
};

const checkOfferedPrice = (offeredPrice: number, askingPrice: number) => {
  return offeredPrice >= askingPrice * 0.95;
};

const checkUserBudget = (userBudget: number, offeredPrice: number) => {
  return userBudget >= offeredPrice;
};

const checkTeamPlayersNumber = (
  players: Player[] | undefined,
  buyOrSell: "sell" | "buy"
) => {
  const maxNumberInTeam = 25;
  const minNumberInTeam = 15;

  if (!players) return true;

  switch (buyOrSell) {
    case "sell":
      return players.length < minNumberInTeam;
    case "buy":
      return players.length > maxNumberInTeam;
    default:
      return true;
  }
};

export const TransferService = {
  getGlobalTransfers: async (filters: TransferFilters) => {
    return await TransferRepo.getGlobalTransfers(generateWhereClause(filters));
  },
  getUserTransfersByUserId: async (userId: string) => {
    return await TransferRepo.getUserTransfersByUserId(userId);
  },
  getTransferWithOwnershipCheck: async (transferId: string, userId: string) => {
    if (!userId) return undefined;
    return await TransferRepo.getTransferWithOwnershipCheck(transferId, userId);
  },
  deleteUserTransfer: async (transferId: string) => {
    return await TransferRepo.deleteUserTransfer(transferId);
  },
  assignPlayerToBuyer: async (
    transferId: string,
    offeredPrice: number,
    buyerId: string
  ): Promise<{ success: boolean; message: string; status: number }> => {
    // is available transfer
    const transfer = await TransferRepo.getTransferById(transferId);
    const buyer = await AuthRepo.getUserById(buyerId);

    if (transfer?.status !== "LISTED" || !buyer.team || !transfer) {
      return {
        status: 405,
        message:
          "Cannot complete Transfer due to this transfer not listed in available transfers",
        success: false,
      };
    }
    // check 95%
    const doesOfferedPriceAbove95Percentage = checkOfferedPrice(
      offeredPrice,
      transfer.askingPrice
    );
    if (!doesOfferedPriceAbove95Percentage) {
      return {
        status: 405,
        message:
          "Cannot complete Transfer due to offered price less than 95% of asking price",
        success: false,
      };
    }

    // check buyer Budget
    const doesUserCanAfford = checkUserBudget(buyer.team.budget, offeredPrice);

    if (!doesUserCanAfford) {
      return {
        status: 405,
        message: "Cannot complete Transfer due to insufficient funds",
        success: false,
      };
    }

    // check user legability to buy another player 15 - 25
    const doesBuyerExceedMaxNumberOfPlayers = checkTeamPlayersNumber(
      buyer.team.players,
      "buy"
    );

    if (doesBuyerExceedMaxNumberOfPlayers) {
      return {
        status: 405,
        message: "Cannot complete Transfer due to Exceeding team members",
        success: false,
      };
    }

    // all is good , now start assigning:
    const completeTransferProps: CompleteTransferProps = {
      transferId,
      offeredPrice,
      buyerTeamId: buyer.team.id,
      sellerTeamId: transfer.sellerId,
      playerId: transfer.playerId,
    }
    const completeTransfer = await TransferRepo.completeTransfer(completeTransferProps);

    return completeTransfer;
  },
};
