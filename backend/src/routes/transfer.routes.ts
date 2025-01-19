import { Router } from 'express';
import { TransferController } from '../controllers/transfer.controller';

const router = Router();


router.get("/", TransferController.getGlobalTransfers);


export default router; 