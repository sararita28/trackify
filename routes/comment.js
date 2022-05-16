import express from "express";
import { editComment, deleteComment } from "../controllers/comment.js";
const router = express.Router();

//Edit & create Comment
router.put("/:id", editComment);

//Delete Comment
router.delete("/:id", deleteComment);

export default router;
