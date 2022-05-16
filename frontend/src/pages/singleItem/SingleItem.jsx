import "regenerator-runtime/runtime.js";

import React, { useState } from "react";
import "./singleItem.css";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";

export default function SingleItem() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading } = useFetch(`inventory/${id}`);
  const [comments, setComments] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [commentEdited, setCommentEdited] = useState(false);
  const [commentDeleted, setCommentDeleted] = useState(false);
  const [itemDeleted, setItemDeleted] = useState(false);
  const [itemRestored, setItemRestored] = useState(false);

  const handleDelete = async () => {
    editComment();
    try {
      await axios.delete("/inventory/" + id);
      setItemDeleted(true);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  function handleOpenPopup(id) {
    setModalOpen(true);
  }

  function handleClosePopup() {
    setModalOpen(false);
  }

  const handleRestore = async () => {
    try {
      await axios.patch("/deleted/" + id);
      setItemRestored(true);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const editComment = async () => {
    try {
      await axios.put("/comment/" + id, {
        comments: comments,
      });
      if (comments !== "" && modalOpen === false) setCommentEdited(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async () => {
    try {
      await axios.delete("/comment/" + id);
      setCommentDeleted(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

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
              onClick={() => handleDelete(data.val)}
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
    <div id="singleItemContainer">
      <div id="singleItemWrapper">
        <h1 id="singleItemHeader">SINGLE ITEM</h1>
        <div id="singleItemTableWrapper">
          <table id="singleItemTable">
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
            {loading ? (
              "Loading... Please wait"
            ) : (
              <>
                <tbody>
                  <tr className="tableRow">
                    <td>{data._id}</td>
                    <td className="moveRightABit">{data.category}</td>
                    <td>
                      <div>{data.location}</div>
                    </td>
                    <td>{data.numberOfUnits}</td>
                    {data.deleted === false ? (
                      <>
                        <td>
                          <div
                            id="singleItemStatus"
                            className="singleItemActiveStatus"
                          >
                            ACTIVE
                          </div>
                        </td>
                        <td>
                          <Tooltip title="Edit Item">
                            <Link to={`/editItem/${data._id}`}>
                              <EditIcon className="inventoryActionIcon" />
                            </Link>
                          </Tooltip>
                          <Tooltip title="Delete Item">
                            <DeleteIcon
                              onClick={() => handleOpenPopup(data._id)}
                              className="inventoryActionIcon deleteItemIcon"
                            />
                          </Tooltip>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <div
                            id="singleItemStatus"
                            className="singleItemDeletedStatus"
                          >
                            DELETED
                          </div>
                        </td>
                        <td>
                          <Tooltip title="Restore Item">
                            <RestoreIcon
                              onClick={handleRestore}
                              className="singleItemActionIcon restoreItemIcon"
                            />
                          </Tooltip>
                        </td>
                      </>
                    )}
                  </tr>
                </tbody>

                {modalOpen && displayModal()}
              </>
            )}
          </table>
          {itemRestored && (
            <span style={{ color: "green" }}>Item successfully restored.</span>
          )}
          <div id="singleItemComment">
            {data.deleted === true ? (
              <>
                <div id="singleItemFlex">
                  <h4>COMMENTS</h4>
                  <div id="singleItemCommentBtns">
                    <Tooltip title="Save changes to comment">
                      <EditIcon
                        onClick={editComment}
                        className="singleItemEditComment"
                      />
                    </Tooltip>
                    <Tooltip title="Delete Comment">
                      <DeleteIcon
                        onClick={deleteComment}
                        className="singleItemDeleteComment"
                      />
                    </Tooltip>
                  </div>
                </div>
                <input
                  value={comments}
                  placeholder={data.comments}
                  id="singleItemCommentText"
                  onChange={(e) => {
                    setComments(e.target.value);
                  }}
                ></input>
              </>
            ) : (
              ""
            )}
          </div>
          {commentEdited ? (
            <span style={{ color: "green" }}>Comment successfully edited.</span>
          ) : commentDeleted ? (
            <span style={{ color: "red" }}>Comment successfully deleted.</span>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
