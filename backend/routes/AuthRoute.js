import express from "express";
import { Signup, Login } from "../Controllers/AuthController.js";
import { userVerification } from "../Middlewares/AuthMiddleWare.js";

const router = express.Router();
router.post("/", userVerification);

router.post("/signup", Signup);

router.post("/login", Login);

export { router as authRoute };

// const { Signup } = require("../Controllers/AuthController.js");
// const express = require("express");

// const router = express.Router();
// router.post("/signup", Signup);

// module.exports = router;
