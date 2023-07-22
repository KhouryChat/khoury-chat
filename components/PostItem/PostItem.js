import { useState, useEffect } from "react";
import ViewsIcon from "@/Icons/ViewsIcon";
import HeartIcon from "@/Icons/HeartIcon";
import BrokenHeartIcon from "@/Icons/BrokenHeartIcon";

const PostItem = ({
  id,
  title,
  content,
  views,
  likes,
  dislikes,
  onClick,
  likeClickHandler,
  dislikeClickHandler,
  userName, // new prop
  timestamp // new prop
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
  const getPlainText = () => {
    const strippedContent = content.replace(/^<p>/i, "").replace(/<\/p>$/i, "");
    return strippedContent;
  };

  return (
    content && (
      <div
        onClick={onClick}
        className="bg-white rounded shadow p-4 mb-4 flex flex-col cursor-pointer"
      >
        <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex items-center">
          <p className="mr-2 text-xs text-gray-400">{userName}</p>
          <p className="text-xs text-gray-400">{new Date(timestamp.$date).toLocaleDateString()}</p>
        </div>
      </div>


        <h4 className="text-base text-gray-700">
        {getPlainText(content).split(/\s+/).length > 10
          ? getPlainText(content).split(/\s+/).slice(0, 10).join(" ") + "..."
          : getPlainText(content)}
        </h4>
        <div className="flex justify-between flex-grow text-sm text-gray-500 pt-4">
          <div className="flex items-center">
            <ViewsIcon className="mr-1" />
            <p>{views}</p>
          </div>
          <div className="flex items-center flex-row justify-center gap-5">
            <div
              className="flex flex-row gap-1 items-center"
              onClick={handleLikeClick}
            >
              <HeartIcon className={`mr-1 ${liked ? "text-red-500" : "text-gray-500"}`} />
              <p>{currLikes}</p>
            </div>
            <div
              className="flex flex-row gap-2 items-center"
              onClick={handleDislikeClick}
            >
              <BrokenHeartIcon className={`mr-1 ${disliked ? "text-blue-500" : "text-gray-500"}`}
              />
              <p>{currDislikes}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PostItem;
