import express from "express";
import {
  getUser,
  loginUser,
  signupUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/:userId", getUser);

export default router;
