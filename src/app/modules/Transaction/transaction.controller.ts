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

// Get purchases history by particular user
const getPurchasesHistoryByParticularUserController = asyncHandler(
  async (req, res) => {
    const { identifier } = req.user;
    const query = req.query;
    const purchasesHistory =
      await TransactionServices.getPurchasesHistoryByParticularUserFromDB(
        identifier,
        query,
      );

    sendResponse(res, {
      success: true,
      message: 'Purchases history are retrieved successfully',
      statusCode: 200,
      data: purchasesHistory,
    });
  },
);

// Get sales history by particular user
const getSalesHistoryByParticularUserController = asyncHandler(
  async (req, res) => {
    const { identifier } = req.user;
    const query = req.query;
    const salesHistory =
      await TransactionServices.getSalesHistoryByParticularUser(
        identifier,
        query,
      );

    sendResponse(res, {
      success: true,
      message: 'Sales history are retrieved successfully',
      statusCode: 200,
      data: salesHistory,
    });
  },
);

export const TransactionControllers = {
  createTransactionController,
  updateTransactionStatusByIdController,
  getPurchasesHistoryByParticularUserController,
  getSalesHistoryByParticularUserController,
};
