"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import React from "react";
import Example from "@/components/Tab/Tab";
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

  return (
    <div className="flex items-center justify-center gap-10">
      <div className="rounded-xl h-[600px] w-1/4 p-10 border-4 flex flex-col items-left hover:border-black">
        <div className="flex items-center justify-end">
          <Dropdown />
        </div>
        <div classname="flex flex-row items-center justify-center">
          <div className="flex flex-row justify-around items-center">
            <div className="rounded-full w-1/2 h-40 border-2 border-black flex flex-row items-center justify-center">
              <Image width={100} height={100} alt="txt" src="/husky2.png" />
            </div>
            <div className="flex flex-col items-start justify-around">
              <div className="flex flex-row items-center">
                <UserIcon size={32} />
                <span className="ml-2">username:</span>
              </div>
              <div className="flex flex-row items-center mt-4">
                <BookIcon size={32} />
                <span className="ml-2">major:</span>
              </div>
            </div>
          </div>
        </div>
        <div className="my-10 h-1/2 w-full flex flex-col">
          <h2 className="text-xl font-bold mb-4">
            About:<br></br>
          </h2>
          <>
            I am a grad student a Northeastern University studying CS. I am
            interested in development and AI. Add me on Github to collab!
          </>
        </div>
        <div className="h-1/2 w-full flex items-center justify-center border-t border-black">
          <div className="flex space-x-4">
            <GithubIcon size={30} color={"#1e40af"} />
            <LinkedInIcon size={30} color="#1e40af" />
          </div>
        </div>
      </div>
      <div className="h-screen w-1/2 bg-red-600 p-10 my-10">
        <div className="h-2/3 w-full bg-white p-10 my-10 ">
          <Example />
        </div>
        <div className="h-2/3 w-full bg-white p-10 my-10 ">
          <Example />
        </div>
      </div>
    </div>
  );
};
export default Page;
