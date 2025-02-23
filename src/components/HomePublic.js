import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

function HomePublic() {
  return (
    <div className="my-10 px-20 flex flex-wrap gap-4 items-center justify-center">
      <Link to="/dashboard">
        <Card title="Dashboard" />
      </Link>
      <Link to="/tracking">
        <Card title="Tracking" />
      </Link>
      <Link to="/AddProvinceForm">
        <Card title="Add" />
      </Link>
    </div>
  );
}

export default HomePublic;
