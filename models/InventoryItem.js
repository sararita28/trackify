import mongoose from "mongoose";
const { Schema } = mongoose;
import mongooseSoftDelete from "soft-delete-mongoose";

const InventoryItemSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  numberOfUnits: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
    required: false,
  },
});

//Mongoose soft delete plugin
InventoryItemSchema.plugin(mongooseSoftDelete, {
  paranoid: true,
});

export default mongoose.model("InventoryItem", InventoryItemSchema);
