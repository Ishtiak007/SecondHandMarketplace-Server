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

// Get me
const getMeController = asyncHandler(async (req, res) => {
  const { identifier } = req.user;
  const user = await UserServices.getMeFromDB(identifier);
  sendResponse(res, {
    success: true,
    message: 'User (me) retrieve successfully',
    statusCode: 200,
    data: user,
  });
});

// Get user By ID
const getUserControllerById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await UserServices.getUserByIdFromDB(id);

  sendResponse(res, {
    success: true,
    message: 'User retrieved successfully',
    statusCode: 200,
    data: user,
  });
});

// Update user profile
const updateUserController = asyncHandler(async (req, res) => {
  const { identifier } = req.user;
  const updatedPayload = req.body;
  const updatedUser = await UserServices.updateUserFromDB(
    updatedPayload,
    identifier,
  );
  sendResponse(res, {
    success: true,
    message: 'User profile update successfully',
    statusCode: 200,
    data: updatedUser,
  });
});

// Update User status by id
const updateUserStatusByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { identifier } = req.user;
  const { status } = req.body;
  const updatedStatus = await UserServices.updateUserStatusByIdIntoDB(
    id,
    status,
    identifier,
  );
  sendResponse(res, {
    success: true,
    message: 'User status updated successfully',
    statusCode: 200,
    data: updatedStatus,
  });
});

// Update User role by id
const updateUserRoleByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { identifier } = req.user;
  const { role } = req.body;
  const updatedRole = await UserServices.updateUserRoleByIdIntoDB(
    id,
    role,
    identifier,
  );
  sendResponse(res, {
    success: true,
    message: 'User role updated successfully',
    statusCode: 200,
    data: updatedRole,
  });
});

// Delete a user
const deleteUserControllerById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { identifier } = req.user;
  await UserServices.deleteUserByIdIntoDB(id, identifier);
  sendResponse(res, {
    success: true,
    message: 'User deleted successfully',
    statusCode: 200,
    data: {},
  });
});

export const UserControllers = {
  getAllUsersController,
  getMeController,
  getUserControllerById,
  updateUserController,
  updateUserStatusByIdController,
  updateUserRoleByIdController,
  deleteUserControllerById,
};
