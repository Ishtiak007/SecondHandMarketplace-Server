import { Document } from 'mongoose';
import { asyncHandler } from '../../utils/global/asyncHandler';
import { sendResponse } from '../../utils/global/sendResponse';
import { TransactionServices } from './transaction.service';

const createTransactionController = asyncHandler(async (req, res) => {
  const transactionPayload = req.body;
  const { identifier } = req.user;
  const { createdOrder, paymentUrl } =
    await TransactionServices.createTransactionIntoDB(
      transactionPayload,
      identifier,
    );

  const orderData =
    createdOrder instanceof Document ? createdOrder.toObject() : createdOrder;

  sendResponse(res, {
    success: true,
    message: 'Transaction is created successfully',
    statusCode: 201,
    data: {
      ...orderData,
      paymentUrl,
    },
  });
});

export const TransactionControllers = {
  createTransactionController,
};
