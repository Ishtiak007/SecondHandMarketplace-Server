/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpError } from '../../errors/HttpError';
import { Listing } from '../Listing/listing.model';
import { User } from '../User/user.model';
import { TTransaction } from './transaction.interface';
import { generateTransactionId } from './transaction.utils';
import { Transaction } from './transaction.model';
import { SSLCommerzService } from '../SSLCommerez/sslCommerez.service';

const createTransactionIntoDB = async (
  payload: TTransaction,
  identifier: string,
) => {
  // check if buyer is exists
  const buyer = await User.isUserExists(identifier);
  if (!buyer) {
    throw new HttpError(404, 'Buyer not found with this ID');
  }
  payload.buyerID = buyer._id;
  const listing = await Listing.findOne({ _id: payload.itemID });
  if (!listing) {
    throw new HttpError(404, 'Item not found with this ID');
  }
  const seller = await User.findOne({ _id: listing.userID });
  if (!seller) {
    throw new HttpError(404, 'Seller not found with this ID');
  }
  payload.sellerID = seller._id;
  const transactionId = generateTransactionId();
  payload.transactionId = transactionId;
  try {
    const paymentResponse = await SSLCommerzService.initiatePayment({
      total_amount: listing.price,
      currency: 'BDT',
      tran_id: transactionId,
      success_url: `http://localhost:5173/api/v1/payments/payment-success/${transactionId}`,
      fail_url: `http://localhost:5173/api/v1/payments/payment-fail/${transactionId}`,
      cancel_url: `http://localhost:5173/api/v1/payments/payment-cancel/${transactionId}`,
      shipping_method: 'Courier',
      product_name: 'N/A.',
      product_category: 'N/A',
      product_profile: 'general',
      cus_name: 'N/A',
      cus_email: 'N/A',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'N/A',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    });
    payload.transactionId = transactionId;
    const createdOrder = await Transaction.create(payload);
    return {
      createdOrder,
      paymentUrl: paymentResponse,
    };
  } catch (err: any) {
    throw new HttpError(500, 'Failed to initiate payment.');
  }
};

export const TransactionServices = {
  createTransactionIntoDB,
};
