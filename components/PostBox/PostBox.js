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
      className="bg-white cursor-pointer flex flex-col xl:w-[330px] 2xl:w-[400px] xl:h-[450px] 2xl:h-[550px] shadow-2xl gap-4 p-5 justify-between items-center rounded-2xl"
    >
      <div className="xl:text-3xl 2xl:text-4xl font-bold text-center p-2">
        {post.post_title}
      </div>
      <div className="flex flex-row items-center border-b">
        <div>
          <Image
            src="/banana.png"
            width={75}
            height={75}
            alt=""
            className="rounded-full xl:w-[75px] xl:h-[75px] 2xl:w-[90px] 2xl:h-[90px]"
          />
        </div>
        <div className="flex flex-col ">
          <div className="xl:text-lg 2xl:text-xl">
            {userData ? userData.username : "anonymous"}
          </div>
          <div className="xl:text-sm 2xl:text-md italic text-gray-400">
            {formatTimestamp(post.timestamp)}
          </div>
        </div>
      </div>
      <div className="p-4 2xl:text-xl xl:text-lg">
        {post.content.slice(0, 100)}...
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row items-center justify-center gap-4 p-2 xl:text-lg 2xl:text-xl">
          <div className="flex flex-row gap-2 items-center justify-center">
            <HeartIcon size={28} color="red" />
            <span>{post.likes}</span>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <BrokenHeartIcon size={23} color="blue" />
            <span>{post.dislikes}</span>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <ChatIcon height={23} width={23} color="#03AC13" />
            <span>{post.replies.length}</span>
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
