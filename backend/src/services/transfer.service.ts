import { Player } from "@prisma/client";
import { AuthRepo } from "../repos/auth.repo";
import { CompleteTransferProps, TransferRepo } from "../repos/transfer.repo";
import { TeamRepo } from "../repos/team.repo";

interface TransferFilters {
  teamName?: string;
  playerName?: string;
  minPrice?: number;
  maxPrice?: number;
}


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
  cancelTransfer: async (transferId: string) => {
    return await TransferRepo.deleteUserTransfer(transferId);
  },
  BuyPlayer: async ({
    transferId,
    offeredPrice,
    buyerId,
  }: {
    transferId: string;
    offeredPrice: number;
    buyerId: string;
  }): Promise<{ success: boolean; message: string; status: number }> => {
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
    const doesBuyerAlreadyOwnPlayer = await TeamRepo.chechPlayerExistanceInATeam(buyer.team?.id, transfer?.playerId)

    if (doesBuyerAlreadyOwnPlayer) {
      return {
        status: 400,
        message:
          "Cannot complete Transfer due to you already have this player",
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
    };
    const completeTransfer = await TransferRepo.completeTransfer(
      completeTransferProps
    );

    return completeTransfer;
  },
  sellPlayer: async ({
    playerId,
    askingPrice,
    sellerId,
  }: {
    playerId: string;
    askingPrice: number;
    sellerId: string;
  }): Promise<{ success: boolean; message: string; status: number }> => {
    
    const sellerTeam = await TeamRepo.getUserTeamById(sellerId);
    if(!sellerTeam || !sellerTeam.players){
      return {
        status: 400,
        message: "invalid Parameters",
        success: false,
      }; 
    }

    const {players} = sellerTeam

    const playerAlreadyInTransfer = await TransferRepo.checkPlayerTransferStatus(playerId, sellerTeam.id)


    if(playerAlreadyInTransfer){
      return {
        status: 405,
        message: "Cannot create Transfer due to Player is already listed",
        success: false,
      };
    }

    
    console.log({players})
    const NotListedPlayers = players.filter((player) => player.transfers[0]?.status !== 'LISTED')
    const doesSellerExceedMinNumberOfPlayers = checkTeamPlayersNumber(
      NotListedPlayers,
      "sell"
    );

    if (doesSellerExceedMinNumberOfPlayers) {
      return {
        status: 405,
        message: "Cannot create Transfer due to Exceeding team members minimum limit",
        success: false,
      };
    }

    return await TransferRepo.createTransfer({
      sellerTeamId: sellerTeam.id,
      askingPrice,
      playerId,
    });


  },
};

/*********** */
/** HELPERS  */
/*********** */

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







// check user legability to buy another player 15 - 25
//       5 listed        10  listed         0 listed          0 listed        5 listed
//       20 notListed    15  notListed      25 notListed      15 notListed    15 notListed   
// sell  yes             no                 yes               no              no
// buy   no              no                 no                yes             yes
const checkTeamPlayersNumber = (
  players: Player[] | undefined,
  buyOrSell: "sell" | "buy"
) => {
  const maxNumberInTeam = 25;
  const minNumberInTeam = 15;

  if (!players) return true;

  switch (buyOrSell) {
    case "sell":
      return players.length <= minNumberInTeam;
    case "buy":
      return players.length >= maxNumberInTeam;
    default:
      return true;
  }
};
