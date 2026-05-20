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
const role = require("../middleware/roleMiddleware");


// ---------------- USER ----------------
router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.delete("/:id", protect, cancelBooking);


// ---------------- HOST ----------------
router.get("/host", protect, role("HOST"), getHostBookings);

router.put("/:id/approve", protect, role("HOST"), approveBooking);
router.put("/:id/reject", protect, role("HOST"), rejectBooking);

router.get("/analytics", protect, role("HOST"), getHostAnalytics);

module.exports = router;
