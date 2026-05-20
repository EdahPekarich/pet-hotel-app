const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");
const Notification = require("../models/Notification");
// CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const { hotelId, checkIn, checkOut } = req.body;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

  const existingBooking = await Booking.findOne({
  hotel: hotelId,
  status: "APPROVED", // 🔥 KLJUČNO
  $or: [
    {
      checkIn: { $lte: checkOut },
      checkOut: { $gte: checkIn },
    },
  ],
});

    if (existingBooking) {
      return res.status(400).json({
        message: "Hotel already booked for these dates",
      });
    }

    const days =
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);

    const totalPrice = days * hotel.pricePerNight;

    const booking = await Booking.create({
      user: req.user.id,
      hotel: hotelId,
      checkIn,
      checkOut,
      totalPrice,
    status: "PENDING"

    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// MY BOOKINGS
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("hotel");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// HOST BOOKINGS
exports.getHostBookings = async (req, res) => {
  try {
    const hotels = await Hotel.find({ owner: req.user.id });

    const hotelIds = hotels.map((h) => h._id);

    const bookings = await Booking.find({
      hotel: { $in: hotelIds },
    }).populate("user hotel");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CANCEL BOOKING
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await booking.deleteOne();

    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("hotel");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 🔥 SAMO OWNER MOŽE APPROVE
    if (booking.hotel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
// 🔥 provjeri da li već postoji approved booking u tom terminu
const conflict = await Booking.findOne({
  hotel: booking.hotel._id,
  status: "APPROVED",
  _id: { $ne: booking._id }, // ignoriši trenutni booking
  $or: [
    {
      checkIn: { $lte: booking.checkOut },
      checkOut: { $gte: booking.checkIn },
    },
  ],
});

if (conflict) {
  return res.status(400).json({
    message: "Dates already booked!",
  });
}
    booking.status = "APPROVED";
    await booking.save();

    await Notification.create({
      user: booking.user,
      message: "Your booking was APPROVED 🎉",
      type: "APPROVAL"
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("hotel");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // owner check (sigurno)
    if (!booking.hotel || booking.hotel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = "REJECTED";
    await booking.save();

    res.json(booking);

  } catch (err) {
    console.log("REJECT ERROR:", err); // 🔥 bitno za debug
    res.status(500).json({ error: err.message });
  }
};
// ANALYTICS
exports.getHostAnalytics = async (req, res) => {
  try {
    const hotels = await Hotel.find({ owner: req.user.id });
    const hotelIds = hotels.map((h) => h._id);

    const bookings = await Booking.find({
      hotel: { $in: hotelIds },
    });

    const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

    res.json({
      totalBookings: bookings.length,
      totalRevenue,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
