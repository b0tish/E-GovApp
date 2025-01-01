import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import HomePublic from "./HomePublic";
import HomePrivate from "./HomePrivate";

function Home() {
  const location=useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") || "false"
  );

  useEffect(() => {
    const loggedInStatus = sessionStorage.getItem("isLoggedIn") === "true" ? "true" : "false";
    setIsLoggedIn(loggedInStatus);
  }, [location]); 

  return <>{isLoggedIn === "false" ? <HomePublic /> : <HomePrivate />}</>;
}

export default Home;
