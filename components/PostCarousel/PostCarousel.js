"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import PostBox from "../PostBox/PostBox";
import LeftArrowIcon from "@/Icons/LeftArrowIcon";
import RightArrowIcon from "@/Icons/RightArrowIcon";
import HoverScaleTransition from "../HoverScaleTransition/HoverScaleTransition";

const posts = [
  {
    post_id: "64b3312985a5edd802e70626",
    timestamp: "2023-07-15T23:52:09.097+00:00",
    uid: "zNNgOniN94TGnzX6dbAZ7xXoIBE3",
    post_title: "Reason to Leave this class",
    content:
      "Goes same parallel military till skin evidence funny steady mistake west for actually perhaps loss bring greatest us danger add map phrase sick business and to also conduct the best way to do this",
    replies: ["aidna", "daijndja", "daijndja"],
    views: 421,
    likes: 12,
    dislikes: 5,
    course_id: "CS5001",
  },
  {
    post_id: "64b3312985a5edd802e70626",
    timestamp: "2023-07-15T23:52:09.097+00:00",
    uid: "zNNgOniN94TGnzX6dbAZ7xXoIBE3",
    post_title: "Reason1 to Leave this class",
    content:
      "Goes same parallel military till skin evidence funny steady mistake west for actually perhaps loss bring greatest us danger add map phrase sick business and to also conduct the best way to do this",
    replies: ["aidna", "daijndja", "daijndja"],
    views: 421,
    likes: 12,
    dislikes: 5,
    course_id: "CS5001",
  },
  {
    post_id: "64b3312985a5edd802e70626",
    timestamp: "2023-07-15T23:52:09.097+00:00",
    uid: "zNNgOniN94TGnzX6dbAZ7xXoIBE3",
    post_title: "Reason2 to Leave this class",
    content:
      "Goes same parallel military till skin evidence funny steady mistake west for actually perhaps loss bring greatest us danger add map phrase sick business and to also conduct the best way to do this",
    replies: ["aidna", "daijndja", "daijndja"],
    views: 421,
    likes: 12,
    dislikes: 5,
    course_id: "CS5001",
  },
  {
    post_id: "64b3312985a5edd802e70626",
    timestamp: "2023-07-15T23:52:09.097+00:00",
    uid: "zNNgOniN94TGnzX6dbAZ7xXoIBE3",
    post_title: "Reason3 to Leave this class",
    content:
      "Goes same parallel military till skin evidence funny steady mistake west for actually perhaps loss bring greatest us danger add map phrase sick business and to also conduct the best way to do this",
    replies: ["aidna", "daijndja", "daijndja"],
    views: 421,
    likes: 12,
    dislikes: 5,
    course_id: "CS5001",
  },
];
const PostCarousel = () => {
  const [currentPost, setCurrentPost] = useState(3);
  return (
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
  );
};

export default PostCarousel;
