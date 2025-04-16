import config from '../../config';
import { HttpError } from '../../errors/HttpError';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import jwt from 'jsonwebtoken';
import { TLoginUser } from './auth.interface';

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

// Login User
const loginUser = async (payload: TLoginUser) => {
  if (!payload.identifier) {
    throw new HttpError(400, 'Email or phone number is required.');
  }
  const user = await User.isUserExists(payload.identifier);
  if (!user) {
    throw new HttpError(404, 'This user is not found');
  }
  if (user.isDeleted) {
    throw new HttpError(404, 'The user is already deleted');
  }
  if (user.status === 'banned') {
    throw new HttpError(403, 'The user account is banned.');
  }
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new HttpError(
      401,
      'Incorrect password, Please enter a valid password',
    );
  }
  const jwtPayload = {
    identifier: user.identifier,
    role: user?.role,
  };
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '7d',
  });
  return {
    token,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
};
