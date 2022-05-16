import InventoryItemSchema from "../models/InventoryItem.js";

//controller to create item
export const createItem = async (req, res) => {
  const newItem = new InventoryItemSchema(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (err) {
    res.status(500).json(err);
  }
};

//controller to edit item
export const editItem = async (req, res) => {
  try {
    const editedItem = await InventoryItemSchema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(editedItem);
  } catch (err) {
    res.status(500).json(err);
  }
};

//controller to get an item (deleted or active)
export const getItem = async (req, res) => {
  try {
    const item = await InventoryItemSchema.findById(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json(err);
  }
};

//controller to get all active items
export const getAllActiveItems = async (req, res) => {
  try {
    const items = await InventoryItemSchema.find({ deleted: false });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
};

//controller to soft delete an item
export const softDeleteItem = async (req, res) => {
  try {
    const item = await InventoryItemSchema.findById(req.params.id);
    item.save(() => {
      item.destroy();
    });
    res.status(200).json(`Item has been deleted`);
  } catch (err) {
    res.status(500).json(err);
  }
};
