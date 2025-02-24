import React from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

function HomePrivate() {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);
  return (
    <div className="p-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/dashboard">
          <Card title="Your Dashboard" imageSrc="/dashboard.jpg" />
        </Link>
        <Link to="/national">
          <Card title="National Level Tracking" imageSrc="./emblem.png" />
        </Link>
        <Link to="/ministry">
          <Card title="Federal Ministries Tracking" imageSrc="./emblem.png" />
        </Link>
        <Link to="/province">
          <Card title="Provincial Level Tracking" imageSrc="./emblem.png" />
        </Link>
        {isLoggedIn && (
          <Link to="/local">
            <Card title="Local Level Tracking" imageSrc="./emblem.png" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default HomePrivate;
