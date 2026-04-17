const express = require("express");
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  getHostBookings,
  cancelBooking,
  getHostAnalytics,
  approveBooking,
  rejectBooking
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");

// USER
router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);

// HOST
router.get("/host", protect, getHostBookings);

// APPROVAL SYSTEM (HOST)
router.put("/:id/approve", protect, approveBooking);
router.put("/:id/reject", protect, rejectBooking);

// OPTIONAL
router.delete("/:id", protect, cancelBooking);

router.get("/analytics", protect, getHostAnalytics);

module.exports = router;