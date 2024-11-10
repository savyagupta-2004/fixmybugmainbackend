import Message from "../models/Message.js";
import Room from "../models/Room.js";
// Create a new room
export const createRoom = async (req, res) => {
  try {
    const { name, participants } = req.body;
    const room = new Room({ name, participants });
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: "Failed to create room", error });
  }
};

// Fetch messages for a room
export const getRoomMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await Message.find({ roomId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error });
  }
};

// Send a new message
export const sendMessage = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { sender, text } = req.body;
    const message = new Message({ roomId, sender, text });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error });
  }
};

// Delete a message by ID
export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete message", error });
  }
};

export const createPrivateRoom = async (req, res) => {
  try {
    const { userId, bugfixerId } = req.body;

    // Check if the room already exists between these two users
    let room = await Room.findOne({
      participants: { $all: [userId, bugfixerId] },
    });

    if (room) {
      return res.status(200).json(room); // Return existing room if it already exists
    }

    // Create a new private room
    const roomName = `${userId}-${bugfixerId}`; // Or any other logic to generate a unique room name
    room = new Room({
      name: roomName,
      participants: [userId, bugfixerId],
    });

    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: "Failed to create private room", error });
  }
};

export const sendMessageToPrivateRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { sender, text } = req.body;

    // Validate the room and participants before sending the message
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const message = new Message({ roomId, sender, text });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error });
  }
};

export const getPrivateRoomMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error });
  }
};
