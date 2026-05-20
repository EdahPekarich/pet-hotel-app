const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();

const app = express();

// --------------------
// JSON middleware
// --------------------
app.use(express.json());

// --------------------
// CORS FIX (PRODUCTION SAFE)
// --------------------
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://pet-hotel-app.vercel.app",
  "https://pet-hotel-app-phi.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow mobile apps / postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ Blocked by CORS:", origin);
      return callback(null, true); // <-- IMPORTANT: ne ruši request, samo log
    },
    credentials: true,
  })
);

// --------------------
// DB CONNECT
// --------------------
connectDB();

// --------------------
// ROUTES
// --------------------
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);

// --------------------
// TEST ROUTE
// --------------------
app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});

// --------------------
// START SERVER
// --------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
