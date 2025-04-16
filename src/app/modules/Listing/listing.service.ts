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

export const ListingServices = {
  createListingIntoDB,
};
