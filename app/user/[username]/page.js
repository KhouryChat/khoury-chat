"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import React from "react";
import Tabs from "@/components/Tab/Tab";
import UserIcon from "@/Icons/UserIcon";
import BookIcon from "@/Icons/BookIcon";
import GithubIcon from "@/Icons/GithubIcon";
import LinkedInIcon from "@/Icons/LinkedInIcon";
import TypeWriter from "typewriter-effect";
import BIRDS from "vanta/dist/vanta.birds.min";
import * as THREE from "three";

import Dropdown from "@/components/DropdownMenu/Dropdown";
import { EyeIcon } from "@heroicons/react/20/solid";
import ViewsIcon from "@/Icons/ViewsIcon";
import HeartIcon from "@/Icons/HeartIcon";
import BrokenHeartIcon from "@/Icons/BrokenHeartIcon";
const Page = ({ params }) => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(0);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: vantaRef.current,
          THREE:THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: 0xffffff,
          color2: 0x69ff,
          colorMode: "lerpGradient",
          quantity: 3.00
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);



  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  {
    {
      params.username;
    }
  }
  return (
    <div>
      <div
        className="absolute top-0 h-1/2 w-screen opacity-50"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="absolute top-1/2 bg-slate-100 h-1/2 w-screen -z-10"></div>

      <div 
      ref={vantaRef}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg h-3/4 w-4/5 shadow-2xl">
        <div className="bg-white h-[45px] md:h-[40px] rounded-full">
          <div className="flex items-center justify-end border-b-8 border-slate-100 shadow-lg">
            <p className="justify-end font-arcade text-6xl text-red-600 ">
              <TypeWriter
                options={{ cursor: " " }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(`Hi ${params.username}...`)
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString(`${params.username}`)
                    .start();
                }}
              />
            </p>
            <Dropdown />
          </div>
          <div className="flex space-x-4 p-6">
            <GithubIcon size={30} color={"#00000"} />
            <LinkedInIcon size={30} color="#1e40af" />
            {/* <ViewsIcon size={35} color="gray"/> */}
            {/* <HeartIcon size={30} color="pink" /> */}
            {/* <BrokenHeartIcon size={30} color= "pink" /> */}
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

        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 
        -translate-y-1/2 mt-8 rounded-full h-[200px] w-[200px] bg-white border 
        flex justify-center items-center shadow-2xl"
        >
          <img
            src="/banana.png"
            alt="Profile Picture"
            className="rounded-full h-full w-full "
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
