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

// Get listings by ID
const getListingByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const listing = await ListingServices.getListingByIdFromDB(id);
  sendResponse(res, {
    success: true,
    message: 'Particular listing is retrieved successfully',
    statusCode: 200,
    data: listing,
  });
});

// Update listing by ID
const updateListingByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updatedPayload = req.body;
  const { identifier } = req.user;
  const updatedListing = await ListingServices.updateListingByIdIntoDB(
    id,
    updatedPayload,
    identifier,
  );
  sendResponse(res, {
    success: true,
    message: 'Listing is updated successfully',
    statusCode: 200,
    data: updatedListing,
  });
});

// Update listing Status by Id
const updateListingStatusByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { identifier } = req.user;
  const { status } = req.body;
  const updatedListingStatus =
    await ListingServices.updateListingStatusByIdIntoDB(id, status, identifier);
  sendResponse(res, {
    success: true,
    message: 'Updated the listing status successfully',
    statusCode: 200,
    data: updatedListingStatus,
  });
});

export const ListingControllers = {
  createListingController,
  getAllListingsController,
  getListingsByCategoryController,
  getListingsByParticularUserController,
  getListingByIdController,
  updateListingByIdController,
  updateListingStatusByIdController,
};
