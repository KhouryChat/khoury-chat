import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Transition } from "@headlessui/react";
import MenuItem from "@/components/MenuItem/MenuItem";
import { useState } from "react";
const MenuSidebar = () => {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const [isMenuItemsShown, setIsMenuItemsShown] = useState(false);

  const handleHamburger = () => {
    setIsMenuShown(!isMenuShown);
  };
  return (
    <div>
      <div
        className="absolute overflow-visible top-10 left-10 cursor-pointer"
        style={{ zIndex: 30, width: "20px", height: "20px" }}
        onClick={handleHamburger}
      >
        <GiHamburgerMenu
          width={200}
          height={200}
          color={isMenuShown ? "black" : "white"}
          className="w-8 h-8"
        />
      </div>
      <Transition
        show={isMenuShown}
        afterEnter={() => {
          setIsMenuItemsShown(true);
        }}
        beforeLeave={() => {
          setIsMenuItemsShown(false);
        }}
        enter="transition ease-in-out duration-1000 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-1000 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className="absolute z-20 left-0 w-1/4 bg-white h-screen ">
          <div className="text-xl w-full font-bold flex flex-col gap-4 items-start justify-center ml-10 mt-32">
            <MenuItem
              isMenuItemsShown={isMenuItemsShown}
              text={"Browse Courses"}
            />
            <MenuItem isMenuItemsShown={isMenuItemsShown} text={"About"} />
            <MenuItem isMenuItemsShown={isMenuItemsShown} text={"My Profile"} />
            <MenuItem isMenuItemsShown={isMenuItemsShown} text={"Logout"} />
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default MenuSidebar;
