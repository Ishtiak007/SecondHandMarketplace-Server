import { asyncHandler } from '../../utils/global/asyncHandler';
import { sendResponse } from '../../utils/global/sendResponse';
import { ListingServices } from './listing.service';

// Create listing
const createListingController = asyncHandler(async (req, res) => {
  const listingPayload = req.body;
  const { identifier } = req.user;
  const createdListing = await ListingServices.createListingIntoDB(
    listingPayload,
    identifier,
  );
  sendResponse(res, {
    success: true,
    message: 'Listing is created successfully',
    statusCode: 201,
    data: createdListing,
  });
});

// Get all listing
const getAllListingsController = asyncHandler(async (req, res) => {
  const result = await ListingServices.getAllListingsFromDB();
  sendResponse(res, {
    success: true,
    message: 'Listings are retrieved successfully',
    statusCode: 200,
    data: result,
  });
});

// Get Listings By Category
const getListingsByCategoryController = asyncHandler(async (req, res) => {
  const category = req.params.category;
  const listings = await ListingServices.getListingsByCategoryFromDB(category);
  sendResponse(res, {
    success: true,
    message: 'Listings have been successfully retrieved by category.',
    statusCode: 200,
    data: listings,
  });
});

// Get Listing by User
const getListingsByParticularUserController = asyncHandler(async (req, res) => {
  const { identifier } = req.user;
  const listings =
    await ListingServices.getListingsByParticularUserFromDB(identifier);

  sendResponse(res, {
    success: true,
    message: 'Particular user wise listings are retrieved successfully',
    statusCode: 200,
    data: listings,
  });
});

export const ListingControllers = {
  createListingController,
  getAllListingsController,
  getListingsByCategoryController,
  getListingsByParticularUserController,
};
