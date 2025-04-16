import QueryBuilder from '../../builder/QueryBuilder';
import { HttpError } from '../../errors/HttpError';
import { TUser } from './user.interface';
import { User } from './user.model';

// Get all users
const getAllUsers = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query).sortBy().paginate();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  if (result.length === 0) {
    throw new HttpError(404, 'User not found. Please check your input.');
  }
  return {
    meta,
    result,
  };
};

// Get me
const getMeFromDB = async (identifier: string) => {
  if (!identifier) {
    throw new Error('A valid identifier is needed to fetch user details.');
  }
  const existingUser = await User.isUserExists(identifier);
  if (!existingUser) {
    throw new Error('User not found.');
  }
  const user = await User.findOne({ identifier }).select('-password');
  return user;
};

// Get user By ID
const getUserByIdFromDB = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new HttpError(404, 'No user found with this ID');
  }
  return user;
};

// Update user profile
const updateUserFromDB = async (
  payload: Partial<TUser>,
  identifier: string,
) => {
  const user = await User.isUserExists(identifier);
  if (!user) {
    throw new HttpError(404, 'This user not found');
  }
  const updatedProfile = await User.findOneAndUpdate(
    { identifier: identifier },
    payload,
    { new: true, runValidators: true },
  );
  return updatedProfile;
};

// Update User status by id
const updateUserStatusByIdIntoDB = async (
  id: string,
  status: string,
  identifier: string,
) => {
  const user = await User.isUserExists(identifier);
  if (!user) throw new HttpError(404, 'This user is not found');

  const updatedStatus = await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { status: status },
    { runValidators: true, new: true },
  );
  if (!updatedStatus)
    throw new HttpError(404, 'There is No user found with this ID');
  return updatedStatus;
};

// Update User role by id
const updateUserRoleByIdIntoDB = async (
  id: string,
  role: string,
  identifier: string,
) => {
  const user = await User.isUserExists(identifier);
  if (!user) throw new HttpError(404, 'This user is not found');
  const updatedStatus = await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { role: role },
    { runValidators: true, new: true },
  );
  if (!updatedStatus)
    throw new HttpError(404, 'There is No user found with this ID');
  return updatedStatus;
};

// Delete a user
const deleteUserByIdIntoDB = async (id: string, identifier: string) => {
  const user = await User.isUserExists(identifier);
  if (!user) throw new HttpError(404, 'This user is not found');
  const deletedUser = await User.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true },
  );
  return deletedUser;
};

export const UserServices = {
  getAllUsers,
  getMeFromDB,
  getUserByIdFromDB,
  updateUserFromDB,
  updateUserStatusByIdIntoDB,
  updateUserRoleByIdIntoDB,
  deleteUserByIdIntoDB,
};
