import React from "react";
import "./Tableheader.css";

function Tableheader() {
  return (
    <thead className ="theader">
      <tr className = "rows">
        <th className="column-title">ID</th>
        <th className="column-title">Name</th>
        <th className="column-title">Email</th>
        <th className="column-title">Action</th>

        {/* Add more columns as needed */}
      </tr>
    </thead>
  );
}

export default Tableheader;
