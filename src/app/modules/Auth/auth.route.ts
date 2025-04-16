import express from 'express';
import { validateRequestSchema } from '../../middleware/validateRequestSchema';
import { AuthValidationSchema } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

// Register a user
router.post(
  '/register',
  validateRequestSchema(AuthValidationSchema.registerUserValidationSchema),
  AuthControllers.registerUserController,
);

// Login user
router.post('/login', AuthControllers.loginUserController);

export const AuthRoutes = router;
