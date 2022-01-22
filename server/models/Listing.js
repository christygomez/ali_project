const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  property_type: {
    type: String,
  },
  address: {
    market: String,
    country: String,
  },
});

const ListingModel = mongoose.model('listingsandreviews', ListingSchema);

module.exports = ListingModel;
