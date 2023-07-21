import React, { useRef } from "react";
import { Transition } from "@headlessui/react";
import MenuItem from "@/components/MenuItem/MenuItem";
import { useState } from "react";
import { useAuthContext } from "@/Context/AuthContext";
import signOut from "@/auth/firebase/signout";
import { useEffect } from "react";
import Hamburger from "../Hamburger/Hamburger";

const MenuSidebar = ({ isMenuShown, setIsMenuShown }) => {
  const ref = useRef(null);
  const user = useAuthContext();

  const [isMenuItemsShown, setIsMenuItemsShown] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(user["user"] != null);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsMenuShown(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [isMenuShown]);

  useEffect(() => {
    setLoggedIn(user["user"] != null);
  }, [user]);

  let username = "";
  if (user["user"]) {
    username = user["user"]["displayName"];
  }

  const handleHamburger = () => {
    setIsMenuShown(!isMenuShown);
  };

  return (
    <div ref={ref}>
      <div
        className="absolute  top-10 left-10 cursor-pointer"
        style={{ zIndex: 10, width: "20px", height: "20px" }}
        onClick={handleHamburger}
      >
        <Hamburger isMenuShown={isMenuShown} />
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
        <div className="absolute left-0 w-1/4 bg-white h-screen shadow-2xl">
          <div className="text-xl w-full font-bold flex flex-col gap-4 items-start justify-center ml-10 mt-32">
            <MenuItem
              isMenuItemsShown={isMenuItemsShown}
              text={"Home"}
              routeTo="/"
            />

            <MenuItem
              isMenuItemsShown={isMenuItemsShown}
              text={"Browse Courses"}
              routeTo="/browse"
            />
            <MenuItem
              isMenuItemsShown={isMenuItemsShown}
              text={"My Profile"}
              routeTo={`/user/${username}`}
            />
            {isLoggedIn ? (
              <>
                <MenuItem
                  isMenuItemsShown={isMenuItemsShown}
                  text={"Logout"}
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem
                  isMenuItemsShown={isMenuItemsShown}
                  text={"Sign in"}
                  routeTo={"/test"}
                />
              </>
            )}
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default MenuSidebar;
