const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: String,

    description: String,

    location: {
      city: String,
      country: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },

    pricePerNight: Number,

    capacity: Number,

    petTypes: [String],

    rating: {
      type: Number,
      default: 0,
    },
    availability: [
  {
    startDate: Date,
    endDate: Date,
  }
],

    images: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);