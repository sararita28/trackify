import "regenerator-runtime/runtime.js";
import React, { useState } from "react";
import "./deleted.css";
import RestoreIcon from "@mui/icons-material/Restore";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

export default function Deleted() {
  const { data, loading } = useFetch("deleted");
  const [itemDeleted, setItemDeleted] = useState(false);
  const [itemRestored, setItemRestored] = useState(false);

  const handleDelete = async (id) => {
    try {
      await axios.delete("/deleted/" + id);
      setItemDeleted(true);
      window.location.replace("/deleted");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.patch("/deleted/" + id);
      setItemRestored(true);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="deletedContainer">
      <div id="deleteddWrapper">
        <h1 id="deleteddHeader">DELETED INVENTORY ITEMS</h1>
        <div id="deletedTableWrapper">
          <table id="deletedTable">
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
                      <td id="deletedActionButtons">
                        {item.comments !== "" ? (
                          <Tooltip title="View Item">
                            <Link to={`/inventory/${item._id}`}>
                              <span>
                                <RemoveRedEyeIcon className="deleteActionIcon " />
                                <Tooltip title="Has comments">
                                  <span id="deletedCommentOn"> 1</span>
                                </Tooltip>
                              </span>
                            </Link>
                          </Tooltip>
                        ) : (
                          <Tooltip title="View Item">
                            <Link to={`/inventory/${item._id}`}>
                              <RemoveRedEyeIcon className="deleteActionIcon" />
                            </Link>
                          </Tooltip>
                        )}
                        <Tooltip title="Restore to Inventory">
                          <RestoreIcon
                            onClick={() => handleRestore(item._id)}
                            className="deleteActionIcon restoreItemIcon"
                          />
                        </Tooltip>
                        <Tooltip title="Permanently Delete">
                          <DeleteIcon
                            onClick={() => handleDelete(item._id)}
                            className="deleteActionIcon deleteItemIcon"
                          />
                        </Tooltip>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </>
            )}
          </table>
        </div>
      </div>
      {data.length < 1 ? (
        <span id="emptyDeletedList">
          There are currently no deleted items in the inventory.
        </span>
      ) : (
        ""
      )}
      {itemDeleted ? (
        <span style={{ color: "red" }}>Item permanently deleted.</span>
      ) : itemRestored ? (
        <span style={{ color: "green" }}>Item successfully restored.</span>
      ) : (
        ""
      )}
    </div>
  );
}
