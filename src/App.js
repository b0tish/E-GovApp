import logo from "./logo.svg";
import "./App.css";
import Navbar from './components/Navbar'
import Home from './components/Home'

const items = [
  {name:"Home"},
  {name:"About us"}
];

function App() {
  return (
    <>
    <Navbar title1={items[0].name} title2={items[1].name}/>
    <Home/>
    </>
  );
}

export default App;
