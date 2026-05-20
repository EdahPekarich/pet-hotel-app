const express = require("express");
const router = express.Router();

const {
  createHotel,
  getHotels,
  getHotelById,
  getBookedDates,
  getHostAnalytics,
} = require("../controllers/hotelController");

const protect = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");


// ---------------- PUBLIC ROUTES ----------------

// GET ALL HOTELS
router.get("/", getHotels);


// 🔥 IMPORTANT: STATIC ROUTES MUST BE BEFORE ":id"
router.get("/analytics", protect, role("HOST"), getHostAnalytics);


// GET BOOKED DATES (must be before /:id)
router.get("/:id/booked-dates", getBookedDates);


// GET SINGLE HOTEL (LAST dynamic route)
router.get("/:id", getHotelById);


// ---------------- PROTECTED (HOST ACTIONS) ----------------

// CREATE HOTEL
router.post("/", protect, role("HOST"), createHotel);


module.exports = router;
