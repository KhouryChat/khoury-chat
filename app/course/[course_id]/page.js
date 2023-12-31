"use client";
import React, { useState, useEffect } from "react";
import Title from "@/components/Title/Title";
import PostItem from "@/components/PostItem/PostItem";
import Pagination from "@/components/Pagination/Pagination";
import { useAuthContext } from "@/Context/AuthContext";
import Sidebar from "@/components/Sidebar/Sidebar";
import AddPost from "@/components/PostCreation/PostCreation";
import { useRouter } from "next/navigation";
import PostModal from "@/components/PostModal/PostModal";
import { QueryClient, QueryClientProvider } from "react-query";
import fetchUserName from "@/handler/fetchUsername";
import likesHandler from "@/handler/likesHandler";
import dislikesHandler from "@/handler/dislikesHandler";
import fetchPostAfterReplies from "@/handler/fetchReplies";

const CoursePage = ({ params }) => {
  const router = useRouter();
  const [courseData, setCourseData] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getCourseInfo = async () => {
      try {
        const response = await fetch("https://www.khourychat.com/api/courses");
        const courses = await response.json();
        const foundCourse = courses.find(
          (course) =>
            course.course_id.toLowerCase() === params.course_id.toLowerCase()
        );
        if (foundCourse) {
          setCourseData(foundCourse);
          setPosts(foundCourse.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCourseInfo();
  }, [params.course_id]);

  const [value, setValue] = useState("");
  const [quillValue, setQuillActualValue] = useState("");

  const user = useAuthContext();
  const isLoggedIn = user["user"] !== null;

  const addPost = (title, content) => {
    //e.preventDefault();
    if (isLoggedIn) {
      const newPost = {
        //post_id: "aa11",
        uid: user["user"]["uid"],
        course_id: courseData.course_id,
        content: content,
        post_title: title,
        likes: 0,
        dislikes: 0,
        views: 1,
        replies: [],
      };

      const postUrl = `https://www.khourychat.com/api/courses/${courseData.course_id}`;
      fetch(postUrl, {
        method: "POST",
        body: JSON.stringify(newPost),
      })
        .then((response) => response.json())
        .then((data) => {
          setPosts([...posts, data.post_id]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      //setPosts([...posts, newPost]);
    } else {
      router.push("/login");
    }
  };

  const getPlainText = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };
  const setQuillValue = (content) => {
    setValue(content);
    const plainText = getPlainText(content);
    setQuillActualValue(plainText);
  };
  const [postItems, setPostItems] = useState([]);

  const [usernames, setUsernames] = useState({});

  const fetchUsernames = async () => {
    const usernamesObj = {};
    const uidArray = postItems.map((post) => post.uid);
    for (const uid of uidArray) {
      try {
        const username = await fetchUserName(uid);
        usernamesObj[uid] = username[uid];
      } catch (error) {
        // If there's an error fetching the username, set it as "Anonymous mouse"
        usernamesObj[uid] = "Anonymous mouse";
      }
    }
    setUsernames(usernamesObj);
  };

  useEffect(() => {
    if (postItems.length > 0) {
      fetchUsernames();
    }
  }, [postItems]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(
        `https://www.khourychat.com/api/courses/${params.course_id}/posts`
      );
      const postsData = await response.json();
      const postPromises = postsData.map(async (post_id) => {
        try {
          const postResponse = await fetch(
            `https://www.khourychat.com/api/posts/${post_id}`
          );

          if (!postResponse.ok) {
            return null; // return null for any posts that could not be fetched
          }

          return postResponse.json();
        } catch (error) {
          return null; // return null for any posts that encounter an error
        }
      });

      Promise.all(postPromises)
        .then((fetchedPosts) => {
          const validPosts = fetchedPosts.filter((post) => post !== null); // remove any null posts
          setPostItems(validPosts);
        })
        .catch((error) => console.error("Error fetching posts:", error));
    }
    fetchPosts();
  }, [posts, params.course_id]);

  const updateLikes = async (newLikedState, post_id) => {
    if (!isLoggedIn) router.push("/login");

    try {
      const updatedPost = await likesHandler(newLikedState, post_id);

      const updatedPosts = postItems.map((post) =>
        post.post_id === post_id ? updatedPost : post
      );

      setPostItems(updatedPosts);
    } catch (error) {
      console.error("Failed to update likes", error);
    }
  };

  const updateDislikes = async (newDislikedState, post_id) => {
    if (!isLoggedIn) router.push("/login");

    try {
      const updatedPost = await dislikesHandler(newDislikedState, post_id);

      const updatedPosts = postItems.map((post) =>
        post.post_id === post_id ? updatedPost : post
      );

      setPostItems(updatedPosts);
    } catch (error) {
      console.error("Failed to update dislikes", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const goToPostPage = async (id) => {
    try {
      const response = await fetch(
        `https://www.khourychat.com/api/posts/${id}/view`, // change this to match your view API endpoint
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedPost = await response.json();

      const updatedPosts = postItems.map((post) =>
        post.post_id === id ? updatedPost : post
      );

      setPostItems(updatedPosts);
    } catch (error) {
      console.log("Failed to update views", error);
    }

    //router.push(`/post/${id}`);
    const openModal = (postId) => {
      setIsModalOpen(true);
      setSelectedPostId(postId);
    };

    openModal(id);
  };

  const closeModal = async () => {
    setIsModalOpen(false);
    // let updatedPost1 = null;
    // if (selectedPostId != null) {
    //   updatedPost1 = await fetchPostAfterReplies(selectedPostId);
    //   setPostItems(prevPosts =>
    //     prevPosts.map(post => post.post_id === selectedPostId ? updatedPost1 : post)
    //   );
    // }

    setSelectedPostId(null);
  };

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postItems.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(postItems.length / postsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const queryClient = new QueryClient();
  return (
    <div className="bg-white flex">
      {/* <div className="w-full flex flex-row justify-between items-start">
        <Sidebar professors={courseData ? courseData["professor"] : []} /> */}
      <div className="w-full">
        <div
          className="bg-white text-black shadow-xl flex flex-row items-center justify-between px-8"
          style={{ zIndex: -100 }}
        >
          <Sidebar professors={courseData ? courseData["professor"] : []} />
          <Title
            text={courseData ? courseData["course_id"] : ""}
            courseName={courseData ? courseData["course_title"] : ""}
          />

          {courseData && (
            <div className="justify-self-end pt-10">
              <AddPost onPost={addPost} />
            </div>
          )}
        </div>

        {/* <div className="w-full flex flex-row justify-between items-start">
        <Sidebar professors={courseData ? courseData["professor"] : []} /> */}

        <div className="">
          {courseData && (
            <div
              id="create-post"
              className="p-10 flex flex-col gap-5 items-end"
            ></div>
          )}
          {postItems.length <= 0 && (
            <div className="flex items-center justify-center w-full h-full p-20 text-center font-bold italic text-3xl text-gray-500">
              No posts yet! Be the first to post something!
            </div>
          )}
          {posts.length > 0 && (
            <div className="mx-auto max-w-2xl z-10">
              {currentPosts.map((post) => (
                <PostItem
                  key={post.post_id}
                  id={post.post_id}
                  title={post.post_title ? post.post_title : undefined}
                  content={post.content}
                  likes={post.likes}
                  dislikes={post.dislikes}
                  views={post.views}
                  replyCount={post.replies?.length}
                  likeClickHandler={updateLikes}
                  dislikeClickHandler={updateDislikes}
                  userName={usernames[post.uid]}
                  timestamp={post.timestamp}
                  onClick={() => goToPostPage(post.post_id)}
                  //onClick={() => openModal(post.post_id)}
                />
              ))}
              {isModalOpen && (
                <QueryClientProvider client={queryClient}>
                  <PostModal postID={selectedPostId} onClose={closeModal} />
                </QueryClientProvider>
              )}

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
    // </div>
  );
};

export default CoursePage;
