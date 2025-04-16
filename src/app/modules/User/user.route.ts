import express from 'express';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUsersController);

export const UserRoutes = router;
