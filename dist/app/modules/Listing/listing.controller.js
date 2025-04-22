"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingControllers = void 0;
const asyncHandler_1 = require("../../utils/global/asyncHandler");
const sendResponse_1 = require("../../utils/global/sendResponse");
const listing_service_1 = require("./listing.service");
// Create listing
const createListingController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listingPayload = req.body;
    const { identifier } = req.user;
    const createdListing = yield listing_service_1.ListingServices.createListingIntoDB(listingPayload, identifier);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Listing is created successfully',
        statusCode: 201,
        data: createdListing,
    });
}));
// Get all listing
const getAllListingsController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield listing_service_1.ListingServices.getAllListingsFromDB();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Listings are retrieved successfully',
        statusCode: 200,
        data: result,
    });
}));
// Get Listings By Category
const getListingsByCategoryController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.category;
    const listings = yield listing_service_1.ListingServices.getListingsByCategoryFromDB(category);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Listings have been successfully retrieved by category.',
        statusCode: 200,
        data: listings,
    });
}));
// Get Listing by User
const getListingsByParticularUserController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier } = req.user;
    const listings = yield listing_service_1.ListingServices.getListingsByParticularUserFromDB(identifier);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Particular user wise listings are retrieved successfully',
        statusCode: 200,
        data: listings,
    });
}));
// Get listings by ID
const getListingByIdController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const listing = yield listing_service_1.ListingServices.getListingByIdFromDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Particular listing is retrieved successfully',
        statusCode: 200,
        data: listing,
    });
}));
// Update listing by ID
const updateListingByIdController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedPayload = req.body;
    const { identifier } = req.user;
    const updatedListing = yield listing_service_1.ListingServices.updateListingByIdIntoDB(id, updatedPayload, identifier);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Listing is updated successfully',
        statusCode: 200,
        data: updatedListing,
    });
}));
// Update listing Status by Id
const updateListingStatusByIdController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { identifier } = req.user;
    const { status } = req.body;
    const updatedListingStatus = yield listing_service_1.ListingServices.updateListingStatusByIdIntoDB(id, status, identifier);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Updated the listing status successfully',
        statusCode: 200,
        data: updatedListingStatus,
    });
}));
// Delete listing by id
const deleteListingByIdController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { identifier } = req.user;
    const deletedListing = yield listing_service_1.ListingServices.deleteListingByIdFromDB(id, identifier);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'This Listing is deleted successfully',
        statusCode: 200,
        data: deletedListing,
    });
}));
// // Delete listing by admin
// const deleteListingByAdmin = asyncHandler(async (req, res) => {
//   const id = req.params.id;
//   const { identifier } = req.user;
//   await ListingServices.deleteListingByAdminFromDB(id, identifier);
//   sendResponse(res, {
//     success: true,
//     message: 'Listing deleted successfully by Admin',
//     statusCode: 200,
//     data: {},
//   });
// });
const deleteListingByAdmin = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { identifier } = req.user;
    yield listing_service_1.ListingServices.deleteListingByAdminFromDB(id, identifier);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Listing deleted successfully by Admin',
        statusCode: 200,
        data: {},
    });
}));
// Update listing status by admin
const updateListingStatusByAdminController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { identifier } = req.user;
    const { status } = req.body;
    const updatedListingStatus = yield listing_service_1.ListingServices.updateListingStatusByAdminIntoDB(id, status, identifier);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Updated the listing status successfully by Admin',
        statusCode: 200,
        data: updatedListingStatus,
    });
}));
// Update listing by admin
const updateListingByAdminController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { identifier } = req.user; // Admin's identifier (used for authorization)
    const updateData = req.body; // The fields to be updated in the listing
    const updatedListing = yield listing_service_1.ListingServices.updateListingByAdminIntoDB(id, updateData, identifier);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Listing updated successfully by Admin',
        statusCode: 200,
        data: updatedListing,
    });
}));
exports.ListingControllers = {
    createListingController,
    getAllListingsController,
    getListingsByCategoryController,
    getListingsByParticularUserController,
    getListingByIdController,
    updateListingByIdController,
    updateListingStatusByIdController,
    deleteListingByIdController,
    deleteListingByAdmin,
    updateListingStatusByAdminController,
    updateListingByAdminController,
};
