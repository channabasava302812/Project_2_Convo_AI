import express from "express";
import Thread from "../models/Thread.js";
const router = express.Router();

import getOpenAIAPIResponse from "../utils/openai.js";

router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "xyzaa2",
      title: "Testing DB2!",
    });
    const response = await thread.save();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to save in DB" });
  }
});

router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch DB" });
  }
});

router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      res.status(404).json({ error: "Thread not found" });
    }

    res.json(thread.messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch DB" });
  }
});

router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const deleteThread = await Thread.findOneAndDelete({ threadId });
    if (!deleteThread) {
      res.status(404).json({ error: "Thread not found" });
    }
    res.status(200).json({ success: "Deleted successfuly" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch DB" });
  }
});

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;
  if (!threadId || !message) {
    return res.status(400).json({ error: "Missing threadId or message" });
  }
  try {
    let thread = await Thread.findOne({ threadId });
    if (!thread) {
      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }

    const assistentreply = await getOpenAIAPIResponse(message);
    thread.messages.push({ role: "assistant", content: assistentreply });
    thread.updatedAt = new Date();
    await thread.save();
    res.json({ reply: assistentreply });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
