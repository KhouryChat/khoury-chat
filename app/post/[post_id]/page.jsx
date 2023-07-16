"use client";
import React, { useState } from "react";

const PostPage = ({ params }) => {
  const postID = params.post_id;
  const [timestamp, setTimestamp] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [replies, setReplies] = useState("");
  const [views, setViews] = useState("");
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [course, setCourse] = useState("");

  return <div></div>;
};

export default PostPage;
