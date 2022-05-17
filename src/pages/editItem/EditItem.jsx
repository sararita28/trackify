import "regenerator-runtime/runtime.js";
import React, { useState, useEffect } from "react";
import "./editItem.css";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation } from "react-router";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

export default function EditItem() {
  const loc = useLocation();
  const id = loc.pathname.split("/")[2];
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [numberOfUnits, setNumberOfUnits] = useState(0);
  const { data } = useFetch("constants");
  const categories = data.categories,
    locations = data.locations;
  const [itemEdited, setItemEdited] = useState(false);

  useEffect(() => {
    const getItem = async () => {
      const res = await axios.get("/inventory/" + id);
      setCategory(res.data.category);
      setLocation(res.data.location);
      setNumberOfUnits(res.data.numberOfUnits);
    };
    getItem();
  }, [id]);

  const handleEdit = async () => {
    try {
      await axios.put("/inventory/" + id, {
        category: category,
        location: location,
        numberOfUnits: numberOfUnits,
      });
      setItemEdited(true);
      window.location.replace("/inventory/" + id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/inventory/" + id);
      window.location.replace("/inventory");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="editItemContainer">
      <div id="editItemWrapper">
        <h1 id="editItemHeader">SINGLE ITEM</h1>
        <div id="editItemTableWrapper">
          <table id="editItemTable">
            <thead>
              <tr>
                <th>ID</th>
                <th className="moveRightABit">CATEGORY</th>
                <th>LOCATION</th>
                <th>#UNITS</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr className="tableRow">
                <td>{id}</td>

                <td className="moveRightABit">
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    className="editItemInput"
                  >
                    {categories?.map((category) => (
                      <option>{category}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    className="editItemInput"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  >
                    {locations?.map((location) => (
                      <option>{location}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    className="editItemInput"
                    value={numberOfUnits}
                    onChange={(e) => {
                      setNumberOfUnits(e.target.value);
                    }}
                  ></input>
                </td>
                <td>
                  <div id="editItemStatus" className="editItemActiveStatus">
                    ACTIVE
                  </div>
                </td>
                <td>
                  <SaveIcon
                    onClick={handleEdit}
                    className="editItemActionIcon saveIcon"
                  />
                  <DeleteIcon
                    onClick={handleDelete}
                    className="editItemActionIcon deleteItemIcon"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          {itemEdited && (
            <span style={{ color: "green" }}>Item successfully edited.</span>
          )}
        </div>
      </div>
    </div>
  );
}
