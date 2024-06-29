import express from "express";
import { fetchedUser } from "../middleware/fetchedUser.js";
import {
  addNotes,
  deleteNotes,
  fetchedAllNotes,
  getOneNotes,
  updateNotes,
} from "../Controller/notesController.js";
const router = express.Router();
router.get("/fetchallnotes", fetchedUser, fetchedAllNotes);
router.post("/addnotes", fetchedUser, addNotes);
router.put("/updatenotes/:id", fetchedUser, updateNotes);
router.delete("/deletenotes/:id", fetchedUser, deleteNotes);
router.get("/notes/:id", fetchedUser, getOneNotes);
export default router;
