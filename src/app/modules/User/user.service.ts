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

export const UserServices = {
  getAllUsers,
};
