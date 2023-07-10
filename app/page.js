"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PostItem from "@/components/PostItem/PostItem";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");
  // Dummy data simulating the data you might fetch from a database
  const [options, setOptions] = useState([
    { title: "Option 1" },
    { title: "Option 2" },
    { title: "Option 3" },
    { title: "Option 4" },
    { title: "Option 5" },
    { title: "Option 6" },
    { title: "Option 7" },
    { title: "Option 8" },
    { title: "Option 9" },
    { title: "Option 10" },
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

  const filteredOptions = options.filter((option) => {
    const regex = new RegExp(`(${searchValue}|\\d+)`, "i");
    return regex.test(option.title);
  });

  return (
    <>
      <header className="bg-black py-6 flex flex-grow items-center justify-between">
        <div className="justify-start ml-4">
          <h1 className="flex flex-row gap-4 text-4xl justify-center items-center px-8 text-3xl font-sans font-bold text-white">
            <div>
              <Image src="/husky.png" alt="Logo" width={80} height={80} />
            </div>
            Khoury Course Forum
          </h1>
        </div>

        <div className="space-x-4 flex mr-10">
          <button
            onClick={goToRegister}
            className="bg-red-500 text-white px-4 py-2 h-max rounded"
          >
            Register
          </button>
          <button
            onClick={gotToLogin}
            className="bg-gray-500 text-white px-4 py-2 h-max rounded"
          >
            Login
          </button>
        </div>
      </header>
      <div className="bg-black pr-8">
        <div className="flex justify-center py-32">
          <div className="flex flex-col w-1/2 ml-6">
            <input
              type="text"
              placeholder="Search courses"
              className="border-2 focus:outline-none outline-none border-none border-gray-300 w-full p-3 rounded-full"
              value={searchValue}
              onChange={handleSearch}
            />
            {searchValue && (
              <div className="border-2 w-full bg-white rounded shadow-lg">
                {filteredOptions.map((option) => (
                  <div
                    key={option.title}
                    className="border-b cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSelect(option)}
                  >
                    {option.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center py-8 bg-black">
        <div className="w-1/2">
          <PostItem
            title="Post 1"
            content="Great professor and great course. Definitely need take this one. "
            views={100}
            likes={50}
          />
          <PostItem
            title="Post 2"
            content="What do you think of CS5800 by professor Pavlu Virgil? "
            views={150}
            likes={80}
          />
          <PostItem
            title="Post 3"
            content="I'm currently looking for a study buddy for CS5002. Anyone wanna join? "
            views={80}
            likes={20}
          />
          <PostItem
            title="Post 4"
            content="Horrible midterm!!! What do you feel about the midterm of Algorithms? "
            views={1000}
            likes={50}
          />
          <PostItem
            title="Post 5"
            content="Just figure out a great study resource for 5800!"
            views={150}
            likes={80}
          />
          <PostItem
            title="Post 6"
            content="Looking for teammates for a hackathon project"
            views={80}
            likes={20}
          />
        </div>
      </div>
    </>
  );
}
