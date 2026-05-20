const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();

const app = express();

// middleware
app.use(cors({
  origin: "https://pet-hotel-app-git-main-pekis-projects-b3a1c871.vercel.app/"
}));
app.use(express.json());

// connect database
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
// test route

app.use("/api/bookings", bookingRoutes);
app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
