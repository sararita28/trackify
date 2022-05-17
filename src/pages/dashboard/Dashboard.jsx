import React from "react";

import "./dashboard.css";

export default function Dashboard() {
  return (
    <div id="dashboardContainer">
      <div id="dashboardWrapper">
        <h1 id="dashboardHeader">KEY PERFORMANCE INDICATORS</h1>
        <div id="kpiContainer">
          <div className="kpi">
            <h1 className="kpiNumber kpiNumber1">102</h1>
            <span className="kpiText">TOTAL</span>
          </div>
          <div className="kpi">
            <h1 className="kpiNumber kpiNumber2">42</h1>
            <span className="kpiText">ACTIVE</span>
          </div>
          <div className="kpi">
            <h1 className="kpiNumber kpiNumber3">4</h1>
            <span className="kpiText">CATEGORIES</span>
          </div>
          <div className="kpi">
            <h1 className="kpiNumber kpiNumber4">5</h1>
            <span className="kpiText">LOCATIONS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
