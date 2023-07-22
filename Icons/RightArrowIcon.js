import React from "react";

const RightArrowIcon = ({
  onClick = () => {},
  color = "black",
  className,
  size = "1em",
}) => {
  return (
    <svg
      className={className}
      stroke={color}
      fill={color}
      strokeWidth="0"
      viewBox="0 0 16 16"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path>
    </svg>
  );
};

export default RightArrowIcon;
