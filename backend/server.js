const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();

const app = express();

// 🔥 ALLOW YOUR VERCEL FRONTEND
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://pet-hotel-app-phi.vercel.app",
  "https://pet-hotel-1g2asunf9-pekis-projects-b3a1c871.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// DB
connectDB();

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);

// TEST
app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
