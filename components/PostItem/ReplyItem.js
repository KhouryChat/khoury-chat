// ReplyItem.js

import { useState, useEffect } from "react";
import HeartIcon from "@/Icons/HeartIcon";
import BrokenHeartIcon from "@/Icons/BrokenHeartIcon";

const ReplyItem = ({
  id,
  content,
  likes,
  dislikes,
  onClick,
  likeClickHandler,
  dislikeClickHandler,
  userName,
  timestamp,
}) => {
  const [currLikes, setLikes] = useState(likes || 0);
  const [currDislikes, setDislikes] = useState(dislikes || 0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    if (liked) {
      setLikes((currLikes) => currLikes + 1);
    } else {
      setLikes((currLikes) => (currLikes > 0 ? currLikes - 1 : 0));
    }
  }, [liked]);

  useEffect(() => {
    if (disliked) {
      setDislikes((currDislikes) => currDislikes + 1);
    } else {
      setDislikes((currDislikes) => (currDislikes > 0 ? currDislikes - 1 : 0));
    }
  }, [disliked]);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (!disliked) {
      setLiked((prevLiked) => !prevLiked);
      likeClickHandler(!liked, id);
    } else {
      setLiked(true);
      setDisliked(false);
      likeClickHandler(true, id);
    }
  };

  const handleDislikeClick = (e) => {
    e.stopPropagation();

    if (!liked) {
      setDisliked((prevDisliked) => !prevDisliked);
      dislikeClickHandler(!disliked, id);
    } else {
      setLiked(false);
      setDisliked(true);
      dislikeClickHandler(true, id);
    }
  };

  return (
    <div
      onClick={onClick}
      className="reply bg-white p-5 my-2 border-b border-gray-300 w-full max-w-2xl self-center"
    >
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-400">{userName}</div>
        <div className="text-xs text-gray-400 text-right">
          {new Date(timestamp.$date).toLocaleDateString()}
        </div>
      </div>
      <div className="mt-2 mb-4">{content}</div>
      <div></div>
      <div className="flex items-center flex-row justify-start gap-5">
        <div
          className="flex flex-row gap-1 items-center"
          onClick={handleLikeClick}
        >
          <HeartIcon
            className={`mr-1 cursor-pointer justify-center ${
              liked ? "text-red-500" : "text-gray-500"
            }`}
          />
          <p>{currLikes}</p>
        </div>
        <div
          className="flex flex-row gap-2 items-center"
          onClick={handleDislikeClick}
        >
          <BrokenHeartIcon
            className={`mr-1 cursor-pointer ${
              disliked ? "text-blue-500" : "text-gray-500"
            }`}
          />
          <p>{currDislikes}</p>
        </div>
      </div>
    </div>
  );
};

export default ReplyItem;
