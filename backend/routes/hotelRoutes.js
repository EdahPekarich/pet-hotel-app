const express = require("express");
const router = express.Router();

const {
  createHotel,
  getHotels,
  getHotelById,
  getBookedDates
} = require("../controllers/hotelController");

const protect = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// ---------------- PUBLIC ----------------
router.get("/", getHotels);

// booked dates
router.get("/:id/booked-dates", getBookedDates);

// single hotel (mora biti zadnja dinamička ruta)
router.get("/:id", getHotelById);

// ---------------- PROTECTED ----------------
router.post("/", protect, role("HOST"), createHotel);

module.exports = router;
