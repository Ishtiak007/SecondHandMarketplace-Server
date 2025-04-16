import express from 'express';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';

const router = express.Router();

// Get all users
router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUsersController);

// Get me
router.get(
  '/me',
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserControllers.getMeController,
);

// Get user By ID
router.get(
  '/:id',
  auth(USER_ROLE.admin),
  UserControllers.getUserControllerById,
);

export const UserRoutes = router;
