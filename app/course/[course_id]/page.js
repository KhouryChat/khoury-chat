"use client";
import React, { useState, useEffect } from "react";
import Title from "@/components/Title/Title";
import PostItem from "@/components/PostItem/PostItem";
import { useAuthContext } from "@/Context/AuthContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "@/components/Sidebar/Sidebar";

// const courses = [
//   {
//     course_id: "cs5002",
//     course_title: "Discrete Structures",
//     professors: ["Githa Bagley", "Neel Patel", "Amit Shesh"],
//     posts: [
//       {
//         post_id: "9h9a0",
//         title: "Post 1",
//         user_id: "i9hg80",
//         content:
//           "fire lamp skin farmer hat plus left least can anything please silver zoo cow basic hunt earlier ride spent sets clothes spring metal human",
//         likes: 10,
//         dislikes: 20,
//         views: 45,
//         replies: [],
//         isTypeReply: false,
//         timestamp: "uu0sdi8gh0",
//       },
//       {
//         post_id: "9hdd90",
//         title: "Post 1",
//         user_id: "i9hg80",
//         content:
//           "fire lamp skin farmer hat plus left least can anything please silver zoo cow basic hunt earlier ride spent sets clothes spring metal human",
//         likes: 10,
//         dislikes: 20,
//         views: 45,
//         replies: [],
//         isTypeReply: false,
//         timestamp: "uu0sdi8gh0",
//       },
//       {
//         post_id: "9h9s0",
//         title: "Post 1",
//         user_id: "i9hg80",
//         content:
//           "fire lamp skin farmer hat plus left least can anything please silver zoo cow basic hunt earlier ride spent sets clothes spring metal human",
//         likes: 10,
//         dislikes: 20,
//         views: 45,
//         replies: [],
//         isTypeReply: false,
//         timestamp: "uu0sdi8gh0",
//       },
//     ],
//   },
//   {
//     course_id: "cs5001",
//     course_title: "Intensive Foundations of Computer Science",
//     professors: ["Keith Bagley", "Neel Patel", "Amit Shesh"],
//     posts: [
//       {
//         post_id: "9h9a0",
//         title: "Post 1",
//         user_id: "i9hg80",
//         content:
//           "fire lamp skin farmer hat plus left least can anything please silver zoo cow basic hunt earlier ride spent sets clothes spring metal human",
//         likes: 10,
//         dislikes: 20,
//         views: 45,
//         replies: [],
//         isTypeReply: false,
//         timestamp: "uu0sdi8gh0",
//       },
//       {
//         post_id: "9hdd90",
//         title: "Post 1",
//         user_id: "i9hg80",
//         content:
//           "fire lamp skin farmer hat plus left least can anything please silver zoo cow basic hunt earlier ride spent sets clothes spring metal human",
//         likes: 10,
//         dislikes: 20,
//         views: 45,
//         replies: [],
//         isTypeReply: false,
//         timestamp: "uu0sdi8gh0",
//       },
//       {
//         post_id: "9h9s0",
//         title: "Post 1",
//         user_id: "i9hg80",
//         content:
//           "fire lamp skin farmer hat plus left least can anything please silver zoo cow basic hunt earlier ride spent sets clothes spring metal human",
//         likes: 10,
//         dislikes: 20,
//         views: 45,
//         replies: [],
//         isTypeReply: false,
//         timestamp: "uu0sdi8gh0",
//       },
//     ],
//   },
// ];


const CoursePage = ({ params }) => {
  
  //let courseData = null;
  const [courseData, setCourseData] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
  let fetchedCourses = async() => {
    try {
      const response = await fetch("https://www.khourychat.com/api/courses");
      const courses = await response.json();
      const foundCourse = courses.find(
        (course) => course.course_id === params.course_id
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

  fetchedCourses();
  }, [params.course_id]);


  // let courses = fetchedCourses();

  // for (let i = 0; i < courses.length; i++) {
  //   if (courses[i]["course_id"] == params.course_id) {
  //     courseData = courses[i];
  //   }
  // }

  const [value, setValue] = useState("");

  const user = useAuthContext();
  const isLoggedIn = user !== null;

  if (!courseData) {
    return <div>Course Not Found!</div>;
  }
  const addPost = (e) => {
    if (isLoggedIn || !isLoggedIn) {
      const newPost = {
        post_id: "aa11",
        user_id: user["user"]["uid"],
        content: value.slice(3, value.length - 4),
        likes: 0,
        dislikes: 0,
        views: 1,
        replies: [],
        isTypeReply: false,
        timestamp: "" + Math.floor(Date.now() / 1000),
      };
  
      setPosts([...posts, newPost]);
    } else {

    }

  };


  return (
    <div className="bg-white ">
      <div className="bg-black text-white shadow-xl">
        <Title
          text={params.course_id}
          courseName={courseData["course_title"]}
        />
      </div>
      <div className="flex flex-row items-center justify-between ">
        <Sidebar professors={[]} />

        <div>
          <div id="create-post" className="p-10 flex flex-col gap-5 items-end">
            <ReactQuill
              className="bg-white"
              theme="snow"
              value={value}
              onChange={setValue}
            />
            <button
              onClick={addPost}
              className="py-1 px-5 rounded-full bg-red-500 font-bold text-lg text-white"
            >
              Post
            </button>
          </div>
          <div>
            {posts.map((post) => (
              <PostItem
                key={post.post_id}
                title={post.title}
                content={post.content}
                likes={post.likes}
                views={post.views}
              />
            ))}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CoursePage;
