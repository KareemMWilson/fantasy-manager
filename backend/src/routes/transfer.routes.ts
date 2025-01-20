import { Router } from 'express';
import { TransferController } from '../controllers/transfer.controller';

const router = Router();


router.get('/:userId', TransferController.getUserTransfersByUserId)
router.get("/", TransferController.getGlobalTransfers);

export default router; 