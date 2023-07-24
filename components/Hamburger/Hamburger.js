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
        className="xl:w-8 xl:h-8 2xl:w-12 2xl:h-12 tall:w-8 tall:h-8"
      />
    </motion.div>
  );
};

export default Hamburger;
