import { useRouter } from "next/navigation";
import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import MenuItem from "../MenuItem/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { index } from "d3";
import Image from "next/image";


const Sidebar = ({ professors }) => {

  const router = useRouter();

  const sendProf = (prof) => {
    console.log("Button clicked:", prof);
    router.push(
      `/professor/${
        prof.toLowerCase().split(" ")[0] +
        "-" +
        prof.toLowerCase().split(" ")[1]
      }`
    );
  };

  // const sendProf = (e) => {
  //   //e.stopPropagation();
  //   console.log('Button clicked:', e.target.innerText); // Add this line
  //   router.push(
  //     `/professor/${
  //       e.target.innerText.toLowerCase().split(" ")[0] +
  //       "-" +
  //       e.target.innerText.toLowerCase().split(" ")[1]
  //     }`
  //   );
  // };
  return (
    // <div className="h-[2000px] shadow-lg text-black text-lg flex flex-col items-start w-96">
    // <div className="w-full h-14 mt-20">
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center items-center px-4 py-2 text-lg font-semibold text-white bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 rounded-lg mt-6">
            Instructors
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 left-10 right-0 w-56 mt-2 origin-top-right bg-red-700 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-2 py-1">
              {professors.map((prof, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <button
                      //onClick={sendProf}
                      onClick={() => sendProf(prof)}
                      //isMenuItemsShown={active}
                      //text={active ? <span className="bg-red-500 text-white group flex rounded-md items-center w-full px-2 py-2 text-sm">{prof}</span> : prof}
                      className={`group flex items-center w-full px-2 py-2 text-sm ${
                        active
                          ? "bg-red-500 text-white"
                          : "text-white hover:bg-red-400 hover:text-black"
                      }`}
                    >
                      {prof}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Sidebar;
