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
app.use(express.json());

// ✅ CORS FIX (production safe)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://pet-hotel-app.vercel.app",
  "https://pet-hotel-1g2asunf9-pekis-projects-b3a1c871.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed: " + origin));
    },
    credentials: true,
  })
);

// connect database
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);

// test route
app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
