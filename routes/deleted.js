import express from "express";
import {
  restoreDeletedItem,
  getAllDeletedItems,
  hardDeleteItem,
} from "../controllers/deleted.js";

const router = express.Router();

//Restore Deleted Item
router.patch("/:id", restoreDeletedItem);

//View All Deleted Items
router.get("/", getAllDeletedItems);

//Hard Delete an Item
router.delete("/:id", hardDeleteItem);

export default router;
