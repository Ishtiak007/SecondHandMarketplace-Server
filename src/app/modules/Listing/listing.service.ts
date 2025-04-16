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

export const ListingServices = {
  createListingIntoDB,
  getAllListingsFromDB,
  getListingsByCategoryFromDB,
  getListingsByParticularUserFromDB,
  getListingByIdFromDB,
  updateListingByIdIntoDB,
};
