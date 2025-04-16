import { asyncHandler } from '../../utils/global/asyncHandler';
import { sendResponse } from '../../utils/global/sendResponse';

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
