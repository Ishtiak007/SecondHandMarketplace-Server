import { HttpError } from '../../errors/HttpError';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';

// Register a user
const registerUser = async (payload: TUser) => {
  const existingUser = await User.isUserExists(payload?.identifier);

  if (existingUser) {
    throw new HttpError(
      400,
      `This user with this identifier '${payload?.identifier}' already exists. Please use a different email or phone number.`,
    );
  }
  const registeredUser = await User.create(payload);
  return registeredUser;
};

export const AuthServices = {
  registerUser,
};
