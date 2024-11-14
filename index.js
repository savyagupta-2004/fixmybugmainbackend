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
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const allowedOrigins = [
  "http://localhost:5173",
  "https://fixmybug.netlify.app",
  "https://fixmybug-backend.vercel.app",
  "http://fixmybug.me",
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
  credentials: true,
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinRoom", async ({ roomId, user }, callback) => {
    socket.join(roomId);
    console.log(`${user} joined room: ${roomId}`);

    // Fetch messages from the database for this room
    const messages = await Message.find({ roomId }).sort({ createdAt: 1 });
    socket.emit("previousMessages", messages); // Send previous messages to the user

    callback(true);
  });

  socket.on("leaveRoom", ({ roomId, user }, callback) => {
    socket.leave(roomId);
    console.log(`${user} left room: ${roomId}`);
    callback(true);
  });

  socket.on("message", async (message) => {
    // Save the message to the database
    const newMessage = new Message(message);
    await newMessage.save();

    // Broadcast the message to the room
    io.to(message.roomId).emit("message", message);
  });
});

// Default route
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
    server.listen(process.env.PORT, () =>
      console.log(`Server running at https://fixmybug-backend.vercel.app`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
