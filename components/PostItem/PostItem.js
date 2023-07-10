import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";

const PostItem = ({ title, content, views, likes }) => {
  return (
    <div className="bg-white rounded shadow p-4 mb-4 flex flex-col">
      <h3 className="text-xl font-bold">{title}</h3>
      <h4 className="text-base font-bold">
        {content.split(/\s+/).slice(0, 10).join(" ") + "..."}
      </h4>
      <div className="flex justify-between flex-grow text-sm text-gray-500">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faEye} className="mr-1" />
          <p>{views}</p>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faHeart} className="mr-1" />
          <p>{likes}</p>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
