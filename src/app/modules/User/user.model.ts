import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import {
  excludeDeletedAggregation,
  excludeDeletedQuery,
} from '../../utils/moduleSpecific/queryFilters';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    identifier: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: '{VALUE} is not a valid role',
      },
      default: 'user',
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'banned'],
        message: '{VALUE} is not a valid status',
      },
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} is not a valid gender',
      },
    },
    bio: {
      type: String,
      trim: true,
    },
    facebook: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// hashed password by bcrypt
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// password field is empty
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// statics method for check if user exists
userSchema.statics.isUserExists = async function (identifier: string) {
  return await User.findOne({ identifier }).select('+password');
};

// statics method for password matched
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// query middleware for soft delete by utils
userSchema.pre('find', excludeDeletedQuery);
userSchema.pre('findOne', excludeDeletedQuery);

// aggregation middleware for soft delete by utils
userSchema.pre('aggregate', excludeDeletedAggregation);

export const User = model<TUser, UserModel>('User', userSchema);
