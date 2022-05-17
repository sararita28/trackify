import React from "react";
import "./sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import { ExternalLink } from "react-external-link";

export default function Sidebar() {
  return (
    <div id="sidebarContainer">
      <div id="sidebarWrapper">
        <ul id="sidebarList">
          <li className="sidebarListItem">
            <Link to="/" className="links">
              <HomeIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Dashboard</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to="/inventory" className="links">
              <InventoryIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Inventory</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to="/deleted" className="links">
              <DeleteIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Deleted</span>
            </Link>
          </li>
        </ul>
      </div>
      <div id="my-links">
        <ExternalLink
          href="https://github.com/sararita28"
          target="_blank"
          className="links"
        >
          <GitHubIcon className="my-links-link" />
        </ExternalLink>
        <ExternalLink
          href="https://www.linkedin.com/in/sara-hilali/"
          target="_blank"
          className="links"
        >
          <LinkedInIcon className="my-links-link" />
        </ExternalLink>
        <ExternalLink
          href="https://sarahilali.com/"
          target="_blank"
          className="links"
        >
          <LanguageIcon className="my-links-link" />
        </ExternalLink>
      </div>{" "}
    </div>
  );
}
