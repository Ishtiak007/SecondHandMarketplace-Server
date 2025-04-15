import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/HttpError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { asyncHandler } from '../utils/global/asyncHandler';
import { TUserRole } from '../modules/User/user.interface';
import { User } from '../modules/User/user.model';

export const auth = (...requiredRoles: TUserRole[]) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) {
        throw new HttpError(
          401,
          'Access token is missing or invalid. Please provide a valid token to access this resource.',
        );
      }
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { identifier, role } = decoded;
      const user = await User.isUserExists(identifier);
      if (!user) {
        throw new HttpError(
          404,
          'Your session has expired or your credentials are incorrect. Please log in again.',
        );
      }
      if (user.isDeleted) {
        throw new HttpError(404, 'The user is already deleted');
      }
      if (user.status === 'banned') {
        throw new HttpError(
          403,
          'You are no longer able to access this account. Please reach out to support.',
        );
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new HttpError(
          403,
          'Permission denied. Your current role can’t perform this action.',
        );
      }

      req.user = decoded as JwtPayload;

      next();
    },
  );
};
