import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuthContext } from "@/Context/AuthContext";
import CourseTag from "@/components/CourseTag/CourseTag";
import HeartIcon from "@/Icons/HeartIcon";
import BrokenHeartIcon from "@/Icons/BrokenHeartIcon";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRouter } from 'next/navigation';
import fetchUserName from "@/handler/fetchUsername";


const PostModal = ({postID, onClose}) => {
  const router = useRouter();
  const user = useAuthContext();
  const isLoggedIn = user["user"] !== null;
  console.log("is logged in", isLoggedIn);
  const [post,setPost] = useState(null);
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [replies,setReplies] = useState([]);
  const [repliesLoading, setRepliesLoading] = useState(false);
  const [repliesError, setRepliesError] = useState(null);

  useEffect(() => {
  const fetchPost = async() => {
    setPostLoading(true);
    setPostError(null);
    try{
      const response = await fetch(`https://www.khourychat.com/api/posts/${postID}`)
      const data = await response.json();
      setPost(data)
    } catch (error) {
      setPostError(error.message)
    } finally {
      setPostLoading(false);
    }
  };
  fetchPost();

},[postID]);

useEffect(() => {

  const fetchReplies = async () => {
    if(post?.replies?.length > 0) {
      setRepliesLoading(true);
      setRepliesError(null)
    }
    try {
      const data = await Promise.all(
        post.replies.map((replyID) => 
          fetch(`https://www.khourychat.com/api/posts/${replyID}`).then((response) => response.json())
        )
      );
      const repliesWithUsernames = await Promise.all(data.map(async (reply) => {
        const username = await fetchUserName(reply.uid);
        return {...reply, username: username || "Anonymous mouse"};
      }));
      setReplies(repliesWithUsernames);

    } catch(error){
      setRepliesError(error.message)
    } finally {
      setRepliesLoading(false);
    }
  };

  if(post) {
    fetchReplies();
  }


},[post]);



  const buildComment = () => ({
    uid: user["user"]["uid"],
    course_id: post["course_id"],
    post_title: "",
    content: newComment,
    replies: [],
    likes: 0,
    view: 1,
    dislikes: 0,
    is_reply: true,
    parent_postID: postID,

});

const [addCommentLoading, setAddCommentLoading] = useState(false);
const [addCommentError, setAddCommentError] = useState(null);

  const addComment = async() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }


    if (user && user["user"]) {
      const comment = buildComment();
      setAddCommentLoading(true);
      setAddCommentError(null);

      try{
        const response = await fetch(`https://www.khourychat.com/api/posts/${postID}/comments`, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
       body: JSON.stringify(comment)
    });

    console.log("response:", response);

    const data = await response.json(); //data is comment obj
    console.log("newly added comment: ",data);
    console.log("post by: ", user);

    if (!response.ok) {
      throw new Error(data.message || "Could not post the comment");
    }

    // Fetch the username
    const username = await fetchUserName(user["user"]["uid"]);

    // Add the username to the comment data
    const commentWithUsername = {...data, username: username || "Anonymous mouse"};
    setReplies(prevReplies => [...prevReplies,commentWithUsername]);
    //setPost((prev) => ({...prev,replies:[...prev.replies,data]}));
    setNewComment("");

      } catch (error) {
        setAddCommentError(error.message);

  } finally {
    setAddCommentLoading(false);
  }
};
};

const [username, setUsername] = useState(null);

useEffect(() => {
  if (user && user['user'] && user['user']['uid']) {
    fetchUserName(user['user']['uid'])
      .then(setUsername)
      .catch(err => {
        // Here you can handle the error in any way you see fit
        console.error(err);
      });
  }
}, [user]);

    

      return (
        <>
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50"></div>
            <div className="fixed inset-0 z-20 overflow-y-auto w-full bg-white h-full text-gray-700">
            
          
          <div className="w-full bg-violet-200 text-white sticky top-0 z-30 px-1 flex justify-between items-center">
        {/* <div>{post?.user_name}</div> */}
        <div className="ml-4">
        <div>{username || "Anonymous mouse"}</div>
        </div>
        <div className="w-full flex justify-end p-4">
          <button onClick={onClose} className="mt-0 mr-4 mb-4 ml-4 red-body hover:bg-red-400 text-white font-bold py-2 px-4 rounded">Close</button>
        </div>
      </div>

          {postLoading ? (
            <p>Loading...</p>
            ) : postError ? (
            <p>Error occurred while loading the post.</p>
            ) : post?(
            <>
          <div className="flex flex-col justify-between items-center w-full px-5 py-3">
          <div className="flex flex-col justify-between items-center w-full">
            <div className="text-xl font-bold mr-46">{post.post_title}</div>
          </div>
          <div className="p-5 text-justify text-xl border border-gray-300 rounded-md shadow-md bg-white w-full max-w-2xl my-5">
            {post.content}
          </div>
          <div className="w-full max-w-2xl text-right text-sm text-gray-500">
            {new Date(post.timestamp.$date).toLocaleDateString()}
        </div>
          </div>
          
            <form onSubmit={(e) => {
              e.preventDefault();
              //if (!user) router.push("/login");
              addComment();
              setNewComment('');
          }} className="w-full p-5 flex flex-col items-center">
            {isLoggedIn && (
              <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Write your comment here..."
                className="w-full max-w-2xl h-32 p-2 bg-gray-200 rounded-md"
              />
              )}
              <div className="w-full max-w-2xl text-right p-2">
              <button type="submit" className="red-body text-white py-2 px-4 rounded-md" disabled={isLoggedIn && !newComment.trim()}>Add
              </button>
              </div>
            </form>
          
        <div className="replies-section p-5 overflow-y-auto flex flex-col items-center">
          {repliesLoading ? (
            <p>Loading replies...</p>
          ) : repliesError ? (
            <p>Error occurred while loading the replies.</p>
          ) : (
            replies?.map((reply, index) => (
              <div key={index} className="reply bg-white p-5 my-2 border-b border-gray-300 w-full max-w-2xl self-center">
                <div className="flex justify-between">
                <div>{reply.content}</div>
              <div>
              <div className="text-xs text-gray-400">{reply.username}</div> 
                  <div className="text-xs text-gray-400 text-right">
                    {new Date(reply.timestamp.$date).toLocaleDateString()} {/* Change this as needed to match the actual field name */}
                  </div>
                </div>
              </div>
            </div>

              
            ))
          )}
        </div>
        </>
            ):(
              <p>Waiting for post data...</p>  
        )}
            </div>
        </>
      );
    };

    

    export default PostModal;




