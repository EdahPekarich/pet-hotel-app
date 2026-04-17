const Hotel = require("../models/Hotel");

// CREATE HOTEL (HOST ONLY)
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

// GET ALL HOTELS (PUBLIC)
exports.getHotels = async (req, res) => {
  try {
    const { city, country, minPrice, maxPrice, petType, sortBy } = req.query;

    let filter = {};

    if (city) filter["location.city"] = { $regex: city, $options: "i" };
    if (country) filter["location.country"] = { $regex: country, $options: "i" };

    if (minPrice || maxPrice) {
      filter.pricePerNight = {};
      if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
    }

    if (petType) filter.petTypes = petType;

    let query = Hotel.find(filter);

    if (sortBy === "price_asc") query = query.sort({ pricePerNight: 1 });
    if (sortBy === "price_desc") query = query.sort({ pricePerNight: -1 });
    if (sortBy === "rating") query = query.sort({ rating: -1 });

    const hotels = await query;

    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET MY HOTELS (HOST DASHBOARD)
exports.getMyHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({ owner: req.user.id });
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE HOTEL (ONLY OWNER)
exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    if (hotel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE HOTEL (ONLY OWNER)
exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    if (hotel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await hotel.deleteOne();

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getBookedDates = async (req, res) => {
  try {
    const bookings = await Booking.find({
      hotel: req.params.id,
      status: "APPROVED"
    });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};