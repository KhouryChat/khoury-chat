import React from "react";

const HamburgerIcon = ({ className, width, height, color }) => {
  return (
    <svg
      className={className}
      stroke={color}
      fill={color}
      strokeWidth="0"
      viewBox="0 0 512 512"
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path>
    </svg>
  );
};

export default HamburgerIcon;
