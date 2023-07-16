import { useRouter } from "next/navigation";
import React from "react";

const Sidebar = ({ professors }) => {
  const router = useRouter();
  const sendProf = (e) => {
    router.push(
      `/professor/${
        e.target.value.split(" ")[0] + "-" + e.target.value.split(" ")[1]
      }`
    );
  };
  return (
    <div className=" h-screen shadow-lg bg-black text-white text-lg flex flex-col items-start">
      <div className="w-full h-14 bg-red-700"></div>
      <div className="p-10 pb-5 text-2xl mb-10 font-bold">Instructors: </div>
      {professors.map((prof) => (
        <div
          onClick={sendProf}
          className="px-10 hover:text-blue-500 cursor-pointer"
          key={prof}
        >
          {prof}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
