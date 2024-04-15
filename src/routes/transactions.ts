import { Router } from 'express';
import Container from 'typedi';

import { TransactionController } from '../controllers/transactions.controller';

const transactionController = Container.get(TransactionController);
const router = Router();

router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getAllTransactions);

export default router;
