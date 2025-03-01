import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

function HomePrivate() {
  const { isLoggedIn, user } = useAuth(); // Directly use isLoggedIn from context
  console.log(isLoggedIn);
  const [name, setName] = useState(user?.name);
  const [level, setLevel] = useState(user?.level);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setLevel(user.level);
    }
  }, [user]);

  return (
    <div className="p-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoggedIn && user && (
          <Link to={`/dashboard/${level}${name ? `/${name}` : ""}`}>
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
