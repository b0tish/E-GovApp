import React from "react";
import "../css/Navbar.css";


 function Navbar(props) {
  var items = [
    { name: props.title1},
    {name: props.title2}
  ]
  function returnTitle()
  {
    return items.map(item => <li>{item.name}</li>)
  }
    return (
      <div>
          <ul>    
            {returnTitle()}
          </ul>
      </div>
    );
    
  }
export default Navbar;
