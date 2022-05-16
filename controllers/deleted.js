import InventoryItemSchema from "../models/InventoryItem.js";

//controller to restore item (this should restore deleted items)
export const restoreDeletedItem = async (req, res) => {
  try {
    const item = await InventoryItemSchema.findById(req.params.id);
    item.restore();
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json(err);
  }
};

//controller to get all deleted items
export const getAllDeletedItems = async (req, res) => {
  try {
    const items = await InventoryItemSchema.find({ deleted: true });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
};

//controller to hard delete an item
export const hardDeleteItem = async (req, res) => {
  try {
    await InventoryItemSchema.findByIdAndDelete(req.params.id);
    res.status(200).json(`Item has been deleted`);
  } catch (err) {
    res.status(500).json(err);
  }
};
