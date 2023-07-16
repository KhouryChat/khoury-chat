"use client";
import { useAuthContext } from "@/Context/AuthContext";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiFillHeart } from "react-icons/ai";
import { BsFillHeartbreakFill } from "react-icons/bs";
import CourseTag from "@/components/CourseTag/CourseTag";
const PostPage = ({ params }) => {
  const router = useRouter();
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

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
  const sendHome = () => {
    router.push("/");
  };

  return (
    <div className="bg-black h-screen text-white flex flex-col items-center p-5 gap-4">
      <div className="flex flex-row justify-between items-center w-full">
        <div onClick={sendHome} className="cursor-pointer hover:shadow-xl">
          <Image src="/husky.png" width={150} height={150} alt="Logo" />
        </div>
        <div className="text-8xl font-bold mr-46">POST</div>
        <div className="pr-10">
          <CourseTag courseID={course} />
        </div>
      </div>
      <div className="p-10 max-w-2xl text-justify text-xl">{content}</div>
      <div className="flex flex-row bottom-0 absolute items-center justify-between p-3 bg-red-600 w-full text-lg font-bold font-mono italic ">
        <div className="flex flex-row gap-8 items-center justify-between">
          <div className="flex flex-row gap-4 items-center justify-center">
            <AiFillHeart width={80} height={80} />
            <span>{likes ? likes : 0}</span>
          </div>
          <div className="flex flex-row gap-4 items-center justify-center">
            <BsFillHeartbreakFill width={80} height={80} />
            <span>{dislikes ? dislikes : 0}</span>
          </div>
        </div>
        <div>{formatTimestamp(timestamp["$date"])}</div>
      </div>
    </div>
  );
};

export default PostPage;
