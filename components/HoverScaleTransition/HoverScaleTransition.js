import * as React from "react";
import { motion } from "framer-motion";

const HoverScaleTransition = ({ children }) => {
  return (
    <motion.div
      className=""
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

export default HoverScaleTransition;
