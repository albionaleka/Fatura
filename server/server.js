import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongo.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["set-cookie"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}. http://localhost:${PORT}`);
});
