import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faHeart,
  faHeartBroken,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { random } from "chroma-js";

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
        <h3 className="text-xl font-bold">{title}</h3>
        <h4 className="text-base font-bold">
          {getPlainText(content).split(/\s+/).slice(0, 10).join(" ")}
        </h4>
        <div className="flex justify-between flex-grow text-sm text-gray-500 pt-4">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faEye} className="mr-1" />
            <p>{views}</p>
          </div>
          <div className="flex items-center flex-row justify-center gap-5">
            <div
              className="flex flex-row gap-1 items-center"
              onClick={handleLikeClick}
            >
              <FontAwesomeIcon
                icon={faHeart}
                className={liked ? "text-red-500 mr-1" : "mr-1"}
              />
              <p>{currLikes}</p>
            </div>
            <div
              className="flex flex-row gap-2 items-center"
              onClick={handleDislikeClick}
            >
              <FontAwesomeIcon
                icon={faHeartBroken}
                className={disliked ? "text-blue-500 mr-1" : "mr-1"}
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
