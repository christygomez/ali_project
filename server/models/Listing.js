const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
});

const ListingModel = mongoose.model('listingsAndReviews', ListingSchema);

module.exports = ListingModel;
