import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Tracking from "./components/Tracking";
import LocalGovernmentAllocationForm from "./components/LocalGovernmentAllocationForm";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>

          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/tracking" element={<Tracking />}></Route>
          <Route
            path="/allocation"
            element={<LocalGovernmentAllocationForm />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
