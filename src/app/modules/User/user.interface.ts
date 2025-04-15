import { Document, Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser extends Document {
  _id: Types.ObjectId;
  name: string;
  identifier: string;
  password: string;
  role?: 'user' | 'admin';
  status?: 'active' | 'banned';
  isDeleted?: false;
  profilePicture?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  gender?: 'male' | 'female';
  bio?: string;
  facebook?: string;
  website?: string;
}

export type TUserRole = keyof typeof USER_ROLE;

export interface UserModel extends Model<TUser> {
  isUserExists(identifier: string): Promise<TUser | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
