const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();

const app = express();

connectDB();

// ------------------- CORS FIX (PRODUCTION SAFE) -------------------

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://pet-hotel-app-phi.vercel.app",
  "https://pet-hotel-1g2asunf9-pekis-projects-b3a1c871.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow tools like Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS blocked: " + origin));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// 🔥 IMPORTANT: preflight requests fix
app.options("*", cors());

// ------------------- BODY -------------------
app.use(express.json());

// ------------------- ROUTES -------------------
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);

// ------------------- HEALTH CHECK -------------------
app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});

// ------------------- START SERVER -------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
