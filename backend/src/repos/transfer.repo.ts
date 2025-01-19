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
      orderBy: { askingPrice: "asc" },
    });
  },
};
