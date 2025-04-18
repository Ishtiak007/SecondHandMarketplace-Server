import { Document } from 'mongoose';
import { asyncHandler } from '../../utils/global/asyncHandler';
import { sendResponse } from '../../utils/global/sendResponse';
import { TransactionServices } from './transaction.service';

// create transaction
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

// update transaction status by id
const updateTransactionStatusByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { identifier } = req.user;
  const { status } = req.body;
  const updatedStatus =
    await TransactionServices.updateTransactionStatusByIdIntoDB(
      id,
      status,
      identifier,
    );
  sendResponse(res, {
    success: true,
    message: 'Status updated successfully',
    statusCode: 200,
    data: updatedStatus,
  });
});

export const TransactionControllers = {
  createTransactionController,
  updateTransactionStatusByIdController,
};
