const express = require("express");
const router = express.Router();

const {
  createHotel,
  getHotels,
  getHotelById,
  getBookedDates,
  getHostAnalytics   // 🔥 DODAJ OVO
} = require("../controllers/hotelController");

const protect = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// CREATE HOTEL
router.post("/", protect, createHotel);

// GET ALL HOTELS
router.get("/", getHotels);

// 🔥 ANALYTICS MORA BITI PRVO (BITNO!)
router.get("/analytics", protect, role("HOST"), getHostAnalytics);

// GET SINGLE HOTEL
router.get("/:id", getHotelById);

// GET BOOKED DATES
router.get("/:id/booked-dates", getBookedDates);

module.exports = router;
