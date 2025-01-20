import { Request, Response } from "express";
import { TransferService } from "../services/transfer.service";
import { JwtPayload } from "jsonwebtoken";

export const TransferController = {
    getGlobalTransfers: async (req: Request, res: Response) => {
        try {
          const { teamName, playerName, minPrice, maxPrice } = req.query;
    
          const filters = {
            teamName: teamName ? String(teamName) : undefined,
            playerName: playerName ? String(playerName) : undefined,
            minPrice: minPrice ? parseFloat(String(minPrice)) : undefined,
            maxPrice: maxPrice ? parseFloat(String(maxPrice)) : undefined,
          };
    
          const globalTransfers = await TransferService.getGlobalTransfers(filters);
          
          res.status(200).json({ success: true, data: globalTransfers });
        } catch (error) {
          console.error("Error fetching global transfers:", error);
          res.status(500).json({ success: false, message: "Internal Server Error" });
        }
      },
      getUserTransfersByUserId: async (req: Request, res: Response) => {
        try {
          const { userId } = req.params;
          console.log({userId})
          const userTransfers = await TransferService.getUserTransfersByUserId(String(userId));
          
          res.status(200).json({ success: true, data: userTransfers });
        } catch (error) {
          console.error("Error fetching user transfers:", error);
          res.status(500).json({ success: false, message: "Internal Server Error" });
        }
      },
      deleteUserTransfer: async (req: Request, res: Response) => {
        try {
          const { transferId } = req.params;
          const userId = req.user.userId; 

          const transfer = await TransferService.getTransferWithOwnershipCheck(transferId, userId as string);
      
          if (!transfer) {
            return res.status(403).json({
              success: false,
              message: "You do not have permission to delete this transfer, or it is no longer listed.",
            });
          }
      
          await TransferService.deleteUserTransfer(transferId);
      
          res.status(200).json({
            success: true,
            message: `Transfer Stopped successfully`,
          });
        } catch (error) {
          console.error("Error deleting transfer:", error);
          res.status(500).json({
            success: false,
            message: "Internal Server Error",
          });
        }
      },
};
