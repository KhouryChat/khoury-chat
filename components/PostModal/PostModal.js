import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuthContext } from "@/Context/AuthContext";
import CourseTag from "@/components/CourseTag/CourseTag";
import HeartIcon from "@/Icons/HeartIcon";
import BrokenHeartIcon from "@/Icons/BrokenHeartIcon";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRouter } from 'next/navigation';
import fetchUserName from "@/handler/fetchUsername";


const fetchPost = async (postID) => {
    const response = await fetch(`https://www.khourychat.com/api/posts/${postID}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  

const fetchReply = async (replyID) => {
    const response = await fetch(`https://www.khourychat.com/api/posts/${replyID}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };





const PostModal = ({ postID, onClose}) => {
    const router = useRouter();
    const user = useAuthContext();
    //const [post, setPost] = useState(null);
    const [newComment, setNewComment] = useState("");


    const { data: post, isLoading, isError } = useQuery(["post", postID], () => fetchPost(postID));

    const { data: postUser, isLoading: isUserLoading, isError: isUserError } =
    useQuery(["user", post?.uid], () => fetchUserName(post?.uid), {
      enabled: !!post?.uid, // Enable the query only when post?.uid is truthy (not null or undefined)
    });

    const repliesQuery = useQuery(
        ["replies", post?.replies],
        () => Promise.all(post.replies.map((replyID) => fetchReply(replyID))),
        {
          enabled: !!post?.replies.length, // Only run this query if there are replies
        }
      );



    // useEffect(() => {
    //     const fetchPost = async () => {
    //       try {
    //         const response = await fetch(
    //           `https://www.khourychat.com/api/posts/${postID}`
    //         );
    //         const data = await response.json();
    //         setPost(data);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     };
    //     fetchPost();
    //   }, [postID]);


      const getPlainText = (htmlContent) => {
        const strippedContent = htmlContent.replace(/^<p>/i, "").replace(/<\/p>$/i, "");
        return strippedContent;
      };

      const queryClient = useQueryClient();

      const addCommentMutation = useMutation(

         async (newComment) => {
        if (!user) router.push("/login");

        const comment = {
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

        }

        

            const response = await fetch(`http://127.0.0.1:5000/api/posts/${postID}/comments`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
         body: JSON.stringify(comment)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not post the comment");
      }

      return data;

      },
      {
        onSuccess: () => {
          // When the mutation succeeds, invalidate the replies query so that it will refetch the data
          queryClient.invalidateQueries(["replies", post?.replies]);
      }

      });


   
    const [replyUsers, setReplyUsers] = useState([]);





  useEffect(() => {
    // Fetch usernames for each reply
    if (repliesQuery.data && repliesQuery.data.length > 0) {
      Promise.all(
        repliesQuery.data.map((reply) => fetchUserName(reply.uid))
      )
        .then((usernameObjs) => setReplyUsers(usernameObjs))
        .catch((error) => {
          console.error("Error fetching reply users' usernames:", error);
          setReplyUsers(new Array(repliesQuery.data.length).fill({[reply.uid]: "Anonymous mouse",
        })); // Set fallback usernames for replies in case of an error
        });
    }
  }, [repliesQuery.data]);








    

      return (
        <>
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50"></div>
            <div className="fixed inset-0 z-20 overflow-y-auto w-full bg-white h-full text-gray-700">
          <button onClick={onClose} className="m-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Close</button>
          <div className="w-full bg-white sticky top-0 z-30 p-3 flex justify-between items-center ml-8">
        {/* <div>{post?.user_name}</div> */}
        <div>{isUserLoading ? "Loading..." : isUserError ? "Anonymous mouse" : postUser && postUser[post?.uid]}</div>
      </div>

          {isLoading ? (
            <p>Loading...</p>
            ) : isError ? (
            <p>Error occurred while loading the post.</p>
            ) : (
            <>
          <div className="flex flex-col justify-between items-center w-full px-5 py-3">
          <div className="flex flex-col justify-between items-center w-full">
            <div className="text-xl font-bold mr-46">{post.post_title}</div>
          </div>
          <div className="p-5 text-justify text-xl border border-gray-300 rounded-md shadow-md bg-white w-full max-w-2xl my-5">
            {getPlainText(post.content)}
          </div>
          <div className="w-full max-w-2xl text-right text-sm text-gray-500">
            {new Date(post.timestamp.$date).toLocaleDateString()}
        </div>
          </div>
          {user && (
            <form onSubmit={(e) => {
              e.preventDefault();
              addCommentMutation.mutate(newComment);
              setNewComment('');
          }} className="w-full p-5 flex flex-col items-center">
              <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Write your comment here..."
                className="w-full max-w-2xl h-32 p-2 bg-gray-200 rounded-md"
              />
              <div className="w-full max-w-2xl text-right p-2">
              <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded-md" disabled={!newComment.trim()}>Add
              </button>
              </div>
            </form>
          )}
        <div className="replies-section p-5 overflow-y-auto flex flex-col items-center">
          {repliesQuery.isLoading ? (
            <p>Loading replies...</p>
          ) : repliesQuery.isError ? (
            <p>Error occurred while loading the replies.</p>
          ) : (
            repliesQuery?.data?.map((reply, index) => (
              <div key={index} className="reply bg-white p-5 my-2 border-b border-gray-300 w-full max-w-2xl self-center">
                <div className="flex justify-between">
                <div>{reply.content}</div>
              <div>
              <div className="text-xs text-gray-400">{replyUsers[index] && replyUsers[index][reply.uid]}</div> {/* Change this as needed to match the actual field name */}
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
        )}
            </div>
        </>
      );
    };
    

    export default PostModal;




