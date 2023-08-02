import { motion } from "framer-motion";

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ y: "100%" }}
    animate={{ y: "0%" }}
    transition={{
      delay: 0.4,
      duration: 0.75,
    }}
  >
    {children}
  </motion.div>
);

export default PageTransition;
