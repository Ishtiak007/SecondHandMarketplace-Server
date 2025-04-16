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

export const ListingControllers = {
  createListingController,
  getAllListingsController,
};
