"use client";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");
  // Dummy data simulating the data you might fetch from a database
  const [options, setOptions] = useState([
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6",
    "Option 7",
    "Option 8",
    "Option 9",
    "Option 10",
  ]);

  const goToRegister = () => {
    router.push("/signup");
  };
  const gotToLogin = () => {
    router.push("/login");
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
  };

  const handleSelect = (option) => {
    setSearchValue(option);
  };

  const PostItem = ({ title, views, likes }) => {
    return (
      <div className="bg-white rounded shadow p-4 mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-gray-500 flex items-center">
          <FontAwesomeIcon icon={faEye} className="mr-1" />
          {views}
        </p>
        <p className="text-sm text-gray-500 flex items-center">
          <FontAwesomeIcon icon={faHeart} className="mr-1" />
          {likes}
        </p>
      </div>
    );
  };

  return (
    <div className="bg-black pr-8">
      <header className="py-6 flex flex-grow justify-between">
        <h1 className="px-8 text-3xl font-sans font-bold text-white">
          Khoury Course Forum
        </h1>
        <div className="space-x-4 flex justify-end">
          <button
            onClick={goToRegister}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Register
          </button>
          <button
            onClick={gotToLogin}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </div>
      </header>
      <div className="flex justify-center py-32">
        <div className="flex flex-col w-1/2">
          <input
            type="text"
            placeholder="Search courses"
            className="border-2 border-gray-300 w-full p-2 rounded"
            value={searchValue}
            onChange={handleSearch}
          />
          {searchValue && (
            <div className="border-2 w-full bg-white rounded shadow-lg">
              {options
                .filter((option) =>
                  option.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((option) => (
                  <div
                    key={option}
                    className="border-b cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <PostItem title="Post 1" views={100} likes={50} />
          <PostItem title="Post 2" views={150} likes={80} />
          <PostItem title="Post 3" views={80} likes={20} />
        </div>
      </div>
    </div>
  );
}
