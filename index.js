import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import { Server } from "socket.io";
import http from "http";
import Message from "./models/Message.js"; // Import the Message model

config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://fixmybug.netlify.app",
  "https://fixmybug-backend.vercel.app",
  "https://fixmybug.me",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies to be sent
  allowedHeaders: "Content-Type, Authorization",
};
app.options("*", cors(corsOptions)); // Handle preflight requests

app.use(express.json());

app.get("/", (req, res) => {
  return res.end("Hello, world!");
});

// Auth routes
app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);

// MongoDB connection and server startup
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log("Server running at https://fixmybug-backend.vercel.app")
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
