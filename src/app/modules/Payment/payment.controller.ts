import { asyncHandler } from '../../utils/global/asyncHandler';

const paymentSuccessController = asyncHandler(async (req, res) => {
  res.redirect(`http://localhost:5173/success`);
});

const paymentFailController = asyncHandler(async (req, res) => {
  res.redirect(`http://localhost:5173/failed`);
});
const paymentCancelController = asyncHandler(async (req, res) => {
  res.redirect(`http://localhost:5173/cancelled`);
});

export const PaymentControllers = {
  paymentSuccessController,
  paymentFailController,
  paymentCancelController,
};
