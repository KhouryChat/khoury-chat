import UpArrowIcon from "@/Icons/UpArrowIcon";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const scrollThreshold = 300;

    const handleScroll = () => {
      setShowButton(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showButton && (
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={handleScroll}
          className="opacity-80 cursor-pointer sticky bottom-10 ml-[92%]"
        >
          <UpArrowIcon
            color={"white"}
            width={50}
            height={50}
            className={"backto-shadow"}
          />
        </motion.div>
      )}
    </>
  );
};

export default BackToTop;
