import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";
import Tracking from "./components/Tracking";
import "./App.css";
<<<<<<< HEAD
import Navbar from './components/Navbar'
import Home from './components/Home'

const items = [
  {name:"Home"},
  {name:"About us"}
];
=======

import { BrowserRouter, Routes, Route } from "react-router";
>>>>>>> cb277b135c3afdac5c3a6d986181e41a0722f593

function App() {
  return (
    <>
<<<<<<< HEAD
    <Navbar title1={items[0].name} title2={items[1].name}/>
    <Home/>
=======
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Tracking />}></Route>
        </Routes>
      </BrowserRouter>
>>>>>>> cb277b135c3afdac5c3a6d986181e41a0722f593
    </>
  );
}

export default App;
