import React from "react";
import { useParams } from "react-router";

const ProvincialTracking =()=>{

    const {pName} =useParams();
    return (
      <>
        <p>This is Tracking of {pName}</p>
      </>
    );
}

export default ProvincialTracking;