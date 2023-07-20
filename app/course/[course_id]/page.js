"use client";
import React, { useState, useEffect, useCallback } from "react";
import Title from "@/components/Title/Title";
import PostItem from "@/components/PostItem/PostItem";
import Pagination from "@/components/Pagination/Pagination"; 
import { useAuthContext } from "@/Context/AuthContext";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useRouter } from "next/navigation";
const CoursePage = ({ params }) => {
  const router = useRouter();
  const [courseData, setCourseData] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getCourseInfo = async () => {
      try {
        const response = await fetch("https://www.khourychat.com/api/courses");
        const courses = await response.json();
        //console.log(courses);
        const foundCourse = courses.find(
          (course) =>
            course.course_id.toLowerCase() === params.course_id.toLowerCase()
        );
        if (foundCourse) {
          setCourseData(foundCourse);
          setPosts(foundCourse.posts);
          console.log(foundCourse);
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

  const addPost = (e) => {
    e.preventDefault();
    console.log("addPost called");
    if (isLoggedIn) {
      const newPost = {
        //post_id: "aa11",
        uid: user["user"]["uid"],
        course_id: courseData.course_id,
        content: value,
        post_title: "",
        likes: 0,
        dislikes: 0,
        views: 1,
        replies: [],
        //timestamp: "" + Math.floor(Date.now() / 1000),
      };

      const postUrl = `https://www.khourychat.com/api/courses/${courseData.course_id}`;
      fetch(postUrl, {
        method: "POST",
        body: JSON.stringify(newPost),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setPosts([...posts, data.post_id]);
          console.log("Post ID:", data.post_id);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      //setPosts([...posts, newPost]);
    } else {
      router.push("/login");
    }
  };
  console.log("coursedata:", courseData);

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

  // useEffect(() => {
  //   async function fetchPosts() {
  //     const fetchedPosts = [];

  //     for (let post_id of posts) {
  //       const response = await fetch(
  //         `https://www.khourychat.com/api/posts/${post_id}`
  //       );
  //       const postData = await response.json();
  //       fetchedPosts.push(postData);
  //     }
  //     setPostItems(fetchedPosts);
  //   }
  //   fetchPosts();
  // }, [posts]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(
        `https://www.khourychat.com/api/courses/${params.course_id}/posts`
      );
      //const response = await fetch(`https://www.khourychat.com/api/courses/CS5001/posts`);
      const postsData = await response.json();
      console.log("postsData: ", postsData);
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



  const updateLikes =  async (newLikedState, post_id) => {
    if (!isLoggedIn) router.push("/login");

    try{
      const response = await fetch(
        `https://www.khourychat.com/api/posts/${post_id}/like`,
        {
          method: "PATCH",
          headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
             "Access-Control-Allow-Origin": "*",
           'Content-Type': 'application/json',
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
       },
          
          body: JSON.stringify({
            action: newLikedState
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const updatedPost = await response.json();
  
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
      const response = await fetch(
        `https://www.khourychat.com/api/posts/${post_id}/dislike`, // change this to match your dislike API endpoint
        {
          method: "PATCH",
          body: JSON.stringify({
            action: newDislikedState
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const updatedPost = await response.json();
  
      const updatedPosts = postItems.map((post) =>
        post.post_id === post_id ? updatedPost : post
      );
  
      setPostItems(updatedPosts);
    } catch (error) {
      console.error("Failed to update dislikes", error);
    }
  };
  
  


  



  // const updateLikes = async (newLikedState, post_id) => {
  //   if (!isLoggedIn) router.push("/login");
  //   // Update the post in the local state
  //   const updatedLikes = newLikedState
  //     ? postItems.find((post) => post.post_id === post_id).likes + 1
  //     : postItems.find((post) => post.post_id === post_id).likes - 1;

  //   // const updatedPosts = postItems.map(post =>
  //   //   post.post_id === post_id
  //   //     ? { ...post, likes: newLikedState? post.likes + 1 : post.likes -1 }
  //   //     : post
  //   // );

  //   try {
  //     const response = await fetch(
  //       `https://www.khourychat.com/api/posts/${post_id}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           likes: updatedLikes,
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     //get the updated post data from the response
  //     const updatedPost = await response.json();

  //     //update the post in the local state
  //     const updatedPosts = postItems.map((post) =>
  //       post.post_id === post_id ? updatedPost : post
  //     );

  //     setPostItems(updatedPosts);
  //   } catch (error) {
  //     console.error("Failed to update likes", error);
  //   }
  // };



  // const goToPostPage = (id) => {
  //   router.push(`/post/${id}`);
  // };

  const goToPostPage = async (id) => {
    try{
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

    router.push(`/post/${id}`);
  };



  // const updateDislikes = async (newDislikedState, post_id) => {
  //   if (!isLoggedIn) router.push("/login");

  //   // Update the post in the local state

  //   const updatedPosts = postItems.map((post) =>
  //     post.post_id === post_id
  //       ? {
  //           ...post,
  //           dislikes: newDislikedState ? post.dislikes + 1 : post.dislikes - 1,
  //         }
  //       : post
  //   );

  //   try {
  //     const response = await fetch(
  //       `https://www.khourychat.com/api/posts/${post_id}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           dislikes: updatedPosts.find((post) => post.post_id === post_id)
  //             .dislikes,
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     setPostItems(updatedPosts);
  //   } catch (error) {
  //     console.error("Failed to update dislikes", error);
  //   }
  // };


  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  console.log("post_ids: ", posts);
  console.log("postItems: ", postItems);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postItems.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(postItems.length / postsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="bg-white ">
      <div className="bg-black text-white shadow-xl">
        <Title
          text={courseData ? courseData["course_id"] : ""}
          courseName={courseData ? courseData["course_title"] : ""}
        />
      </div>
      <div className="flex flex-row justify-between ">
        <Sidebar professors={courseData ? courseData["professor"] : []} />

        <div>
          {courseData && (
            <div
              id="create-post"
              className="p-10 flex flex-col gap-5 items-end"
            >
              {/* <textarea
                className="bg-blackfont-bold text-lg px-[250px] py-4 rounded-lg border-none focus:outline-none"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter post content..."
              /> */}
              <ReactQuill
                className="bg-gray-300 text-3xl py-6  shadow-xl"
                theme="snow"
                value={value}
                onChange={setValue}
                modules={{ toolbar: false }}
              />
              <button
                onClick={addPost}
                className="py-1 px-5 rounded-full bg-red-500 font-bold text-lg text-white"
              >
                Post
              </button>
            </div>
          )}
          {posts.length > 0 && (
            <div>
              {currentPosts.map((post) => (
                <PostItem
                  key={post.post_id}
                  id={post.post_id}
                  title={post.title}
                  content={post.content}
                  likes={post.likes}
                  dislikes={post.dislikes}
                  views={post.views}
                  likeClickHandler={updateLikes}
                  dislikeClickHandler={updateDislikes}
                  onClick={() => goToPostPage(post.post_id)}
                />
              ))}
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CoursePage;
