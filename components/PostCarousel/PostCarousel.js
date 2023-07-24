"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import PostBox from "../PostBox/PostBox";
import LeftArrowIcon from "@/Icons/LeftArrowIcon";
import RightArrowIcon from "@/Icons/RightArrowIcon";
import HoverScaleTransition from "../HoverScaleTransition/HoverScaleTransition";

const PostCarousel = ({
  posts = {
    post_id: "64bc98742232b268e87851cf",
    timestamp: "2023-07-23T03:03:16.521+00:00",
    uid: "6DN3p6TZ1LXkjmLOExEvQUETQTg2",
    post_title: "Hello this is an amazing course!",
    content: "I love the professor and the course a lot!",
    replies: [],
    views: 1,
    likes: 0,
    dislikes: 0,
    course_id: "CS5002",
    is_reply: false,
    parent_postID: null,
  },
}) => {
  const [currentPost, setCurrentPost] = useState(0);
  return (
    posts &&
    posts.length > 0 && (
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-row gap-10 items-center justify-center xl:w-1/4 2xl:w-1/2">
          <HoverScaleTransition>
            <LeftArrowIcon
              onClick={() => {
                if (currentPost > 0) setCurrentPost(currentPost - 1);
              }}
              color="white"
              size={64}
              className={
                "dpshadow-small cursor-pointer xl:w-[64px] xl:h-[64px] 2xl:w-[96px] 2xl:h-[96px]"
              }
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
              className={
                "dpshadow-small cursor-pointer xl:w-[64px] xl:h-[64px] 2xl:w-[96px] 2xl:h-[96px]"
              }
            />
          </HoverScaleTransition>
        </div>
      </div>
    )
  );
};

export default PostCarousel;
