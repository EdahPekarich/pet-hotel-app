const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getHostBookings,
  getHostAnalytics
} = require("../controllers/bookingController");

// ---------------- HOST ONLY ----------------

// sve booking stvari za hosta
router.get("/bookings", protect, role("HOST"), getHostBookings);

// analytics za dashboard
router.get("/analytics", protect, role("HOST"), getHostAnalytics);

module.exports = router;
