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
import Allocations from "./components/Allocations";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tracking" element={<Tracking />} />
          
          <Route path="/allocation">
            <Route index element={<PageNotFound />} />
            <Route path="localgovernment" element={<LocalGovernmentAllocationForm />} />
            <Route path="province" element={<ProvinceAllocationForm />} />
            <Route path="ministry" element={<MinistryAllocationForm />} />
          </Route>

          <Route path="/allocations" element={<Allocations />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
