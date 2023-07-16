"use client";
import { useEffect, useState } from "react";
import PostItem from "@/components/PostItem/PostItem";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

import { GiGraduateCap } from "react-icons/gi";
import { BsPersonCircle } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { BiSolidBookAlt } from "react-icons/bi";
import { useAuthContext } from "@/Context/AuthContext";

const Page = () => {
  const router = useRouter();
  const user = useAuthContext();

  const [searchValue, setSearchValue] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [major, setMajor] = useState("");
  const [userPosts, setUserPosts] = useState([]);

  console.log(user);
  useEffect(() => {
    setUsername(user["user"]["displayName"]);
    setProfileImage(user["user"]["photoURL"]);
  }, [user]);

  function goHome() {
    router.push("/");
  }
  const goTopost = (courseID) => {
    router.push(`/course/${courseID}`);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          `https://www.khourychat.com/api/${user["user"]["uid"]}/posts`
        );
        const data = await response.json();
        setUserPosts(JSON.parse(data));
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };
    getPosts();
  }, [user]);

  if (!user) return <div>User not found!</div>;

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
          <button
            onClick={goHome}
            className="text-white font-semibold rounded-lg bg-gray-600 px-4 py-1 mr-4 hover:bg-gray-500"
          >
            Home
          </button>
          <Image src={profileImage} alt="Image" width={50} height={50} />
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

      <div className="flex flex-row justify-items-center gap-10 p-10">
        <div className="user-profile flex flex-col items-center text-4xl gap-3 p-6 py-20 bg-red-700 rounded-full text-white">
          <Image
            src={profileImage != null ? profileImage : "husky2.png"}
            alt="User Profile"
            width={200}
            height={200}
            className="rounded-full"
          />

          <div className="text-white profile-info flex flex-col gap-3 p-8  text-xl">
            <span className="flex flex-row gap-4 mt-4 font-bold text-4xl">
              <BsPersonCircle width={12} />
              <p>{username}</p>
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
          {false ? (
            <div className="w-full grid grid-cols-2 gap-10">
              {userPosts.map((post) => (
                <PostItem
                  onClick={() => goTopost(post.course_id)}
                  key={post["post_id"]}
                  title={post.title}
                  content={post.content}
                  views={post.views}
                  likes={post.likes}
                />
              ))}
              <div></div>
            </div>
          ) : (
            <div className="w-full grid grid-cols-2 gap-10">
              <button onClick={() => {}} className=" relative">
                <PostItem
                  title="post 1"
                  content="content"
                  views={100}
                  likes={45}
                />
                <span className="absolute top-0 left-0 right-0 bottom-0 hover:bg-gray-500 opacity-20 z-10"></span>
              </button>
              <button onClick={() => {}} className=" relative">
                <PostItem
                  title="post 2"
                  content="content"
                  views={100}
                  likes={45}
                />
                <span className="absolute top-0 left-0 right-0 bottom-0 hover:bg-gray-500 opacity-20 z-10"></span>
              </button>
              <button onClick={() => {}} className=" relative">
                <PostItem
                  title="post 3"
                  content="content"
                  views={100}
                  likes={45}
                />
                <span className="absolute top-0 left-0 right-0 bottom-0 hover:bg-gray-500 opacity-20 z-10"></span>
              </button>
              <button onClick={() => {}} className=" relative">
                <PostItem
                  title="post 4"
                  content="content"
                  views={100}
                  likes={45}
                />
                <span className="absolute top-0 left-0 right-0 bottom-0 hover:bg-gray-500 opacity-20 z-10"></span>
              </button>
              <button onClick={() => {}} className=" relative">
                <PostItem
                  title="post 5"
                  content="content"
                  views={100}
                  likes={45}
                />
                <span className="absolute top-0 left-0 right-0 bottom-0 hover:bg-gray-500 opacity-20 z-10"></span>
              </button>
              <button onClick={() => {}} className=" relative">
                <PostItem
                  title="post 6"
                  content="content"
                  views={100}
                  likes={45}
                />
                <span className="absolute top-0 left-0 right-0 bottom-0 hover:bg-gray-500 opacity-20 z-10"></span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
