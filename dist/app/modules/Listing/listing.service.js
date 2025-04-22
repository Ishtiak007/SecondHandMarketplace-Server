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
exports.ListingServices = void 0;
const HttpError_1 = require("../../errors/HttpError");
const user_model_1 = require("../User/user.model");
const listing_model_1 = require("./listing.model");
// Create listing
const createListingIntoDB = (payload, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ identifier: identifier });
    if (!user) {
        throw new HttpError_1.HttpError(404, 'This user is not found');
    }
    payload.userID = user === null || user === void 0 ? void 0 : user._id;
    const createdListing = yield listing_model_1.Listing.create(payload);
    return createdListing;
});
// Get all listings
const getAllListingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const listings = yield listing_model_1.Listing.find().populate('userID', '_id name identifier role');
    if (listings.length === 0) {
        throw new HttpError_1.HttpError(404, 'There are no listings in the database.');
    }
    return listings;
});
// Get Listings By Category
const getListingsByCategoryFromDB = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const listings = yield listing_model_1.Listing.find({ category });
    if (listings.length === 0) {
        throw new HttpError_1.HttpError(404, 'There are no listings in the database.');
    }
    return listings;
});
// Get Listings by user
const getListingsByParticularUserFromDB = (identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(identifier);
    if (!user) {
        throw new HttpError_1.HttpError(404, 'User not found');
    }
    const listings = yield listing_model_1.Listing.find({ userID: user._id }).populate('userID', '_id name identifier role');
    if (listings.length === 0) {
        throw new HttpError_1.HttpError(404, 'There are no listings in the database provide this user');
    }
    return listings;
});
// Get listing by ID
const getListingByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield listing_model_1.Listing.findById(id).populate('userID', '_id name identifier role');
    if (!listing) {
        throw new HttpError_1.HttpError(404, 'No listing found with this ID');
    }
    return listing;
});
// Update listing by id
const updateListingByIdIntoDB = (id, payload, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield user_model_1.User.isUserExists(identifier);
    if (!userExists) {
        throw new HttpError_1.HttpError(404, 'This user not found');
    }
    const user = yield user_model_1.User.findOne({ identifier: identifier });
    if (!user) {
        throw new HttpError_1.HttpError(404, 'This user not found');
    }
    const listing = yield listing_model_1.Listing.findOne({ _id: id, userID: user._id });
    if (!listing) {
        throw new HttpError_1.HttpError(403, 'You do not have permission to update this listing.');
    }
    const updatedListing = yield listing_model_1.Listing.findOneAndUpdate({ _id: id, isDeleted: false }, payload, { new: true, runValidators: true });
    if (!updatedListing) {
        throw new HttpError_1.HttpError(404, 'No listing found with this ID');
    }
    return updatedListing;
});
// updateListingStatusByIdController
const updateListingStatusByIdIntoDB = (id, status, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    // check if user exists
    const user = yield user_model_1.User.isUserExists(identifier);
    if (!user)
        throw new HttpError_1.HttpError(404, 'User not found');
    // update listing status
    const updatedListingStatus = yield listing_model_1.Listing.findOneAndUpdate({ _id: id, userID: user._id }, { status }, { runValidators: true, new: true });
    if (!updatedListingStatus)
        throw new HttpError_1.HttpError(403, 'You do not have permission to update this listing status');
    return updatedListingStatus;
});
// Delete listing by id
const deleteListingByIdFromDB = (id, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield user_model_1.User.isUserExists(identifier);
    if (!userExists) {
        throw new HttpError_1.HttpError(404, 'User not found');
    }
    const user = yield user_model_1.User.findOne({ identifier: identifier });
    if (!user) {
        throw new HttpError_1.HttpError(404, 'User not found');
    }
    const listing = yield listing_model_1.Listing.findOne({ _id: id, userID: user._id });
    if (!listing) {
        throw new HttpError_1.HttpError(403, 'You are not allowed to delete this listing');
    }
    const deletedListing = yield listing_model_1.Listing.findOneAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
    return deletedListing;
});
// Delete listing by admin
// const deleteListingByAdminFromDB = async (id: string, identifier: string) => {
//   const user = await User.isUserExists(identifier);
//   if (!user) {
//     throw new HttpError(404, 'This User is not found');
//   }
//   if (user.role !== 'admin') {
//     throw new HttpError(
//       403,
//       'Sorry, you’re not authorized to delete this listing.',
//     );
//   }
//   const deletedListing = await Listing.findOneAndUpdate(
//     { _id: id, isDeleted: false },
//     { isDeleted: true },
//     { new: true },
//   );
//   if (!deletedListing) {
//     throw new HttpError(404, 'No listings were found in the database.');
//   }
//   return deletedListing;
// };
const deleteListingByAdminFromDB = (id, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(identifier);
    if (!user) {
        throw new HttpError_1.HttpError(404, 'This User is not found');
    }
    if (user.role !== 'admin') {
        throw new HttpError_1.HttpError(403, 'Sorry, you’re not authorized to delete this listing.');
    }
    const deletedListing = yield listing_model_1.Listing.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!deletedListing) {
        throw new HttpError_1.HttpError(404, 'No listings were found in the database.');
    }
    return deletedListing;
});
// Update listing status in the database by admin
const updateListingStatusByAdminIntoDB = (id, status, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(identifier);
    if (!user) {
        throw new HttpError_1.HttpError(404, 'User not found');
    }
    if (user.role !== 'admin') {
        throw new HttpError_1.HttpError(403, 'You do not have permission to update this listing status');
    }
    const updatedListingStatus = yield listing_model_1.Listing.findOneAndUpdate({ _id: id }, { status }, { new: true, runValidators: true });
    if (!updatedListingStatus) {
        throw new HttpError_1.HttpError(404, 'Listing not found');
    }
    return updatedListingStatus;
});
// Update listing by admin
const updateListingByAdminIntoDB = (id, updateData, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(identifier); // Check if the admin exists
    if (!user)
        throw new HttpError_1.HttpError(404, 'User not found');
    if (user.role !== 'admin')
        throw new HttpError_1.HttpError(403, 'Only admins can update listings');
    const updatedListing = yield listing_model_1.Listing.findOneAndUpdate({ _id: id }, // Find the listing by ID
    updateData, // The fields to update (e.g., status, title, description, etc.)
    { new: true, runValidators: true });
    if (!updatedListing) {
        throw new HttpError_1.HttpError(404, 'Listing not found');
    }
    return updatedListing;
});
exports.ListingServices = {
    createListingIntoDB,
    getAllListingsFromDB,
    getListingsByCategoryFromDB,
    getListingsByParticularUserFromDB,
    getListingByIdFromDB,
    updateListingByIdIntoDB,
    updateListingStatusByIdIntoDB,
    deleteListingByIdFromDB,
    deleteListingByAdminFromDB,
    updateListingStatusByAdminIntoDB,
    updateListingByAdminIntoDB,
};
