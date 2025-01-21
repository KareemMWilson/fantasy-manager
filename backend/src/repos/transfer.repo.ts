import { TransferStatus } from "@prisma/client";
import { prisma } from "../db/prisma";

type WhereClauseType = {
  team?: {
    teamName?: {
      contains: string;
      mode: "insensitive";
    };
  };
  player?: {
    name?: {
      contains: string;
      mode: "insensitive";
    };
  };
  askingPrice?: {
    gte?: number;
    lte?: number;
  };
};

export type CompleteTransferProps = {
  transferId: string;
  offeredPrice: number;
  buyerTeamId: string;
  sellerTeamId: string;
  playerId: string;
};

export const TransferRepo = {
  getGlobalTransfers: async (whereClause: WhereClauseType) => {
    return await prisma.transfer.findMany({
      where: { ...whereClause, status: "LISTED" },
      include: {
        player: {
          select: {
            id: true,
            name: true,
            position: true,
          },
        },
        seller: {
          select: {
            id: true,
            name: true,
            user: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
      },
    });
  },
  getUserTransfersByUserId: async (userId: string) => {
    console.log({ userId });
    return await prisma.transfer.findMany({
      where: {
        seller: {
          user: {
            id: userId,
          },
        },
      },
      include: {
        player: {
          select: {
            id: true,
            name: true,
            position: true,
          },
        },
        seller: {
          select: {
            id: true,
            name: true,
            user: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
      },
    });
  },
  getTransferWithOwnershipCheck: async (transferId: string, userId: string) => {
    return prisma.transfer.findFirst({
      where: {
        id: transferId,
        status: "LISTED",
        seller: {
          user: {
            id: userId,
          },
        },
      },
    });
  },
  deleteUserTransfer: async (transferId: string) => {
    return prisma.transfer.delete({
      where: { id: transferId },
    });
  },
  getTransferById: async (transferId: string) => {
    return prisma.transfer.findFirst({
      where: {
        id: transferId,
      },
    });
  },
  completeTransfer: async ({
    transferId,
    offeredPrice,
    buyerTeamId,
    sellerTeamId,
    playerId,
  }: CompleteTransferProps): Promise<{
    success: boolean;
    message: string;
    status: number;
  }> => {
    return prisma.$transaction(async (prisma) => {
      try {
        //remove player from the seller's team
        await prisma.team.update({
          where: { id: sellerTeamId },
          data: {
            players: {
              disconnect: { id: playerId },
            },
          },
        });

        //add player to the buyer's team
        await prisma.team.update({
          where: { id: buyerTeamId },
          data: {
            players: {
              connect: { id: playerId },
            },
          },
        });

        //update buyer's budget
        await prisma.team.update({
          where: { id: buyerTeamId },
          data: { budget: { decrement: offeredPrice } },
        });

        //update seller's budget
        await prisma.team.update({
          where: { id: sellerTeamId },
          data: { budget: { increment: offeredPrice } },
        });

        // mark the transfer as completed
        await prisma.transfer.update({
          where: { id: transferId },
          data: {
            status: "SOLD",
            soldAt: new Date(),
          },
        });
        return {
          success: true,
          message: "Successfully assigning player to the new team",
          status: 200,
        };
      } catch (error) {
        console.error(error);
        return {
          success: false,
          message: "Something went wrong while assigning player to new team",
          status: 500,
        };
      }
    });
  },
  createTransfer: async ({
    playerId,
    askingPrice,
    sellerTeamId,
  }: {
    playerId: string;
    askingPrice: number;
    sellerTeamId: string;
  }) => {
    try {
      await prisma.transfer.create({
        data: {
          playerId,
          askingPrice,
          sellerId: sellerTeamId,
        },
      });

      return {
        success: true,
        message: "Creating Transfer Successfully",
        status: 201,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Something went wrong while Creating transfer",
        status: 500,
      };
    }
  },
};
