import React from "react";

const BrokenHeartIcon = ({ size=17, className }) => {
  return (
    <div style={{ width: size, height: size }} className={className}>
    <svg
      className={className}
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586ZM7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77Z"></path>
    </svg>
    </div>
  );
};

export default BrokenHeartIcon;
