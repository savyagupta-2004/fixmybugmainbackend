import mongoose from "mongoose";

// Room schema (modified to store user and bugfixer)
const roomSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Room name, could be "userId-bugfixerId"
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of participants (user and bugfixer)
  createdAt: { type: Date, default: Date.now },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
