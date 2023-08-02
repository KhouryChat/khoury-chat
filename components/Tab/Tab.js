import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { useAuthContext } from "@/Context/AuthContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
  const user = useAuthContext();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const [categories, setCategories] = useState({
    Posts: [],
    Replies: [],
    "Liked Posts": [],
  });

  useEffect(() => {
    const fetchPostsData = async () => {
      const userID = user["user"]["uid"];
      try {
        const response = await fetch(
          `https://www.khourychat.com/api/${userID}/posts`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error("Failed to fetch posts");
      }
    };

    fetchPostsData()
      .then((data) => {
        // Fetch post data for each post ID
        const fetchPostData = async (postID) => {
          try {
            const response = await fetch(
              `https://www.khourychat.com/api/posts/${postID}`
            );
            if (!response.ok) {
              throw new Error(`Failed to fetch post with ID: ${postID}`);
            }
            const postData = await response.json();
            return postData;
          } catch (error) {
            console.error(
              `Error fetching post with ID: ${postID}`,
              error.message
            );
            return null;
          }
        };

        const fetchAllPostData = async () => {
          const posts = await Promise.all(
            data.map((postID) => fetchPostData(postID))
          );
          return posts.filter((post) => post !== null);
        };

        return fetchAllPostData();
      })
      .then((postsData) => {
        setCategories((prevCategories) => ({
          ...prevCategories,
          Posts: postsData,
        }));
      })
      .catch((error) => {
        console.error("Error fetching posts:", error.message);
      });
  }, []);

  const updateCurrentPosts = () => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = categories["Posts"].slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    return currentPosts;
  };

  const paginateNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const paginatePrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    const currentPosts = updateCurrentPosts();
    setCurrentPosts(currentPosts);
  }, [currentPage, categories["Posts"]]);

  const [currentPosts, setCurrentPosts] = useState([]);

  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0 ">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 font-medium leading-5 text-red-600 font-arcade text-5xl",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Your Posts
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            key="Posts"
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            )}
          >
            <ul>
              {currentPosts.map((post) => (
                <li
                  key={post.post_id}
                  className="relative rounded-md p-3 hover:bg-gray-100"
                >
                  <a
                    href={`https://www.khourychat.com/course/${post.course_id}`}
                    className="block cursor-pointer"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {post.post_title}
                    </h3>
                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <li>{new Date(post.timestamp.$date).toLocaleString()}</li>
                      <li>&middot;</li>
                      <li>{post.likes} likes</li>
                      <li>&middot;</li>
                      <li>{post.views} views</li>
                    </ul>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4">
              <button
                onClick={paginatePrev}
                disabled={currentPage === 1}
                className={classNames(
                  "px-4 py-2 text-sm font-medium leading-5 rounded-lg",
                  "text-blue-700 bg-white",
                  "border border-blue-300",
                  "hover:text-blue-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-blue-800",
                  { "cursor-not-allowed": currentPage === 1 }
                )}
              >
                Previous Page
              </button>
              <button
                onClick={paginateNext}
                disabled={currentPosts.length < postsPerPage}
                className={classNames(
                  "px-4 py-2 text-sm font-medium leading-5 rounded-lg",
                  "text-blue-700 bg-white",
                  "border border-blue-300",
                  "hover:text-blue-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-blue-800",
                  { "cursor-not-allowed": currentPosts.length < postsPerPage }
                )}
              >
                Next Page
              </button>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
