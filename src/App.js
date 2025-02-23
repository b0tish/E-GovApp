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
// import Allocations from "./components/Allocations";
import LocalList from "./components/LocalList";
import Allocations from "./components/Allocations";
import HomePublic from "./components/HomePublic";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePrivate from "./components/HomePrivate";
import Register from "./components/Register";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<HomePublic />} />

            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path="/admin-home" element={<HomePrivate />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route
              path="/province/:provinceId/locals"
              element={<LocalList />}
            />
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
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
