const Hotel = require("../models/Hotel");
const Booking = require("../models/Booking");

// ---------------- CREATE HOTEL ----------------
exports.createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create({
      owner: req.user.id,
      name: req.body.name,
      description: req.body.description,
      pricePerNight: req.body.pricePerNight,
      capacity: req.body.capacity,
      petTypes: req.body.petTypes,
      location: {
        city: req.body.location?.city,
        country: req.body.location?.country,
        address: req.body.location?.address,
        coordinates: {
          lat: req.body.location?.coordinates?.lat,
          lng: req.body.location?.coordinates?.lng,
        },
      },
    });

    res.status(201).json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- GET ALL HOTELS (WITH SEARCH) ----------------
exports.getHotels = async (req, res) => {
  try {
    const { city, maxPrice, petType } = req.query;

    let filter = {};

    // CITY SEARCH (case-insensitive)
    if (city) {
      filter["location.city"] = { $regex: city, $options: "i" };
    }

    // PRICE FILTER
    if (maxPrice) {
      filter.pricePerNight = { $lte: Number(maxPrice) };
    }

    // PET TYPE FILTER
    if (petType) {
      filter.petTypes = petType;
    }

    const hotels = await Hotel.find(filter);

    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- GET SINGLE HOTEL ----------------
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- GET BOOKED DATES ----------------
exports.getBookedDates = async (req, res) => {
  try {
    const bookings = await Booking.find({
      hotel: req.params.id, // FIXED (bilo hotelId)
    });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- HOST ANALYTICS ----------------
exports.getHostAnalytics = async (req, res) => {
  try {
    const hotels = await Hotel.find({ owner: req.user.id });
    const hotelIds = hotels.map((h) => h._id);

    const bookings = await Booking.find({
      hotel: { $in: hotelIds },
      status: "APPROVED",
    });

    const totalRevenue = bookings.reduce(
      (sum, b) => sum + (b.totalPrice || 0),
      0
    );

    res.json({
      totalBookings: bookings.length,
      totalRevenue,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
