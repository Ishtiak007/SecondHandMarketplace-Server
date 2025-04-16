import express from 'express';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { validateRequestSchema } from '../../middleware/validateRequestSchema';
import { ListingValidationSchema } from './listing.validation';
import { ListingControllers } from './listing.controller';

const router = express.Router();

// Create listing
router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequestSchema(ListingValidationSchema.createListingValidationSchema),
  ListingControllers.createListingController,
);

export const ListingRoutes = router;
