import React from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

function HomePrivate() {
  const { isLoggedIn } = useAuth(); // Directly use isLoggedIn from context
  console.log(isLoggedIn);
  const level = "Province";
  const name = "Lumbini";

  return (
    <div className="p-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoggedIn && ( // Check isLoggedIn directly
          <Link to={`/dashboard/${level}/${name}`}>
            <Card title="Your Dashboard" imageSrc="/dashboard.jpg" />
          </Link>
        )}
        <Link to="/national">
          <Card title="National Level Tracking" imageSrc="./emblem.png" />
        </Link>
        <Link to="/search/ministry">
          <Card title="Federal Ministries Tracking" imageSrc="./emblem.png" />
        </Link>
        <Link to="/search/province">
          <Card title="Provincial Level Tracking" imageSrc="./emblem.png" />
        </Link>
        <Link to="/search/local">
          <Card title="Local Level Tracking" imageSrc="./emblem.png" />
        </Link>
      </div>
    </div>
  );
}

export default HomePrivate;
