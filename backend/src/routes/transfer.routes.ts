import { Router } from 'express';
import { TransferController } from '../controllers/transfer.controller';
import { validateUser } from '../middlewares/validateUser';

const router = Router();


router.post('/buy', validateUser, TransferController.buyPlayer)
router.get('/:userId', validateUser, TransferController.getUserTransfersByUserId)
router.delete("/:transferId", validateUser, TransferController.deleteUserTransfer)
router.get("/", validateUser, TransferController.getGlobalTransfers);

export default router; 