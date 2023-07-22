"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/Context/AuthContext";
import Husky from "@/components/Husky/Husky";
import DownArrowIcon from "@/Icons/DownArrowIcon";
import SearchBar from "@/components/SearchBar/SearchBar";
import HorizontalLine from "@/components/HLine/Hline";
import Image from "next/image";
import PostItem from "@/components/PostItem/PostItem";
import Tilt from "react-parallax-tilt";
import BackToTop from "@/components/BackToTop/BackToTop";

function Home() {
  const router = useRouter();
  const user = useAuthContext();
  const scrollRef = useRef(null);

  const [searchValue, setSearchValue] = useState("Search courses...");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   const fetchLatestPosts = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://www.khourychat.com/api/posts/latest"
  //       );
  //       const data = await response.json();
  //       setTrendingPosts(data);
  //     } catch (error) {
  //       console.log("Error fetching latest posts:", error);
  //     }
  //   };
  //   fetchLatestPosts();
  // }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    const filteredCourses = courses.filter(
      (course) =>
        course.course_title.toLowerCase().includes(value.toLowerCase()) ||
        course.course_id.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCourses(filteredCourses.slice(0, 10));
    setShow(!show);
  };

  const handleSelect = (option) => {
    router.push(`/course/${option.course_id}`);
  };

  return (
    <div className="flex flex-col h-max w-screen red-body">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div className="flex flex-col items-start justify-center h-screen gap-16 p-20">
            <div className="khoury-title text-white text-[10rem] font-extrabold leading-[9rem]">
              KHOURY <br /> CHAT
            </div>
            <div className="flex flex-col w-2/3 ml-3">
              <h2 className="text-white text-3xl mb-4">
                What course are you looking for?
              </h2>
              <input
                type="text"
                placeholder=""
                className="focus:outline-none w-full text-white outline-none  bg-transparent border-b-solid border-b border-b-white  p-2 text-xl"
                onClick={() => setSearchValue("")}
                value={searchValue}
                onChange={handleSearch}
              />
              {filteredCourses.length > 0 && searchValue && (
                <div className="absolute overflow-visible mt-10 border-2 w-1/3 bg-white shadow-lg">
                  {filteredCourses.map((course) => (
                    <div
                      key={course._id}
                      className="border-b cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSelect(course)}
                    >
                      {`${course.course_id}: ${course.course_title}`}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div
            ref={scrollRef}
            className="text-white text-6xl font-bold flex ml-24 pt-20"
          >
            Trending Posts
          </div>
        </div>
        <div className="flex flex-row relative right-72 bottom-80">
          <Tilt perspective={6000}>
            <Husky className="husky" />
          </Tilt>
        </div>

        <div
          onClick={handleScroll}
          className="text-md z-10 cursor-pointer absolute bottom-6 right-1/2 flex flex-col  items-center text-white"
        >
          <div className="hover:text-blue-500">Explore</div>
          <button className="transition-transform duration-300 ease-in-out hover:translate-y-3">
            <DownArrowIcon
              className="w-12 h-12"
              color={"white"}
              width={100}
              height={100}
            />
          </button>
        </div>
        <BackToTop />
      </div>
    </div>
  );
}
export default Home;
