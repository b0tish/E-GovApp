import logo from "./logo.svg";
import "./App.css";
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route,Link } from "react-router";

const items = [
  {name:"Home"},
  {name:"About us"},
  {name:"Contact"}
];

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar title1={items[0].name} title2={items[1].name} title3={items[2].name}/> 
      <Routes>
      
      </Routes> 
    </BrowserRouter>
    </>
  );
}

export default App;
