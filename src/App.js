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
import LocalList from "./pages/LocalList";
import Allocations from "./pages/Allocations";
import Search from "./pages/Search";
import MinistryTracking from "./pages/MinistryTracking";
import ProvincialTracking from "./pages/ProvincialTracking";
import LocalTracking from "./pages/LocalTracking";
import NationalTracking from "./pages/NationalTracking";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";
import HomePrivate from "./pages/HomePrivate";
import Register from "./pages/Register";
import Testy from "./pages/testy";
import Forbidden from "./pages/Forbidden";
import ContactSearch from "./pages/ContactSearch";
import NationalContact from "./pages/NationalContact";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<HomePrivate />} />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/national" element={<NationalContact/>}/>
            <Route path="/contact/:identifier" element={<ContactSearch/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/:level" element={<Dashboard />} />
            <Route path="/dashboard/:level/:name" element={<Dashboard />} />
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
            <Route
              path="/register"
              element={
                <ProtectedRoute requiredRole="superadmin">
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route path="/allocations" element={<Allocations />} />
            <Route path="/search/:level" element={<Search />} />

            <Route path="/national" element={<NationalTracking />}></Route>
            <Route path="/ministry/:mName" element={<MinistryTracking />} />
            <Route path="/province/:pName" element={<ProvincialTracking />} />
            <Route path="/local/:lName" element={<LocalTracking />} />
            <Route path="/testy" element={<Testy />}></Route>
            <Route path="/forbidden" element={<Forbidden />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
