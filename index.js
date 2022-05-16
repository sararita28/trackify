import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import inventoryRoute from "./routes/inventory.js";
import deletedRoute from "./routes/deleted.js";
import commentRoute from "./routes/comment.js";
import { constants } from "./constants.js";
const PORT = process.env.PORT || 3001;
const app = express();

dotenv.config();

//Database connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to database`);
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log(`Database disconnected`);
});

//Middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/inventory", inventoryRoute);
app.use("/deleted", deletedRoute);
app.use("/comment", commentRoute);
app.get("/constants", (req, res) => {
  res.send(constants);
});

app.listen(PORT, () => {
  connectToDatabase();
  console.log(`Connected to port ${PORT}`);
});
