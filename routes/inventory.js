import express from "express";
import {
  createItem,
  editItem,
  getAllActiveItems,
  getItem,
  softDeleteItem,
} from "../controllers/inventory.js";

const router = express.Router();

//Create Inventory Item
router.post("/", createItem);

//Edit Inventory Item
router.put("/:id", editItem);

//View Single Inventory Item
router.get("/:id", getItem);

//View All Inventory Items
router.get("/", getAllActiveItems);

//Soft Delete Inventory Item
router.delete("/:id", softDeleteItem);

export default router;
