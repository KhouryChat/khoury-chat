import React, { useReducer } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const TitleBar = ({ text, courseName }) => {
  const title = text.toUpperCase();
  return (
    <div className="flex flex-row justify-between items-center p-5">
      {/* <div onClick={() => router.push("/")} className="cursor-pointer">
        <Image
          className="ml-7"
          src="/husky.png"
          alt="Husky"
          width={130}
          height={130}
        />
      </div> */}
      <div className="flex flex-col justify-center items-center text-white">
        <div className="p-5 text-8xl font-bold text-center text-black">
          {title}
        </div>
        <div className="text-center text-2xl font-bold p-1 italic text-black">
          {courseName}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default TitleBar;
