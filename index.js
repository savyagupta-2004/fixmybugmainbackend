import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";

config();
const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://fixmybug.netlify.app",
];
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

//use cors before rate limiting, not to limit cors preflight requests
app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  return res.end("Hello, world!");
});

app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running at https://fixmybug-backend.vercel.app}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
