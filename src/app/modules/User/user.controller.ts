import { asyncHandler } from '../../utils/global/asyncHandler';
import { sendResponse } from '../../utils/global/sendResponse';
import { UserServices } from './user.service';

// Get all users
const getAllUsersController = asyncHandler(async (req, res) => {
  const query = req.query;
  const users = await UserServices.getAllUsers(query);

  sendResponse(res, {
    success: true,
    message: 'Users are retrieved successfully',
    statusCode: 200,
    data: users,
  });
});

export const UserControllers = {
  getAllUsersController,
};
