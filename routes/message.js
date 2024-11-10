import express from "express";
import {
  createRoom,
  getRoomMessages,
  sendMessage,
  deleteMessage,
  createPrivateRoom,
  sendMessageToPrivateRoom,
  getPrivateRoomMessages,
} from "../controllers/message.js";
import Message from "../models/Message.js";
const router = express.Router();

router.post("/create-room", createRoom); // Endpoint to create a new room
router.get("/:roomId/messages", getRoomMessages); // Fetch messages for a specific room
router.post("/:roomId/message", sendMessage); // Send a new message to a room
router.delete("/messages/:messageId", deleteMessage);
router.post("/create-private-room", createPrivateRoom); // Endpoint to create a private room
router.post("/:roomId/message", sendMessageToPrivateRoom); // Send a message to private room
router.get("/:roomId/messages", getPrivateRoomMessages); // Get messages from private room

router.get("/:roomId", async (req, res) => {
  try {
    const messages = await Message.find({ roomId: req.params.roomId }).sort({
      timestamp: 1,
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
