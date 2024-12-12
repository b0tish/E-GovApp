import React from "react";
import "../css/Navbar.css";



// function Navbar(props) {
//   var items = [
//     { name: props.title1},
//     {name: props.title2}
    
//   ];

 function returning(props) {
    var thisis = props.map((item) => <li id={item}>{item}</li>); // Use item.name directly
  }

  return (
    <ul>
      
    </ul>
  );


export default Navbar;
