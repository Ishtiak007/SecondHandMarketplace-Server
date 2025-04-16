import { model, Schema } from 'mongoose';
import { TListing } from './listing.interface';
import {
  excludeDeletedAggregation,
  excludeDeletedQuery,
} from '../../utils/moduleSpecific/queryFilters';

const listingSchema = new Schema<TListing>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      enum: {
        values: ['new', 'likeNew', 'used', 'refurbished'],
        message: '{VALUE} is not a valid condition',
      },
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    userID: {
      type: Schema.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: {
        values: ['available', 'sold'],
        message: '{VALUE} is not a valid status',
      },
      default: 'available',
    },
    category: {
      type: String,
      enum: {
        values: [
          'home',
          'electronics',
          'books',
          'furniture',
          'tools',
          'office',
          'mobiles',
          'vehicles',
          'property',
          'pets',
          'cloths',
          'sports',
          'toys',
          'beauty',
          'fashion',
          'music',
          'gaming',
          'groceries',
          'baby',
          'art',
          'garden',
          'jewelry',
          'health',
          'watches',
          'travel',
        ],
        message: '{VALUE} is not a valid category',
      },
    },
    brand: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    negotiable: {
      type: String,
      enum: {
        values: ['yes', 'no'],
        message: '{VALUE} is not a valid negotiable',
      },
    },
    warranty: {
      type: String,
    },
    contactNumber: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// query middleware for soft delete by utils
listingSchema.pre('find', excludeDeletedQuery);
listingSchema.pre('findOne', excludeDeletedQuery);

// aggregation middleware for soft delete by utils
listingSchema.pre('aggregate', excludeDeletedAggregation);

export const Listing = model<TListing>('Listing', listingSchema);
