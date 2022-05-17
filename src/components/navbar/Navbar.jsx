import React, { useState } from "react";
import "./navbar.css";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import logo from "../../images/logo_transparent.png";
import useFetch from "../../hooks/useFetch";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { data } = useFetch("inventory");
  const [popupOpen, setPopupOpen] = useState(false);
  const options = data.map((item) => {
    const id = item._id,
      category = item.category,
      location = item.location;
    return `${id}, ${category}, ${location}`;
  });

  function handleOpenPopup() {
    setPopupOpen(true);
  }

  function handleClosePopup() {
    setPopupOpen(false);
  }

  function showPopup() {
    return (
      <div id="howItWorksPopup" className="howItWorksPopup">
        <div className="howItWorksPopup_content">
          <span
            onClick={handleClosePopup}
            id="closeHowItWorksPopup"
            className="closeHowItWorksPopup"
          >
            &times;{" "}
          </span>
          <h2>Welcome to Trackify!</h2>
          <p className="howItWorksPopupText">How it works: </p>
          <ul className="howItWorksListItems">
            <li>
              To view items that are currently in your inventory click on
              <em> Inventory</em>.
            </li>
            <li>
              You can <b>view, edit or delete</b> a specific item by using the
              action buttons.
            </li>
            <li>
              Every listing will contain information about a particular item
              such as its{" "}
              <b>
                ID, category, location, number of units currently available and
                its status
              </b>{" "}
              (i.e whether it's currently deleted or active).
            </li>
            <li>
              You can <b>add comments to your deletes.</b> These{" "}
              <b>comments can also then be edited or deleted.</b>
            </li>
            <li>
              Finally, if you go to your <em>Deleted</em> page, you can{" "}
              <b>
                view all of the deleted items, individually or as a list,
                restore them, edit or add comments, and permanently delete a
                specific item.
              </b>
            </li>
          </ul>
          <p className="howItWorksPopupText">Notes: </p>
          <p>
            Please note that the <em>Dashboard</em> page is currently static.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="navbarContainer">
      <div id="navbarLeft">
        <Link to="/">
          <img src={logo} alt="logo" id="logo" />
        </Link>
      </div>
      <div id="navbarCenter">
        <div>
          <Autocomplete
            disablePortal
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search by ID, category or location"
              />
            )}
          />
        </div>
      </div>
      <div id="navbarRight">
        <div id="navbarIconItem">
          <Tooltip title="Guide / How it works">
            <InfoIcon id="howItWorks" onClick={handleOpenPopup} />
          </Tooltip>
        </div>
      </div>
      {popupOpen && showPopup()}
    </div>
  );
}
