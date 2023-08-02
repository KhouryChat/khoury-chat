import React from "react";

const BrokenHeartIcon = ({ size = 16, className, color = "" }) => {
  return (
    <svg
      className={className}
      fill={color}
      strokeWidth="0"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      <path d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586ZM7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77Z"></path>
    </svg>
  );
};

export default BrokenHeartIcon;
