import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import http from "http";

config();
const app = express();
const server = http.createServer(app);

// Allow all origins temporarily
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Apply CORS middleware globally ONCE
app.use(cors(corsOptions));

// Simplify preflight request handling
app.options("*", cors(corsOptions));

// Use JSON parsing middleware
app.use(express.json());

// Basic route for debugging
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Auth routes
app.use("/auth", authRoutes);

// Message routes
app.use("/messages", messageRoutes);

// MongoDB connection and server startup
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
