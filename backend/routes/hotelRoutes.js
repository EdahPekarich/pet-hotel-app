const express = require("express");
const router = express.Router();

const {
  createHotel,
  getHotels,
  getBookedDates 
} = require("../controllers/hotelController");

const protect = require("../middleware/authMiddleware");

// CREATE HOTEL
router.post("/", protect, createHotel);

// SEARCH HOTELS (PUBLIC)
router.get("/", getHotels);
router.get("/:id/booked-dates", getBookedDates);
module.exports = router;