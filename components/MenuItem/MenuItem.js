import React from "react";
import { Transition } from "@headlessui/react";
import HorizontalLine from "../HLine/Hline";
const MenuItem = ({ isMenuItemsShown, text }) => {
  return (
    <Transition
      show={isMenuItemsShown}
      enter="transition ease-in-out duration-1000 transform"
      enterFrom="-translate-y-full"
      enterTo="translate-y-0"
      leave="transition ease-in-out duration-1000 transform"
      leaveFrom="translate-y-0"
      leaveTo="-translate-y-full"
    >
      <Transition.Child
        enter="transition-opacity duration-[1s]"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-[1s]"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="py-3 w-full">{text}</div>
        <HorizontalLine />
      </Transition.Child>
    </Transition>
  );
};

export default MenuItem;
