import React from "react";
import Banner from "./Banner";
import nepalFlag from "../images/nepalFlag.jpg";

function Home() {
  return (
    <> 
    <div className="container px-40 mt-10 ">

            <Banner bgName={nepalFlag} />  
    </div>
    </>
  );
}

export default Home;