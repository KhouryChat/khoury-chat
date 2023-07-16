"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PostItem from "@/components/PostItem/PostItem";
import Image from "next/image";
import { useEffect } from "react";
import signOut from "@/auth/firebase/signout";
import { useAuthContext } from "@/Context/AuthContext";

export default function Home() {
  const router = useRouter();
  const user = useAuthContext();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    setLoggedIn(user["user"] != null);
  }, [user]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await fetch(
          "https://www.khourychat.com/api/posts/latest"
        );
        const data = await response.json();
        setTrendingPosts(data);
        console.log(data);
      } catch (error) {
        console.log("Error fetching latest posts:", error);
      }
    };
    fetchLatestPosts();
  }, []);

  let imageURL = "https://picsum.photos/200/200";
  const logOut = () => {
    signOut();
    setLoggedIn(false);
    router.push("/");
  };
  console.log(user);
  const goTopost = (courseID) => {
    router.push(`/course/${courseID}`);
  };

  const goToProfile = () => {
    router.push("/user/" + user["user"]["displayName"]);
  };
  const goToRegister = () => {
    router.push("/signup");
  };
  const gotToLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`https://www.khourychat.com/api/courses`);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.log("error fetching courses", error);
      }
    };

    fetchCourses();
  }, [router]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    const filteredCourses = courses.filter(
      (course) =>
        course.course_title.toLowerCase().includes(value.toLowerCase()) ||
        course.course_id.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCourses(filteredCourses.slice(0, 10));
  };

  const handleSelect = (option) => {
    router.push(`/course/${option.course_id}`);
  };

  return (
    <>
      <header className="bg-black py-6 flex flex-grow items-center justify-between border-b-2 border-red-500">
        <div className="justify-start ml-4">
          <h1 className="flex flex-row gap-4 text-4xl justify-center items-center px-8 font-bold text-white">
            <div>
              <Image src="/husky.png" alt="Logo" width={80} height={80} />
            </div>
            Khoury Course Forum
          </h1>
        </div>

        <div className="space-x-4 flex mr-10 ">
          {isLoggedIn ? (
            <div className="flex flex-row mr-10 gap-4 items-center">
              <button
                onClick={goToProfile}
                className="bg-gray-500 text-white px-4 py-2 h-max rounded hover:bg-gray-400"
              >
                Profile
              </button>
              <button
                onClick={logOut}
                className="bg-red-600 text-white px-4 py-2 h-max rounded hover:bg-red-400"
              >
                Logout
              </button>
              <Image
                className="rounded-full"
                src={imageURL}
                alt="P"
                width={60}
                height={60}
              />
            </div>
          ) : (
            <>
              <button
                onClick={goToRegister}
                className="bg-red-600 text-white px-4 py-2 h-max rounded hover:bg-red-400"
              >
                Register
              </button>
              <button
                onClick={gotToLogin}
                className="bg-gray-500 text-white px-4 py-2 h-max rounded hover:bg-gray-400"
              >
                Login
              </button>
            </>
          )}
        </div>
      </header>
      <div className="bg-black pr-8">
        <div className="flex justify-center py-32">
          <div className="flex flex-col w-1/2 ml-6">
            <h2 className="text-white text-4xl mb-4">
              What course are you looking for?
            </h2>
            <input
              type="text"
              placeholder="Search courses"
              className="border-2 focus:outline-none outline-none border-none border-gray-300 w-full p-3 rounded-full"
              value={searchValue}
              onChange={handleSearch}
            />
            {searchValue && (
              <div className="border-2 w-full bg-white rounded shadow-lg">
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
      </div>
      <div className="flex justify-center py-8 bg-black">
        <div className="w-1/2">
          <h2 className="text-white text-4xl mb-4">Trending Posts...</h2>
          <div>
            {trendingPosts.map((post) => (
              <PostItem
                onClick={() => goTopost(post.course_id)}
                key={post["post_id"]}
                title={post.title}
                content={post.content}
                views={post.views}
                likes={post.likes}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
