const Hotel = require("../models/Hotel");
const Booking = require("../models/Booking"); // 🔥 FIX

// CREATE HOTEL
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

// GET ALL HOTELS
exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE HOTEL
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

// GET BOOKED DATES
exports.getBookedDates = async (req, res) => {
  try {
    const bookings = await Booking.find({
      hotelId: req.params.id, // 🔥 FIXED
    });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
