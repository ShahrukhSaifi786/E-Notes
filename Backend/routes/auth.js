import express from "express";
import {
  signUpUser,
  loginUser,
  getUser,
} from "../Controller/userController.js";
import { fetchedUser } from "../middleware/fetchedUser.js";
const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.get("/getuser", fetchedUser, getUser);

export default router;
