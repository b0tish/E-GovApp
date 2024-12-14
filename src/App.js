<<<<<<< HEAD
import React from 'react'
import Navbar from './components/Navbar';
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

import { BrowserRouter,Routes,Route} from "react-router";

function App() {
  return (
    <>
=======

import "./App.css";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import { BrowserRouter,Routes,Route} from "react-router";



function App() {
  return (
    <> 
>>>>>>> abik
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
<<<<<<< HEAD
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
=======
        </Routes> 
      </BrowserRouter>
      
>>>>>>> abik
    </>
  );
}

export default App;
