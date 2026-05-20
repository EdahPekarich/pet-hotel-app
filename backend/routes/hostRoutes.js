const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createHotel,
  getMyHotels,
  updateHotel,
  deleteHotel,
  getHostAnalytics
} = require("../controllers/hotelController");


// ---------------- HOST ONLY ----------------
router.post("/", protect, role("HOST"), createHotel);

// IMPORTANT: specifične rute prije :id
router.get("/my", protect, role("HOST"), getMyHotels);
router.get("/analytics", protect, role("HOST"), getHostAnalytics);

router.put("/:id", protect, role("HOST"), updateHotel);
router.delete("/:id", protect, role("HOST"), deleteHotel);

module.exports = router;
