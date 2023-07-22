import React from "react";
import Image from "next/image";
import HeartIcon from "@/Icons/HeartIcon";
import BrokenHeartIcon from "@/Icons/BrokenHeartIcon";
import ChatIcon from "@/Icons/ChatIcon";
import CourseTag from "../CourseTag/CourseTag";
import { formatTimestamp } from "@/util/util";

const PostBox = () => {
  const post = {
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
  };

  return (
    <div className="bg-white flex flex-col w-1/4 shadow-xl gap-4 p-5 justify-center items-center">
      <div className="text-3xl font-bold text-center p-2">
        {post.post_title}
      </div>
      <div className="flex flex-row">
        <div>
          <Image
            src="/banana.png"
            width={75}
            height={75}
            alt=""
            className="rounded-full "
          />
        </div>
        <div className="flex flex-col">
          <div className="text-lg">{"MoistYak"}</div>
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
            <span className="text-lg">32</span>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <BrokenHeartIcon size={23} color="blue" />
            <span className="text-lg">12</span>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <ChatIcon height={23} width={23} color="#03AC13" />
            <span className="text-lg">4</span>
          </div>
        </div>
        <div className="p-2">
          <CourseTag courseID={"CS5001"} />
        </div>
      </div>
    </div>
  );
};

export default PostBox;
