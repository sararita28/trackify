import "regenerator-runtime/runtime.js";
import React, { useState } from "react";
import "./inventory.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";

export default function Inventory() {
  const { data, loading } = useFetch("inventory");
  const [modalOpen, setModalOpen] = useState(false);
  const [comments, setComments] = useState("");
  const [itemDeleted, setItemDeleted] = useState(false);
  const [itemId, setItemId] = useState(null);
  const handleNewComment = async () => {
    try {
      await axios.put("/comment/" + itemId, {
        comments: comments,
      });
      window.location.replace("inventory");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    handleNewComment();
    try {
      await axios.delete("/inventory/" + id);
      setItemDeleted(true);
      window.location.replace("/inventory");
    } catch (err) {
      console.log(err);
    }
  };

  function handleOpenPopup(id) {
    setItemId(id);
    setModalOpen(true);
  }

  function handleClosePopup() {
    setModalOpen(false);
  }

  function displayModal() {
    return (
      <div id="modal" className="modal">
        <div className="modal_content">
          {itemDeleted && (
            <span style={{ color: "red" }}>Item successfully deleted.</span>
          )}
          <span
            onClick={handleClosePopup}
            id="closePopup"
            className="closePopup"
          >
            &times;{" "}
          </span>
          <p className="popupText">
            Are you sure you want to delete this item ?
          </p>
          <div>
            <button
              onClick={() => handleDelete(itemId)}
              className="popupButton"
            >
              Yes
            </button>
            <button onClick={handleClosePopup} className="popupButton">
              No
            </button>
          </div>
          <input
            value={comments}
            onChange={(e) => {
              setComments(e.target.value);
            }}
            className="addDeleteComments"
            placeholder="Add optional comments to your delete"
          ></input>
        </div>
      </div>
    );
  }
  return (
    <>
      <div id="inventoryContainer">
        <div id="inventoryWrapper">
          <div id="inventoryFlex">
            <h1 id="inventoryHeader"> INVENTORY ITEMS</h1>
            <button id="deletedAddItemButton">
              <AddIcon id="deletedAddItemIcon" />
              <Link to="/createItem" className="links">
                ADD ITEM
              </Link>
            </button>
          </div>
          <div id="inventoryTableWrapper">
            <table id="inventoryTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CATEGORY</th>
                  <th>LOCATION</th>
                  <th>#UNITS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              {loading ? (
                "Loading... Please wait"
              ) : (
                <>
                  {data.map((item) => (
                    <tbody>
                      <tr className="tableRow">
                        <td>{item._id}</td>
                        <td>{item.category}</td>
                        <td>
                          <div>{item.location}</div>
                        </td>
                        <td>{item.numberOfUnits}</td>
                        <td>
                          <Tooltip title="View Item">
                            <Link to={`/inventory/${item._id}`}>
                              <RemoveRedEyeIcon className="inventoryActionIcon" />
                            </Link>
                          </Tooltip>
                          <Tooltip title="Edit Item">
                            <Link to={`/editItem/${item._id}`}>
                              <EditIcon className="inventoryActionIcon" />
                            </Link>
                          </Tooltip>
                          <Tooltip title="Delete Item">
                            <DeleteIcon
                              onClick={() => handleOpenPopup(item._id)}
                              className="inventoryActionIcon deleteItemIcon"
                            />
                          </Tooltip>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                  {modalOpen && displayModal()}
                </>
              )}
            </table>
          </div>
        </div>
        {data.length < 1 && loading == false ? (
          <span className="emptyList">
            There are no items in the inventory. Please add some to view them
            here.
          </span>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
