import * as React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import HamburgerIcon from "@/Icons/HamburgerIcon";

const Hamburger = ({ isMenuShown }) => {
  const isHomePage = usePathname() == "/";

  const primaryColor = isHomePage ? "white" : "black";
  const secondaryColor = "black";
  return (
    <motion.div
      className=""
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
    >
      <HamburgerIcon
        width={200}
        height={200}
        color={isMenuShown ? secondaryColor : primaryColor}
        className="w-8 h-8"
      />
    </motion.div>
  );
};

export default Hamburger;
