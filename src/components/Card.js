import React from "react";

function Card({ title,imageSrc }) {
  return (
    <div
      className="
      bg-white
      rounded-lg
      shadow-xl
      p-4
      flex
      flex-col
      items-center
      justify-center
      transform
      transition
      duration-300
      hover:scale-105
      h-52
      hover:!bg-red-100
    "
    >
      <img
        src={imageSrc} // Use the imageSrc prop
        alt="Icon"
        className="w-[30%] mb-[20px]"
      />
      <p className="text-center text-gray-700 font-medium">{title}</p>
    </div>
  );
}

export default Card;
