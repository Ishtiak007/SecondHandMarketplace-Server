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

export const ListingControllers = {
  createListingController,
};
