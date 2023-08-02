import CodeIcon from "@/Icons/CodeIcon";
import React from "react";
import HoverScaleTransition from "../HoverScaleTransition/HoverScaleTransition";
import CyberSecurityIcon from "@/Icons/CyberSecurityIcon";
import DataIcon from "@/Icons/DataIcon";

const ButtonBox = ({ text, onClick, className }) => {
  const classes = `flex flex-col items-center justify-center cursor-pointer rounded-full p-16 gap-10 w-full h-full  border-1 xl:text-xl 2xl:text-2xl tall:text-lg text-center text-white font-bold max-h-80 ${className}`;
  return (
    <HoverScaleTransition>
      <div onClick={onClick} className={classes}>
        {text.includes("Computer") && (
          <CodeIcon
            size={200}
            color="white"
            className="h-auto xl:w-[150px] 2xl:w-[180px] tall:w-[120px]"
          />
        )}
        {text.includes("Data") && (
          <DataIcon
            size={200}
            color="white"
            className="h-auto xl:w-[150px] 2xl:w-[180px] tall:w-[120px]"
          />
        )}
        {text.includes("Cybersecurity") && (
          <CyberSecurityIcon
            size={200}
            color="white"
            className="h-auto xl:w-[150px] 2xl:w-[180px] tall:w-[120px]"
          />
        )}
        <span>{text}</span>
      </div>
    </HoverScaleTransition>
  );
};

export default ButtonBox;
