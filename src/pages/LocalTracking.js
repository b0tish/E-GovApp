import React from "react";
import { useParams } from "react-router";

const LocalTracking =()=>{
    const {lName}=useParams();
    return (
      <>
        <p>This is Tracking of {lName}</p>
      </>
    );
}

export default LocalTracking;