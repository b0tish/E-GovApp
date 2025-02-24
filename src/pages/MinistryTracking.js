import React from "react";
import { useParams } from "react-router";

const MinistryTracking =()=>{
     const { mName } = useParams();
    return(
    <>
    <p>This is Tracking of {mName}</p>
    
    
    </>);
}

export default MinistryTracking;