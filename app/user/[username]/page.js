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
import WAVES from "vanta/dist/vanta.waves.min.js";
import * as THREE from "three";
import { motion } from "framer-motion";
import Dropdown from "@/components/DropdownMenu/Dropdown";
import ViewsIcon from "@/Icons/ViewsIcon";
import HeartIcon from "@/Icons/HeartIcon";
import BrokenHeartIcon from "@/Icons/BrokenHeartIcon";
const Page = ({ params }) => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(0);

  const divRef = useRef();
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        WAVES({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xcf3939,
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

  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    if (divRef.current) {
      setScrollY(divRef.current.scrollTop);
    }
  };

  useEffect(() => {
    if (divRef.current) {
      divRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (divRef.current) {
        divRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const imageSize = Math.max(100, 200 - Math.min(scrollY, 100));

  useEffect(() => {
    const fetchPostsData = async () => {
      const userID = user["user"]["uid"];
      try {
        const response = await fetch(
          `https://www.khourychat.com/api/${userID}/posts`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error("Failed to fetch posts");
      }
    };

    fetchPostsData()
      .then((data) => {
        console.log("Fetched data:", data);

        // Fetch post data for each post ID
        const fetchPostData = async (postID) => {
          try {
            const response = await fetch(
              `https://www.khourychat.com/api/posts/${postID}`
            );
            if (!response.ok) {
              throw new Error(`Failed to fetch post with ID: ${postID}`);
            }
            const postData = await response.json();
            return postData;
          } catch (error) {
            console.error(
              `Error fetching post with ID: ${postID}`,
              error.message
            );
            return null;
          }
        };

        const fetchAllPostData = async () => {
          const posts = await Promise.all(
            data.map((postID) => fetchPostData(postID))
          );
          return posts.filter((post) => post !== null);
        };

        return fetchAllPostData();
      })
      .then((postsData) => {
        console.log("Fetched posts data:", postsData);
        setCategories((prevCategories) => ({
          ...prevCategories,
          Posts: postsData,
        }));
      })
      .catch((error) => {
        console.error("Error fetching posts:", error.message);
      });
  }, []);

  {
    {
      params.username;
    }
  }

  return (
    <div className="" style={{ zIndex: 1000 }}>
      <div ref={vantaRef} className="absolute top-0 h-1/2 w-screen -z-10"></div>
      <div className="absolute top-1/2 bg-slate-100 h-1/2 w-screen -z-10"></div>
      <div className="flex items-center justify-center w-screen h-screen">
        <div
          className=" bg-white rounded-lg h-3/4 w-4/5 shadow-2xl overflow-y-scroll"
          style={{ height: "75vh" }}
          ref={divRef}
        >
          <div className="h-[45px] md:h-[40px] rounded-full">
            <div className="flex items-center justify-end border-b-8 border-slate-100 shadow-lg">
              <p className="justify-end font-arcade xl:text-5xl tall:text-4xl 2xl:text-6xl text-red-600 ">
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

            <div className="flex flex-row justify-center items-center py-20">
              <div className="bg-white shadow-lg flex flex-col border items-center  w-1/3  rounded-lg">
                <div className="border-black w-2/3">
                  <Tabs />
                </div>
              </div>

              <div className="bg-white shadow-lg flex flex-col border items-center  w-1/3 h-[400px] rounded-lg ml-10">
                <div className="flex space-x-4 p-6">
                  <h1 className="font-arcade text-6xl text-red-600 border-b border-black border-full p-10">
                    Your Stats:
                  </h1>
                </div>
                <div className="flex flex-row gap-5 p-8 items-center justify-center">
                  <div className="flex flex-row items-center justify-center gap-2">
                    <ViewsIcon size={25} color="black" />
                    <span>421</span>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-2">
                    <HeartIcon size={30} color="red" />
                    <span>23</span>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-2">
                    <BrokenHeartIcon size={24} color="#3B82F6" />
                    <span>11</span>
                  </div>
                </div>
                {/* <div className="flex items-center justify-center ">
              Most liked post: DISPLAY POST<br></br>
              Most hated post: DISPLAY POST
              </div> */}
              </div>
            </div>
          </div>
        </div>
        <motion.div
          className="absolute top-20 left-1/2 transform -translate-x-1/2 
        -translate-y-1/2 mt-8 rounded-full h-[200px] w-[200px] bg-white border 
        flex justify-center items-center shadow-2xl"
          style={{ width: imageSize, height: imageSize }}
          transition={{ duration: 0.3 }} // Adjust the transition duration as needed
        >
          <Image
            src="/banana.png"
            alt="Profile Picture"
            className="rounded-full h-full w-full"
            width={200}
            height={200}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
