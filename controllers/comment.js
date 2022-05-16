import InventoryItemSchema from "../models/InventoryItem.js";

//controller to create comment
export const createComment = async (req, res) => {
  try {
    const item = await InventoryItemSchema.findByIdAndUpdate(req.params.id);
    const savedItem = await newComment.save();
    res.status(200).json(savedItem);
  } catch (err) {
    res.status(500).json(err);
  }
};

//controller to edit comment
export const editComment = async (req, res) => {
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

//controller to  delete a comment
export const deleteComment = async (req, res) => {
  try {
    const editedItem = await InventoryItemSchema.findByIdAndUpdate(
      req.params.id,
      { $unset: { comments: "" } },
      { new: true }
    );
    res.status(200).json(editedItem);
  } catch (err) {
    res.status(500).json(err);
  }
};
