import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import { useAuthContext } from '@/Context/AuthContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs() {
  const user = useAuthContext();

  const [categories, setCategories] = useState({
    Posts: [],
    Replies: [],
    "Liked Posts": [],
  });

  useEffect(() => {
    const fetchPostsData = async () => {
      const userID = user["user"]["uid"]
      try {
        const response = await fetch(`https://www.khourychat.com/api/${userID}/posts`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Failed to fetch posts');
      }
    };

    fetchPostsData()
    .then((data) => {
      console.log('Fetched data:', data);
      setCategories((prevCategories) => ({
        ...prevCategories,
        Posts: data,
      }));
    })
    .catch((error) => {
      console.error('Error fetching posts:', error.message);
    });
  }, []);
  console.log('Categories state:', categories);

  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.keys(categories).map((category) => (
            <Tab.Panel
              key={category}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul>
                {categories[category].map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-md p-3 hover:bg-gray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">{post.title}</h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <li>{post.date}</li>
                      <li>&middot;</li>
                      <li>{post.commentCount} comments</li>
                      <li>&middot;</li>
                    </ul>

                    <a
                      href="#"
                      className={classNames(
                        'absolute inset-0 rounded-md',
                        'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                      )}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>

      </Tab.Group>
    </div>
  )
}
