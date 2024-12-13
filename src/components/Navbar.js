import React from "react";
import "../css/Navbar.css";
import {Link} from "react-router"




 function Navbar(props) {
  var items = [{ name: props.title1 }, { name: props.title2 },{name:props.title3}];

  const titleName=()=>
  {
    return items.map((item) => <li className=" text-black"><Link>{item.name}</Link></li>);
  }
  
    return (
      <nav className="border-gray-100 border-b-2">
        <ul className="flex space-x-10 px-5 py-3 justify-end">
          {titleName()} 
        </ul>
        
      </nav>
    );
    
  }

 
export default Navbar;
