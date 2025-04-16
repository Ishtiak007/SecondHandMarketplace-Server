import QueryBuilder from '../../builder/QueryBuilder';
import { HttpError } from '../../errors/HttpError';
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

export const UserServices = {
  getAllUsers,
  getMeFromDB,
};
