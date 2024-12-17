import React from "react";

function Banner(props) {
  const style = {
    backgroundImage: `url(${props.bgName})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <>
        <div style={style} className="w-[100%] h-[250px] rounded-3xl"></div> 
    </>
  );
}

export default Banner;
