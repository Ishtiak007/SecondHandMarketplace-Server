import { asyncHandler } from '../../utils/global/asyncHandler';
import { sendResponse } from '../../utils/global/sendResponse';
import { AuthServices } from './auth.service';

// Register a user
const registerUserController = asyncHandler(async (req, res) => {
  const registerUserPayload = req.body;
  const result = await AuthServices.registerUser(registerUserPayload);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: 201,
    data: result,
  });
});

// Login User
const loginUserController = asyncHandler(async (req, res) => {
  const loginUserPayload = req.body;
  const result = await AuthServices.loginUser(loginUserPayload);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User login successfully',
    data: result,
  });
});

export const AuthControllers = {
  registerUserController,
  loginUserController,
};
