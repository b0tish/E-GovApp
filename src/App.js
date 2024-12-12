import logo from "./logo.svg";
import "./App.css";
import Navbar from './components/Navbar'

const items = [
  {name:"home"},
  {name:"about us"}
];

function App() {
  return (
    <>
    <Navbar title1={items[0].name}/>
    
    </>
  );
}

export default App;
