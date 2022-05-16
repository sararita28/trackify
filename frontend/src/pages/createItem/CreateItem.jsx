import "regenerator-runtime/runtime.js";
import React from "react";
import "./createItem.css";
import { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import useFetch from "../../hooks/useFetch";

export default function CreateItem() {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [numberOfUnits, setNumberOfUnits] = useState(0);
  const { data } = useFetch("constants");
  const [error, setError] = useState(false);
  const categories = data.categories,
    locations = data.locations;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      category: category,
      location: location,
      numberOfUnits: numberOfUnits,
    };

    try {
      const res = await axios.post("/inventory/", newItem);
      window.location.replace("/inventory/" + res.data._id);
    } catch (err) {
      setError(true);
      console.log(err);
    }
    axios.post("/inventory/");
  };

  return (
    <div id="createItemContainer">
      <div id="createItemWrapper">
        <h1 id="createItemHeader"> CREATE INVENTORY ITEM</h1>
        <form onSubmit={handleSubmit} id="createItemForm">
          <div className="createBlockItem">
            <Box>
              <FormControl className="createItemInput">
                <InputLabel>Category </InputLabel>
                <Select
                  value={category}
                  label="# Units"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((category) => (
                    <MenuItem value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl className="createItemInput">
                <InputLabel>Location</InputLabel>
                <Select
                  value={location}
                  label="Location"
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {locations?.map((location) => (
                    <MenuItem value={location}>{location}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              {" "}
              <FormControl className="createItemInput">
                <TextField
                  id="outlined-basic"
                  label="Number of Units"
                  onChange={(e) => setNumberOfUnits(e.target.value)}
                />
              </FormControl>
            </Box>{" "}
          </div>
          <button type="submit" id="createItemButton">
            Create Item
          </button>
        </form>
        {error && (
          <span
            style={{ color: "red", marginTop: "100px", marginLeft: "170px" }}
          >
            Something went wrong. Please make sure your input is valid.
          </span>
        )}
      </div>
    </div>
  );
}
