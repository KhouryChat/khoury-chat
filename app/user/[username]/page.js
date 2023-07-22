"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import React from "react";
import Tabs from "@/components/Tab/Tab";
import UserIcon from "@/Icons/UserIcon";
import BookIcon from "@/Icons/BookIcon";
import GithubIcon from "@/Icons/GithubIcon";
import LinkedInIcon from "@/Icons/LinkedInIcon";


import Dropdown from "@/components/DropdownMenu/Dropdown";
const Page = ({ params }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  {
    params.username;
  }

  // return (
  // <div className="flex items-center justify-center gap-10">
  //   <div className="rounded-xl h-[600px] w-1/4 p-10 border-4 flex flex-col items-left hover:border-black">
  //     <div className="flex items-center justify-end">
  //       <Dropdown />
  //     </div>
  //     <div classname="flex flex-row items-center justify-center">
  //       <div className="flex flex-row justify-around items-center">
  //         <div className="rounded-full w-1/2 h-40 border-2 border-black flex flex-row items-center justify-center">
  //           <Image width={100} height={100} alt="txt" src="/husky2.png" />
  //         </div>
  //         <div className="flex flex-col items-start justify-around">
  //           <div className="flex flex-row items-center">
  //             <UserIcon size={32} />
  //             <span className="ml-2">username:</span>
  //           </div>
  //           <div className="flex flex-row items-center mt-4">
  //             <BookIcon size={32} />
  //             <span className="ml-2">major:</span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="my-10 h-1/2 w-full flex flex-col">

  //       <h2 className="text-xl font-bold mb-4">
  //         About:<br></br>
  //       </h2>
  //       <>
  //         I am a grad student a Northeastern University studying CS. I am
  //         interested in development and AI. Add me on Github to collab!
  //       </>
  //     </div>
  //     <div className="h-1/2 w-full flex items-center justify-center border-t border-black">
  //       <div className="flex space-x-4">
  //         <GithubIcon size={30} color={"#1e40af"} />
  //         <LinkedInIcon size={30} color="#1e40af" />
  //       </div>
  //     </div>
  //   </div>

  //       <div className="h-screen w-1/2 bg-white p-10 my-10">
  //         <div className="rounded-lg h-2/3 overflow-hidden w-full bg-white p-10 my-[20%] ">
  //           <h1 className="text-lg ">Your Content...</h1>
  //           <Example />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
  // export default Page;

  return (
    <div>
      <div
        className="absolute top-0 h-1/2 w-screen opacity-50"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')",
          backgroundSize: "cover"
        }}
      ></div>
      <div className="absolute top-1/2 bg-slate-100 h-1/2 w-screen -z-10"></div>


      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg h-3/4 w-4/5 ">
        <div className="bg-white h-[45px] rounded-full">
          <div className="flex items-center justify-end border-b-8 border-slate-100 shadow-lg">
            <p className="justify-end font-arcade text-6xl text-red-600 " > Hi Username...</p>
            <Dropdown />
          </div>
          <div className="flex space-x-4 p-6">
            <GithubIcon size={30} color={"#1e40af"} />
            <LinkedInIcon size={30} color="#1e40af" />
          </div>


          <div className="flex justify-center items-center">
            <div className="bg-white shadow-lg flex flex-col border items-center mt-[60px] w-1/3 h-[400px] rounded-lg">
              <br></br>
              Your Content...
            <div className="border-t border-black w-2/3 mt-[25px]">
              <Tabs />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 
        -translate-y-1/2 mt-8 rounded-full h-[200px] w-[200px] bg-white border 
        flex justify-center items-center shadow-2xl">
          <img
            src="/banana.png"
            alt="Profile Picture"
            className="rounded-full h-full w-full "
          />
        </div>
      </div>
    </div>
  )
}

export default Page
