
import "./App.css";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import { BrowserRouter,Routes,Route} from "react-router";



function App() {
  return (
    <> 
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes> 
      </BrowserRouter>
      
    </>
  );
}

export default App;
