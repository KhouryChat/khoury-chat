import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faHeart,
  faHeartBroken,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

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

  const handleLikeClick = () => {
    if (!disliked) {
      setLiked((prevLiked) => !prevLiked);
      likeClickHandler(!liked, id);
    }
  };

  const handleDislikeClick = () => {
    if (!liked) {
      setDisliked((prevDisliked) => !prevDisliked);
      dislikeClickHandler(!disliked, id);
    }
  };

  return (
    content && (
      <div
        onClick={onClick}
        className="bg-white rounded shadow p-4 mb-4 flex flex-col cursor-pointer"
      >
        <h3 className="text-xl font-bold">{title}</h3>
        <h4 className="text-base font-bold">
          {content.split(/\s+/).slice(0, 10).join(" ")}
        </h4>
        <div className="flex justify-between flex-grow text-sm text-gray-500">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faEye} className="mr-1" />
            <p>{views}</p>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faHeart}
              className={liked ? "text-red-500 mr-1" : "mr-1"}
              onClick={handleLikeClick}
            />
            <p>{currLikes}</p>
            <FontAwesomeIcon
              icon={faHeartBroken}
              className={disliked ? "text-blue-500 mr-1" : "mr-1"}
              onClick={handleDislikeClick}
            />
            <p>{currDislikes}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default PostItem;
