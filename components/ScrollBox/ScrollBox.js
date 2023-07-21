import * as React from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";

const ScrollBox = () => {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);

  return (
    <div className="wrapper">
      <motion.div
        className="container"
        style={{
          scale,
        }}
      >
        <motion.div
          className="item"
          style={{
            scaleY: scrollYProgress,
          }}
        />
      </motion.div>
    </div>
  );
};

export default ScrollBox;
