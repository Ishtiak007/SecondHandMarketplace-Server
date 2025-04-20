/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateQuery } from 'mongoose';
import { HttpError } from '../../errors/HttpError';
import { User } from '../User/user.model';
import { TListing } from './listing.interface';
import { Listing } from './listing.model';

// Create listing
const createListingIntoDB = async (payload: TListing, identifier: string) => {
  const user = await User.findOne({ identifier: identifier });
  if (!user) {
    throw new HttpError(404, 'This user is not found');
  }
  payload.userID = user?._id;
  const createdListing = await Listing.create(payload);
  return createdListing;
};

// Get all listings
const getAllListingsFromDB = async () => {
  const listings = await Listing.find().populate(
    'userID',
    '_id name identifier role',
  );
  if (listings.length === 0) {
    throw new HttpError(404, 'There are no listings in the database.');
  }
  return listings;
};

// Get Listings By Category
const getListingsByCategoryFromDB = async (category: string) => {
  const listings = await Listing.find({ category });
  if (listings.length === 0) {
    throw new HttpError(404, 'There are no listings in the database.');
  }
  return listings;
};

// Get Listings by user
const getListingsByParticularUserFromDB = async (identifier: string) => {
  const user = await User.isUserExists(identifier);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  const listings = await Listing.find({ userID: user._id }).populate(
    'userID',
    '_id name identifier role',
  );
  if (listings.length === 0) {
    throw new HttpError(
      404,
      'There are no listings in the database provide this user',
    );
  }
  return listings;
};

// Get listing by ID
const getListingByIdFromDB = async (id: string) => {
  const listing = await Listing.findById(id).populate(
    'userID',
    '_id name identifier role',
  );
  if (!listing) {
    throw new HttpError(404, 'No listing found with this ID');
  }
  return listing;
};

// Update listing by id
const updateListingByIdIntoDB = async (
  id: string,
  payload: Partial<TListing>,
  identifier: string,
) => {
  const userExists = await User.isUserExists(identifier);
  if (!userExists) {
    throw new HttpError(404, 'This user not found');
  }
  const user = await User.findOne({ identifier: identifier });
  if (!user) {
    throw new HttpError(404, 'This user not found');
  }
  const listing = await Listing.findOne({ _id: id, userID: user._id });
  if (!listing) {
    throw new HttpError(
      403,
      'You do not have permission to update this listing.',
    );
  }
  const updatedListing = await Listing.findOneAndUpdate(
    { _id: id, isDeleted: false },
    payload,
    { new: true, runValidators: true },
  );
  if (!updatedListing) {
    throw new HttpError(404, 'No listing found with this ID');
  }
  return updatedListing;
};

// updateListingStatusByIdController
const updateListingStatusByIdIntoDB = async (
  id: string,
  status: string,
  identifier: string,
) => {
  // check if user exists
  const user = await User.isUserExists(identifier);
  if (!user) throw new HttpError(404, 'User not found');

  // update listing status
  const updatedListingStatus = await Listing.findOneAndUpdate(
    { _id: id, userID: user._id },
    { status },
    { runValidators: true, new: true },
  );

  if (!updatedListingStatus)
    throw new HttpError(
      403,
      'You do not have permission to update this listing status',
    );

  return updatedListingStatus;
};

// Delete listing by id
const deleteListingByIdFromDB = async (id: string, identifier: string) => {
  const userExists = await User.isUserExists(identifier);
  if (!userExists) {
    throw new HttpError(404, 'User not found');
  }
  const user = await User.findOne({ identifier: identifier });
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  const listing = await Listing.findOne({ _id: id, userID: user._id });
  if (!listing) {
    throw new HttpError(403, 'You are not allowed to delete this listing');
  }
  const deletedListing = await Listing.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true },
  );
  return deletedListing;
};

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
const deleteListingByAdminFromDB = async (id: string, identifier: string) => {
  const user = await User.isUserExists(identifier);
  if (!user) {
    throw new HttpError(404, 'This User is not found');
  }
  if (user.role !== 'admin') {
    throw new HttpError(
      403,
      'Sorry, you’re not authorized to delete this listing.',
    );
  }
  const deletedListing = await Listing.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true },
  );
  if (!deletedListing) {
    throw new HttpError(404, 'No listings were found in the database.');
  }
  return deletedListing;
};

// Update listing status in the database by admin
const updateListingStatusByAdminIntoDB = async (
  id: any,
  status: any,
  identifier: string,
) => {
  const user = await User.isUserExists(identifier);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  if (user.role !== 'admin') {
    throw new HttpError(
      403,
      'You do not have permission to update this listing status',
    );
  }

  const updatedListingStatus = await Listing.findOneAndUpdate(
    { _id: id },
    { status },
    { new: true, runValidators: true },
  );

  if (!updatedListingStatus) {
    throw new HttpError(404, 'Listing not found');
  }

  return updatedListingStatus;
};

// Update listing by admin
const updateListingByAdminIntoDB = async (
  id: any,
  updateData: UpdateQuery<TListing> | undefined,
  identifier: string,
) => {
  const user = await User.isUserExists(identifier); // Check if the admin exists
  if (!user) throw new HttpError(404, 'User not found');
  if (user.role !== 'admin')
    throw new HttpError(403, 'Only admins can update listings');

  const updatedListing = await Listing.findOneAndUpdate(
    { _id: id }, // Find the listing by ID
    updateData, // The fields to update (e.g., status, title, description, etc.)
    { new: true, runValidators: true }, // Return the updated document and validate
  );

  if (!updatedListing) {
    throw new HttpError(404, 'Listing not found');
  }

  return updatedListing;
};

export const ListingServices = {
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
