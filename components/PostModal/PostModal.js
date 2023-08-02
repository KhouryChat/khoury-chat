import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuthContext } from "@/Context/AuthContext";
import { InfinitySpin } from "react-loader-spinner";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import fetchUserName from "@/handler/fetchUsername";
import ReplyItem from "../PostItem/ReplyItem";
import likesHandler from "@/handler/likesHandler";
import dislikesHandler from "@/handler/dislikesHandler";

const PostModal = ({ postID, onClose }) => {
  const router = useRouter();
  const user = useAuthContext();
  const isLoggedIn = user["user"] !== null;
  const [post, setPost] = useState(null);
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [replies, setReplies] = useState([]);
  const [repliesLoading, setRepliesLoading] = useState(false);
  const [repliesError, setRepliesError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setPostLoading(true);
      setPostError(null);
      try {
        const response = await fetch(
          `https://www.khourychat.com/api/posts/${postID}`
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        setPostError(error.message);
      } finally {
        setPostLoading(false);
      }
    };
    fetchPost();
  }, [postID]);

  useEffect(() => {
    const fetchReplies = async () => {
      if (post?.replies?.length > 0) {
        setRepliesLoading(true);
        setRepliesError(null);
      }
      try {
        const data = await Promise.all(
          post.replies.map((replyID) =>
            fetch(`https://www.khourychat.com/api/posts/${replyID}`).then(
              (response) => response.json()
            )
          )
        );

        const repliesWithUsernames = await Promise.all(
          data.map(async (reply) => {
            const username = await fetchUserName(reply.uid);
            return { ...reply, username: username || "Anonymous mouse" };
          })
        );
        setReplies(repliesWithUsernames);
      } catch (error) {
        setRepliesError(error.message);
      } finally {
        setRepliesLoading(false);
      }
    };

    if (post) {
      fetchReplies();
    }
  }, [post]);

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

  const addComment = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (user && user["user"]) {
      const comment = buildComment();
      setAddCommentLoading(true);
      setAddCommentError(null);

      try {
        const response = await fetch(
          `https://www.khourychat.com/api/posts/${postID}/comments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
          }
        );

        const data = await response.json(); //data is comment obj

        if (!response.ok) {
          throw new Error(data.message || "Could not post the comment");
        }

        // Fetch the username
        const username = await fetchUserName(user["user"]["uid"]);

        // Add the username to the comment data
        const commentWithUsername = {
          ...data,
          username: username || "Anonymous mouse",
        };
        setReplies((prevReplies) => [...prevReplies, commentWithUsername]);
        //setPost((prev) => ({...prev,replies:[...prev.replies,data]}));
        setNewComment("");
        //updateNumReplies(postID,replies.length);
      } catch (error) {
        setAddCommentError(error.message);
      } finally {
        setAddCommentLoading(false);
      }
    }
  };

  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (user && user["user"] && user["user"]["uid"]) {
      fetchUserName(user["user"]["uid"])
        .then(setUsername)
        .catch((err) => {
          // Here you can handle the error in any way you see fit
          console.error(err);
        });
    }
  }, [user]);

  const updateLikes = async (newLikedState, post_id) => {
    if (!isLoggedIn) router.push("/login");

    try {
      const updatedReply = await likesHandler(newLikedState, post_id);

      const updatedReplies = replies.map((reply) =>
        reply.post_id === post_id
          ? {
              ...reply,
              likes: updatedReply.likes,
              dislikes: updatedReply.dislikes,
            }
          : reply
      );

      setReplies(updatedReplies);
    } catch (error) {
      console.error("Failed to update likes", error);
    }
  };

  const updateDislikes = async (newDislikedState, post_id) => {
    if (!isLoggedIn) router.push("/login");

    try {
      const updatedReply = await dislikesHandler(newDislikedState, post_id);

      const updatedReplies = replies.map((reply) =>
        reply.post_id === post_id
          ? {
              ...reply,
              likes: updatedReply.likes,
              dislikes: updatedReply.dislikes,
            }
          : reply
      );

      setReplies(updatedReplies);
    } catch (error) {
      console.error("Failed to update dislikes", error);
    }
  };

  return (
    <>
      {/* <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50"></div> */}
      <div
        className="fixed inset-0 overflow-y-auto w-full h-full items-center px-8 pt-5 pb-4"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        style={{ zIndex: 1000 }}
      >
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity pt-4 px-4 pb-20"
          aria-hidden="true"
        ></div>
        <span
          className="hidden lg:inline-block lg:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="flex items-center justify-center">
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all lg:my-8 lg:align-middle lg:max-w-2lg lg:w-full">
            <div className="p-4 bg-slate-700 text-white sticky top-0 z-30 px-1 flex flex-row justify-between w-full items-center">
              {/* <div>{post?.user_name}</div> */}
              <div className="ml-4 text-3xl">
                <div>{username || "Anonymous mouse"}</div>
              </div>
              <div className="mt-4">
                <button
                  onClick={onClose}
                  className="mt-0 mr-4 mb-4 ml-4 red-body hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>

            {postLoading ? (
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#DC2626"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            ) : // <p>Loading...</p>
            postError ? (
              <p>Error occurred while loading the post.</p>
            ) : post ? (
              <>
                <div className="flex flex-col justify-between items-center w-full px-5 py-3">
                  <div className="flex flex-col justify-between items-center w-full">
                    <div className="pt-4 text-3xl font-bold mr-46">
                      {post.post_title}
                    </div>
                  </div>
                  <div className="p-5 text-justify text-xl border border-gray-300 rounded-md shadow-md bg-white w-full max-w-2xl my-5">
                    {post.content}
                  </div>
                  <div className="w-full max-w-2xl text-right text-sm text-gray-500">
                    {new Date(post.timestamp.$date).toLocaleDateString()}
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    //if (!user) router.push("/login");
                    addComment();
                    setNewComment("");
                  }}
                  className="w-full p-5 flex flex-col items-center"
                >
                  {isLoggedIn && (
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write your comment here..."
                      className="w-full max-w-2xl h-32 p-2 bg-gray-200 rounded-md"
                    />
                  )}
                  <div className="w-full max-w-2xl text-right p-2">
                    <button
                      type="submit"
                      className="red-body text-white py-2 px-4 rounded-md"
                      disabled={isLoggedIn && !newComment.trim()}
                    >
                      Add
                    </button>
                  </div>
                </form>

                <div className="replies-section p-5 overflow-y-auto flex flex-col items-center">
                  {repliesLoading ? (
                    <div className="w-screen h-screen flex items-center justify-center m-auto ">
                      <InfinitySpin width="200" color="#DC2626" />
                    </div>
                  ) : // <p>Loading replies...</p>
                  repliesError ? (
                    <p>Error occurred while loading the replies.</p>
                  ) : (
                    replies?.map((reply) => (
                      <ReplyItem
                        key={reply.post_id}
                        id={reply.post_id}
                        content={reply.content}
                        likes={reply.likes}
                        dislikes={reply.dislikes}
                        likeClickHandler={updateLikes}
                        dislikeClickHandler={updateDislikes}
                        userName={reply.username}
                        timestamp={reply.timestamp}
                      />
                    ))
                  )}
                </div>
              </>
            ) : (
              <p>Waiting for post data...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostModal;
