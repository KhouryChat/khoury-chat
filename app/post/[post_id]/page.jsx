"use client";
import { useAuthContext } from "@/Context/AuthContext";
import React, { useEffect, useState } from "react";

const PostPage = ({ params }) => {
  const user = useAuthContext();
  const postID = params.post_id;
  const [timestamp, setTimestamp] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [replies, setReplies] = useState("");
  const [views, setViews] = useState("");
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://www.khourychat.com/api/");
    };
    fetchPosts();
  }, [user]);
  return <div></div>;
};

export default PostPage;
