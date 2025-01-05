import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Tracking from "./components/Tracking";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import ProvinceAllocationForm from "./components/ProvinceAllocationForm";
import MinistryAllocationForm from "./components/MinistryAllocationForm";
import LocalGovernmentAllocationForm from "./components/LocalGovernmentAllocationForm";
import PageNotFound from "./components/PageNotFound";


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
          <Route path="/allocation">
            <Route path="localgovernment" element={<LocalGovernmentAllocationForm />} />
            <Route path="province" element={<ProvinceAllocationForm />} />
            <Route path="ministry" element={<MinistryAllocationForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
