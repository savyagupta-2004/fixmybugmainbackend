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

const allowedOrigins = [
  "http://localhost:5173",
  "https://fixmybug.netlify.app",
  "https://fixmybug-backend.vercel.app",
  "https://fixmybug.me",
];

// Debugging - Log origin for each request
const corsOptions = {
  origin: function (origin, callback) {
    console.log("Request origin:", origin); // Log origin
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      console.error("Blocked by CORS:", origin); // Log blocked origins
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Set global headers to ensure CORS headers are applied to all requests
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || !origin) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  next();
});

// Handle preflight requests globally
app.options("*", (req, res) => {
  console.log("Preflight request from origin:", req.headers.origin);
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204); // Respond to preflight with no content
});

app.use(express.json());

// Default route for debugging
app.get("/", (req, res) => {
  return res.end("Hello, world!");
});

// Auth routes
app.use("/auth", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use("/auth", authRoutes);

app.use("/messages", messageRoutes);

// MongoDB connection and server startup
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    const port = process.env.PORT || 3000; // Fallback to port 3000 if PORT is undefined
    server.listen(port, () => {
      console.log(`Server running at https://fixmybug-backend.vercel.app`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
