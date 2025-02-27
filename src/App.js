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
import PageNotFound from "./pages/PageNotFound";

import Search from "./pages/Search";

import NationalTracking from "./pages/NationalTracking";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";
import HomePrivate from "./pages/HomePrivate";
import Register from "./pages/Register";
import Forbidden from "./pages/Forbidden";
import ContactSearch from "./pages/ContactSearch";
import NationalContact from "./pages/NationalContact";
import OtherContact from "./pages/OtherContact";
import Footer from "./components/Footer";

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
            <Route path="/contact/:level" element={<ContactSearch/>}/>
            <Route path="/contact/:level/:name" element={<OtherContact/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/:level" element={<Dashboard />} />
            <Route path="/dashboard/:level/:name" element={<Dashboard />} />
            <Route path="/tracking" element={<Tracking />} />       
            <Route
              path="/register"
              element={
                <ProtectedRoute requiredRole="superadmin">
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route path="/search/:level" element={<Search />} />
            <Route path="/national" element={<NationalTracking />}></Route>
            <Route path="/tracking/:level/:name" element={<Tracking/>}></Route>
            <Route path="/forbidden" element={<Forbidden />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
