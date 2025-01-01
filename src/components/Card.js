import React from "react";
import { ChartBarIcon } from "@heroicons/react/solid";

function Card(props) {
  return (
    <div className="w-60 h-64 mb-10 bg-red-500 flex items-center justify-center p-4 basis-96">
      <ChartBarIcon className="h-10 w-10 text-blue-500"/>
      {props.title}
    </div>
  );
}

export default Card;
