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
      try {
        const response = await fetch(
          `http://www.khourychat.com/api/posts/${postID}`
        );
        const data = await response.json();
        setTimestamp(data.timestamp);
        setTitle(data.title);
        setContent(data.content);
        setReplies(data.replies);
        setViews(data.views);
        setLikes(data.likes);
        setDislikes(data.dislikes);
        setCourse(data.course_id);
      } catch (e) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [user]);
  return <div>{content}</div>;
};

export default PostPage;
