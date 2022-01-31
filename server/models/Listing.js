const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

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
  new_id: { type: mongoose.Schema.Types.ObjectId, default: new ObjectId() },
});

const ListingModel = mongoose.model('listingsandreviews', ListingSchema);

module.exports = ListingModel;
