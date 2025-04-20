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

// Get all Listing
router.get('/', ListingControllers.getAllListingsController);

// Get Listings By Category
router.get(
  '/category/:category',
  ListingControllers.getListingsByCategoryController,
);

// Get Listing by User
router.get(
  '/byUser',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ListingControllers.getListingsByParticularUserController,
);

// Get listings by ID
router.get('/:id', ListingControllers.getListingByIdController);

// Update listing by ID
router.patch(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequestSchema(ListingValidationSchema.updateListingValidationSchema),
  ListingControllers.updateListingByIdController,
);

// Update listing Status by Id
router.patch(
  '/:id/status',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ListingControllers.updateListingStatusByIdController,
);

// Delete listing by id
router.delete(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ListingControllers.deleteListingByIdController,
);

router.delete(
  '/admin/:id',
  auth(USER_ROLE.admin),
  ListingControllers.deleteListingByAdmin,
);

// Update listing status by admin
router.patch(
  '/admin/:id/status',
  auth(USER_ROLE.admin),
  ListingControllers.updateListingStatusByAdminController,
);

export const ListingRoutes = router;

// Update listing by admin
router.patch(
  '/admin/:id/update',
  auth(USER_ROLE.admin), // Only admin can perform this action
  validateRequestSchema(ListingValidationSchema.updateListingValidationSchema),
  ListingControllers.updateListingByAdminController,
);
