const express = require("express");
const router = express.Router();

const {
  createHotel,
  getHotels,
  getHotelById,
  getBookedDates,
} = require("../controllers/hotelController");

const protect = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");


// ---------------- PUBLIC ----------------

// GET ALL HOTELS
router.get("/", getHotels);

// GET SINGLE HOTEL (MORA BITI PRIJE /:id/anything)
router.get("/:id", getHotelById);

// GET BOOKED DATES
router.get("/:id/booked-dates", getBookedDates);


// ---------------- PROTECTED (HOST) ----------------

// CREATE HOTEL
router.post("/", protect, role("HOST"), createHotel);


module.exports = router;
