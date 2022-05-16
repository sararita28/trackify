import React from "react";
import "./notFoundPage.css";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div id="notFoundContainer">
      <h1 id="notFoundHeader">Oops!</h1>
      <h3 id="notFoundSecondHeader">404 - PAGE NOT FOUND</h3>
      <p id="notFoundText">The page you are looking for is not available.</p>
      <button id="notFoundTakeMeHome">
        <Link className="links" to="/">
          GO TO HOMEPAGE
        </Link>
      </button>
    </div>
  );
}
