"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import PostBox from "../PostBox/PostBox";
import LeftArrowIcon from "@/Icons/LeftArrowIcon";
import RightArrowIcon from "@/Icons/RightArrowIcon";
import HoverScaleTransition from "../HoverScaleTransition/HoverScaleTransition";

const PostCarousel = ({ posts }) => {
  console.log(posts);
  const [currentPost, setCurrentPost] = useState(3);
  return (
    posts.length > 0 && (
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-row gap-10 items-center justify-center w-1/4">
          <HoverScaleTransition>
            <LeftArrowIcon
              onClick={() => {
                if (currentPost > 0) setCurrentPost(currentPost - 1);
              }}
              color="white"
              size={64}
              className={"dpshadow-small cursor-pointer"}
            />
          </HoverScaleTransition>
          <motion.div
            className=""
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.8 }}
          >
            <motion.div
              key={currentPost}
              className=""
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <PostBox post={posts[currentPost]} />
            </motion.div>
          </motion.div>
          <HoverScaleTransition>
            <RightArrowIcon
              onClick={() => {
                if (currentPost < posts.length - 1)
                  setCurrentPost(currentPost + 1);
              }}
              color="white"
              size={64}
              className={" dpshadow-small cursor-pointer"}
            />
          </HoverScaleTransition>
        </div>
      </div>
    )
  );
};

export default PostCarousel;
