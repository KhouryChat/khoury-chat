import * as React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { GiHamburgerMenu } from "react-icons/gi";

const Hamburger = ({ isMenuShown }) => {
  const isHomePage = usePathname() == "/";

  const primaryColor = isHomePage ? "white" : "black";
  const secondaryColor = "black";
  return (
    <motion.div
      className="container  rounded h-max"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
    >
      <GiHamburgerMenu
        width={200}
        height={200}
        color={isMenuShown ? secondaryColor : primaryColor}
        className="w-8 h-8"
      />
    </motion.div>
  );
};

export default Hamburger;
