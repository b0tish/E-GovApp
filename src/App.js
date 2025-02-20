import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tracking from "./pages/Tracking";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import ProvinceAllocationForm from "./pages/ProvinceAllocationForm";
import MinistryAllocationForm from "./pages/MinistryAllocationForm";
import LocalGovernmentAllocationForm from "./pages/LocalGovernmentAllocationForm";
import PageNotFound from "./pages/PageNotFound";
// import Allocations from "./components/Allocations";
import LocalList from "./pages/LocalList";
import Allocations from "./pages/Allocations";
import Search from "./pages/Search";
import MinistryTracking from "./pages/MinistryTracking";
import ProvincialTracking from "./pages/ProvincialTracking";
import LocalTracking from "./pages/LocalTracking";

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
          <Route path="/province/:provinceId/locals" element={<LocalList />} />
          <Route path="/allocation">
            <Route index element={<PageNotFound />} />
            <Route
              path="localgovernment"
              element={<LocalGovernmentAllocationForm />}
            />
            <Route path="province" element={<ProvinceAllocationForm />} />
            <Route path="ministry" element={<MinistryAllocationForm />} />
          </Route>

          <Route path="/allocations" element={<Allocations />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/:role" element={<Search />} />
          <Route path="/ministry/:mName" element={<MinistryTracking />} />
          <Route path="/province/:pName" element={<ProvincialTracking />} />
          <Route path="/local/:lName" element={<LocalTracking />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
