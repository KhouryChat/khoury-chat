import React, { useRef } from "react";
import { Transition } from "@headlessui/react";
import MenuItem from "@/components/MenuItem/MenuItem";
import { useState } from "react";
import { useAuthContext } from "@/Context/AuthContext";
import signOut from "@/auth/firebase/signout";
import { useEffect } from "react";
import Hamburger from "../Hamburger/Hamburger";
import { usePathname, useRouter } from "next/navigation";

const MenuSidebar = ({ isMenuShown, setIsMenuShown }) => {
  const ref = useRef(null);
  const user = useAuthContext();
  const path = usePathname();
  const router = useRouter();

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

  const scrollToAbout = () => {
    if (path == "/") {
      const aboutElement = document.getElementById("about");
      if (aboutElement) {
        aboutElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/");
      setTimeout(() => {
        const aboutElement = document.getElementById("about");
        if (aboutElement) {
          aboutElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 1000);
    }
  };
  const scrollToTeam = () => {
    if (path == "/") {
      const aboutElement = document.getElementById("team");
      if (aboutElement) {
        aboutElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/");
      setTimeout(() => {
        const aboutElement = document.getElementById("team");
        if (aboutElement) {
          aboutElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 1000);
    }
  };

  const handleHamburger = () => {
    setIsMenuShown(!isMenuShown);
  };

  return (
    <div ref={ref}>
      <div
        className="absolute top-10 left-10 cursor-pointer"
        style={{ zIndex: 1000, width: "20px", height: "20px" }}
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
        enter="transition ease-in-out duration-500 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-500 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className="absolute top-0 left-0 w-1/4 bg-white h-screen shadow-2xl">
          <div className="xl:text-xl 2xl:text-2xl tall:text-xl w-full font-bold flex flex-col xl:gap-4 2xl:gap-6 tall:gap-4 items-start justify-center ml-10 mt-32">
            <MenuItem
              isMenuItemsShown={isMenuItemsShown}
              text={"Home"}
              routeTo="/"
              setMenuShown={setIsMenuShown}
            />

            <MenuItem
              isMenuItemsShown={isMenuItemsShown}
              text={"Browse Courses"}
              routeTo="/browse"
              setMenuShown={setIsMenuShown}
            />
            <MenuItem
              isMenuItemsShown={isMenuItemsShown}
              text={"About"}
              onClick={scrollToAbout}
              setMenuShown={setIsMenuShown}
            />
            <MenuItem
              isMenuItemsShown={isMenuItemsShown}
              text={"Our Team"}
              onClick={scrollToTeam}
              setMenuShown={setIsMenuShown}
            />
            {isLoggedIn ? (
              <>
                <MenuItem
                  isMenuItemsShown={isMenuItemsShown}
                  text={"My Profile"}
                  routeTo={`/user/${username}`}
                  setMenuShown={setIsMenuShown}
                />
                <MenuItem
                  isMenuItemsShown={isMenuItemsShown}
                  text={"Logout"}
                  onClick={() => signOut()}
                  setMenuShown={setIsMenuShown}
                />
              </>
            ) : (
              <>
                <MenuItem
                  isMenuItemsShown={isMenuItemsShown}
                  text={"Sign in"}
                  routeTo={"/login"}
                  setMenuShown={setIsMenuShown}
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
