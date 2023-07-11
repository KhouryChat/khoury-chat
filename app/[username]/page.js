"use client"
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  function goHome() {
    router.push("/")
  }

  return (
<div className="bg-white min-h-screen">
  <nav className="navbar flex items-center justify-end h-16 bg-black border-b border-slate-500">
    <a onClick={goHome} className="text-white font-semibold rounded-lg bg-gray-600 px-4 py-2 mr-4 hover:bg-gray-500">
      Home
    </a>
    <img
      src="husky.png"
      alt="Image"
      className="image-button"
      style={{ width: "50px", height: "50px" }}
    />
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
  
      <div className="user-profile flex flex-row items-start text-4xl gap-3 ">
        <img
          src="husky.png"
          alt="User Profile"
          className="profile-image"
          style={{ width: "250px", height: "250px" }}
        />

        <div className="profile-info flex flex-col gap-3">
            <span className="info-value text-black"> cwcoogan</span>
            <span className="info-value text-black"> Computer Science</span>
            <span className="info-value text-black"> MS Student</span>
            <span className="info-value text-black"> # of likes</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <button className="bg-red-500 hover:bg-black text-white font-semibold py-2 px-4 rounded">
          Post 1
        </button>
        <button className="bg-red-500 hover:bg-black text-white font-semibold py-2 px-4 rounded">
          Post 2
        </button>
        <button className="bg-red-500 hover:bg-black text-white font-semibold py-2 px-4 rounded">
          Post 3
        </button>
      
      </div>

    </div>
    
    



  );
};

export default Page;