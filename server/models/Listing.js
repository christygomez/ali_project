import mongoose from 'mongoose';

const ListingSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const ListingModel = mongoose.model('listingsAndReviews', ListingSchema);

module.exports = ListingModel;
