import UpArrowIcon from "@/Icons/UpArrowIcon";
import React from "react";
import { motion } from "framer-motion";

const BackToTop = () => {
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      onClick={handleScroll}
      className="opacity-80 cursor-pointer fixed bottom-10 right-10"
    >
      <UpArrowIcon
        color={"white"}
        width={50}
        height={50}
        className={"backto-shadow"}
      />
    </motion.div>
  );
};

export default BackToTop;
