"use client"
import { useState } from "react";
import PostItem from "@/components/PostItem/PostItem";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import {GiGraduateCap} from 'react-icons/gi'
import {BsPersonCircle} from 'react-icons/bs'
import {AiFillHeart} from 'react-icons/ai'
import {BiSolidBookAlt} from 'react-icons/bi'


const Page = () => {
  const router = useRouter();
  function goHome() {
    router.push("/")
  }
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className="bg-black min-h-screen">
      <nav className="navbar flex items-center justify-between py-4 bg-black border-b border-slate-400 rounded">
        <div></div>
        <input
            type="text"
            placeholder="Search courses"
            className="border-2 focus:outline-none outline-none border-none border-gray-300 w-1/2 p-3 rounded-full"
            value={searchValue}
            onChange={handleSearch}
          />

        <div className="flex flex-row gap-4">
        <button onClick={goHome} className="text-white font-semibold rounded-lg bg-gray-600 px-4 py-1 mr-4 hover:bg-gray-500">
          Home
        </button>
        <img
          src="husky.png"
          alt="Image"
          className="image-button"
          style={{ width: "50px", height: "50px" }}
        />
        </div>
      </nav>

      <nav className="navbartwo flex items-center justify-center h-16 bg-black border-b border-slate-500 text-center">
      <a className="text-white font-semibold rounded-lg bg-gray-600 px-4 py-2 mr-4 hover:bg-gray-500">
      Posts
      </a>
      <a className="text-white font-semibold rounded-lg bg-gray-600 px-4 py-2 mr-4 hover:bg-gray-500">
      Likes
      </a>
      <a className="text-white font-semibold rounded-lg bg-gray-600 px-4 py-2 mr-4 hover:bg-gray-500">
      Comments
      </a>
      </nav>
        
      <div className="flex flex-row justify-items-center gap-20 p-20">
        <div className="user-profile flex flex-col items-center text-4xl gap-3 p-12 py-20 bg-red-700 rounded-full text-white">
            <img
              src="husky2.png"
              alt="User Profile"
              className="profile-image p-4"
              width="200px"
            />

            <div className="text-white profile-info flex flex-col gap-3 p-8  text-xl">
                <span className="flex flex-row gap-4 mt-4 font-bold text-4xl"> 
                  <BsPersonCircle width={12} />
                  <p>cwcoogan</p>
                </span>
                <span className="flex flex-row gap-4"> 
                  <BiSolidBookAlt width={12} />
                  <p>Computer Science</p>
                </span>
                <span className="flex flex-row gap-4"> 
                  <GiGraduateCap width={12} />
                  <p>MS Student</p>
                </span>
                <span className="flex flex-row gap-4"> 
                  <AiFillHeart width={12} />
                  <p>2043</p>
                </span>
            </div>
        </div>
        <div className="w-full flex flex-col gap-10 justify-center items-start">
          <div className="text-6xl font-bold text-white">recent posts:</div>
        <div className="w-full grid grid-cols-2 gap-10">
              <PostItem title="post 1" content="content" views={100} likes={45}/>
              <PostItem title="post 2" content="content" views={100} likes={45}/>
              <PostItem title="post 3" content="content" views={100} likes={45}/>
              <PostItem title="post 4" content="content" views={100} likes={45}/>
              <PostItem title="post 5" content="content" views={100} likes={45}/>
              <PostItem title="post 6" content="content" views={100} likes={45}/>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Page;