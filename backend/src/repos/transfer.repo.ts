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

export const TransferRepo = {
  getGlobalTransfers: async (whereClause: WhereClauseType) => {
    return await prisma.transfer.findMany({
      where: whereClause,
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
    console.log({userId})
    return await prisma.transfer.findMany({
      where:{
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
};
