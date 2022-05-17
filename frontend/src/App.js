import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./main.css";
import Navbar from "./components/navbar/Navbar.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Inventory from "./pages/inventory/Inventory.jsx";
import Deleted from "./pages/deleted/Deleted.jsx";
import SingleInventoryItem from "./pages/singleItem/SingleItem.jsx";
import CreateItem from "./pages/createItem/CreateItem.jsx";
import NotFoundPage from "./pages/notFound/NotFoundPage.jsx";
import EditItem from "./pages/editItem/EditItem.jsx";
axios.defaults.baseURL = "http://0.0.0.0:3001";

function App() {
  return (
    <Router>
      <Navbar />
      <div id="homeContainer">
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route exact path="/inventory" element={<Inventory />} />
          <Route path="/inventory/:id" element={<SingleInventoryItem />} />
          <Route path="/createItem" element={<CreateItem />} />
          <Route path="/editItem/:id" element={<EditItem />} />
          <Route path="/deleted" element={<Deleted />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
