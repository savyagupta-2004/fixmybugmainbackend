import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import http from "http";

config();
const app = express();
const allowedOrigins = ["http://localhost:5173", "https://fixmybug.me"];
//we have to use corsoption inorder to remove the error
const corsOptions = {
  origin: function (origin, callback) {
    // Check if the origin is in the allowed origins list
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

app.use(cors(corsOptions));

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

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(
        `Server running at http://localhost:${process.env.PORT || 5000}`
      )
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
