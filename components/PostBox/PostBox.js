import React, { useEffect, useState } from "react";
import Image from "next/image";
import HeartIcon from "@/Icons/HeartIcon";
import BrokenHeartIcon from "@/Icons/BrokenHeartIcon";
import ChatIcon from "@/Icons/ChatIcon";
import CourseTag from "../CourseTag/CourseTag";
import { formatTimestamp } from "@/util/util";
import { useRouter } from "next/navigation";

const PostBox = ({ post }) => {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const getUserDetails = async () => {
      const response = await fetch(
        `https://www.khourychat.com/api/users/${post.uid}`
      );
      const result = await response.json();
      setUserData(result);
    };
    getUserDetails();
  }, [post]);

  return (
    <div
      onClick={() => {
        router.push(`/course/${post.course_id}`);
      }}
      className="bg-white cursor-pointer flex flex-col w-[330px] h-[450px] shadow-2xl gap-4 p-5 justify-between items-center rounded-2xl"
    >
      <div className="text-3xl font-bold text-center p-2">
        {post.post_title}
      </div>
      <div className="flex flex-row items-center border-b">
        <div>
          <Image
            src="/banana.png"
            width={75}
            height={75}
            alt=""
            className="rounded-full "
          />
        </div>
        <div className="flex flex-col ">
          <div className="text-lg ">
            {userData ? userData.username : "anonymous"}
          </div>
          <div className="text-sm italic text-gray-400">
            {formatTimestamp(post.timestamp)}
          </div>
        </div>
      </div>
      <div className="p-4">{post.content.slice(0, 100)}...</div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row items-center justify-center gap-4 p-2">
          <div className="flex flex-row gap-2 items-center justify-center">
            <HeartIcon size={28} color="red" />
            <span className="text-lg">{post.likes}</span>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <BrokenHeartIcon size={23} color="blue" />
            <span className="text-lg">{post.dislikes}</span>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <ChatIcon height={23} width={23} color="#03AC13" />
            <span className="text-lg">{post.replies.length}</span>
          </div>
        </div>
        <div className="p-2">
          <CourseTag courseID={post.course_id} />
        </div>
      </div>
    </div>
  );
};

export default PostBox;
