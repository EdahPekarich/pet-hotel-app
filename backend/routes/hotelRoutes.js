const express = require("express");
const router = express.Router();

const {
  createHotel,
  getHotels,
  getHotelById,   // 🔥 DODANO
  getBookedDates,
} = require("../controllers/hotelController");

const protect = require("../middleware/authMiddleware");

// CREATE HOTEL
router.post("/", protect, createHotel);

// GET ALL HOTELS
router.get("/", getHotels);

// 🔥 GET SINGLE HOTEL (FIX ZA 404)
router.get("/:id", getHotelById);

// GET BOOKED DATES
router.get("/:id/booked-dates", getBookedDates);

module.exports = router;
