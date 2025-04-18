import express from 'express';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { validateRequestSchema } from '../../middleware/validateRequestSchema';
import { TransactionValidationSchema } from './transaction.validation';
import { TransactionControllers } from './transaction.controller';

const router = express.Router();

// create transaction
router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequestSchema(
    TransactionValidationSchema.createTransactionValidationSchema,
  ),
  TransactionControllers.createTransactionController,
);

// update transaction status by id
router.patch(
  '/:id/status',
  auth(USER_ROLE.user, USER_ROLE.admin),
  TransactionControllers.updateTransactionStatusByIdController,
);

// Get purchases history by particular user
router.get(
  '/purchases-history',
  auth(USER_ROLE.user, USER_ROLE.admin),
  TransactionControllers.getPurchasesHistoryByParticularUserController,
);

// Get sales history by particular user
router.get(
  '/sales-history',
  auth(USER_ROLE.user, USER_ROLE.admin),
  TransactionControllers.getSalesHistoryByParticularUserController,
);

export const TransactionRoutes = router;
