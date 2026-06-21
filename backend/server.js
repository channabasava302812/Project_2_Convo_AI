import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
// const cookieParser = require("cookie-parser");

import cookieParser from "cookie-parser";
// const authRoute = require("./routes/AuthRoute");
import { authRoute } from "./routes/AuthRoute.js";

import chatRouter from "./routes/chat.js";

const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connDB();
});

const connDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to DB successfuly!");
  } catch (err) {
    console.log("Failed to connect", err);
  }
};

app.use(
  cors({
    origin: ["http://localhost:5173", "https://project-2-convo-ai.vercel.app"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRoute);
app.use("/api", chatRouter);
