import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ThreadIdSchema = new mongoose.Schema({
  threadId: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    default: "New Thread",
  },
  messages: [MessageSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Thread = mongoose.model("Thread", ThreadIdSchema);

export default Thread;
