"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/Context/AuthContext";
import Husky from "@/components/Husky/Husky";
import DownArrowIcon from "@/Icons/DownArrowIcon";
import SearchBar from "@/components/SearchBar/SearchBar";
import HorizontalLine from "@/components/HLine/Hline";
import Image from "next/image";
import PostItem from "@/components/PostItem/PostItem";
import Tilt from "react-parallax-tilt";
import BackToTop from "@/components/BackToTop/BackToTop";
import Typewriter from "typewriter-effect";
import PostCarousel from "@/components/PostCarousel/PostCarousel";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import TeamMember from "@/components/TeamMember/TeamMember";
import Marquee from "react-fast-marquee";

const memberChase = {
  name: "Chase Coogan",
  content:
    "I am a passionate and driven Computer Science major, equipped with a strong foundation in programming and problem-solving. Throughout my academic journey, I have honed my skills in various technologies and frameworks, including Next.js, React, Firebase, and MongoDB. Leveraging this expertise.",
  github: "https://github.com/cwcoogan",
  linkedin: "https://www.linkedin.com/in/chasecoogan/",
  image: "/chase.png",
};
const memberZhen = {
  name: "Zhen Wang",
  content:
    "As a dedicated and ambitious Computer Science major, I have immersed myself in the world of web development with a focus on creating seamless user experiences. Proficient in Next.js, React, Firebase Auth, MongoDB, and more, I have successfully crafted responsive and feature-rich websites.",
  github: "https://github.com/IvyWang152",
  linkedin: "https://www.linkedin.com/in/zhen-wang-09a54926a/",
  image: "/zhen.png",
};
const memberNeel = {
  name: "Neel Patel",
  content:
    "Hi there! I am a passionate CS major, enthusiastic about transforming ideas into reality through web development. My journey has been an incredible learning experience, equipping me with expertise in Next.js, React, Firebase Auth, MongoDB, and Vercel deployment. ",
  github: "https://github.com/neelthepatel8",
  linkedin: "https://www.linkedin.com/in/neelthepatel/",
  image: "/neel.png",
};
function Home() {
  const router = useRouter();
  const user = useAuthContext();
  const scrollRef = useRef(null);
  const vantaRef = useRef(null);
  const containerRef = useRef(null);

  const [searchValue, setSearchValue] = useState("Search courses...");
  const [courses, setCourses] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [show, setShow] = useState(false);
  const [vantaEffect, setVantaEffect] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShow(false);
        setFilteredCourses([]);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`https://www.khourychat.com/api/courses`);
        const data = await response.json();
        setCourses(data);
        console.log(data);
      } catch (error) {
        console.log("error fetching courses", error);
      }
    };

    fetchCourses();
  }, [router]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await fetch(
          "https://www.khourychat.com/api/posts/latest"
        );
        const data = await response.json();
        setTrendingPosts(data);
      } catch (error) {
        console.log("Error fetching latest posts:", error);
      }
    };
    fetchLatestPosts();
  }, [user]);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xffffff,
          backgroundColor: 0xdb192a,
          points: 9.0,
          maxDistance: 25.0,
          spacing: 17.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    const filteredCourses = courses.filter(
      (course) =>
        course.course_title.toLowerCase().includes(value.toLowerCase()) ||
        course.course_id.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCourses(filteredCourses);
    setShow(!show);
  };

  const handleSelect = (option) => {
    router.push(`/course/${option.course_id}`);
  };

  return (
    <div className="flex flex-col h-max w-screen red-body">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div className="flex flex-col items-start justify-center h-screen gap-16 p-20">
            <div className="max-w-2xl khoury-title text-white text-[10rem] font-extrabold leading-[9rem]">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter.typeString("KHOURY\nCHAT").pauseFor(1000).start();
                }}
              />
            </div>
            <div className="flex flex-col w-2/3 ml-3">
              <h2 className="text-white text-3xl mb-4">
                What course are you looking for?
              </h2>
              <input
                type="text"
                placeholder=""
                className="focus:outline-none w-[56%] text-white outline-none  bg-transparent border-b-solid border-b border-b-white  p-2 text-xl"
                onClick={() => setSearchValue("")}
                value={searchValue}
                onChange={handleSearch}
              />
              {filteredCourses.length > 0 && searchValue && (
                <div
                  ref={containerRef}
                  className="absolute overflow-y-auto mt-24 w-1/3 max-h-80 bg-white shadow-2xl scrollbar"
                >
                  {filteredCourses.map((course) => (
                    <div
                      key={course._id}
                      className="p-2 text-lg bg-blue-100 font-bold cursor-pointer hover:bg-yellow-200"
                      onClick={() => handleSelect(course)}
                    >
                      {`${course.course_id}: ${course.course_title}`}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-10 w-screen h-screen items-center justify-center">
            <div
              ref={scrollRef}
              className="text-white text-6xl font-bold flex  pt-32"
            >
              Trending Posts
            </div>
            <div style={{ zIndex: 40 }}>
              <PostCarousel posts={trendingPosts} />
            </div>
          </div>
          <div
            ref={vantaRef}
            id="about"
            className="text-black h-screen red-body flex items-center justify-end w-screen"
          >
            <div className="w-[80%] h-[80%] bg-white flex flex-col justify-start items-start gap-4 p-10">
              <div className="text-9xl font-extrabold px-5">ABOUT</div>
              <div className="text-2xl leading-9 border-b p-5">
                Immediately hunt noise knife having represent gulf therefore
                teach dollar independent doubt herself many including has
                package cry thank label particles firm build slight public
                doctor supper shut music die path appropriate recognize dawn new
                grabbed individual wash corner race took condition height
                official tobacco twelve why excited Immediately hunt noise knife
                having represent gulf therefore teach dollar independent doubt
                herself many including has package cry thank label particles
                firm build slight public doctor supper shut music die path
                appropriate recognize dawn new grabbed individual wash corner
                race took condition height official tobacco twelve why excited
              </div>
              <Marquee>
                <div className="flex flex-row items-center justify-center gap-5  px-20">
                  <Image
                    src="/nextjs.png"
                    alt="NextJS"
                    width={150}
                    height={150}
                  />
                  <Image
                    src="/firebase.png"
                    alt="Firebase"
                    width={120}
                    height={120}
                  />
                  <Image src="/react.png" alt="React" width={90} height={90} />
                  <Image
                    src="/mongo.png"
                    alt="MongoDB"
                    width={130}
                    height={130}
                  />
                  <Image src="/flask.png" alt="Flask" width={90} height={90} />
                  <Image
                    src="/threejs.png"
                    alt="ThreeJS"
                    width={90}
                    height={90}
                  />
                  <Image src="/d3.png" alt="ThreeJS" width={80} height={80} />
                  <Image
                    src="/tailwind.png"
                    alt="TailwindCSS"
                    width={90}
                    height={90}
                  />
                  <Image
                    src="/vercel.png"
                    alt="Vercel"
                    width={120}
                    height={120}
                  />
                </div>
              </Marquee>
            </div>
          </div>
          <div
            id="team"
            className="text-black h-screen red-body flex flex-col items-center w-screen"
          >
            <div className="relative text-white font-extrabold text-[9rem] drop-shadow-2xl ">
              OUR TEAM
            </div>
            <div className="flex flex-row gap-16">
              <TeamMember member={memberChase} />
              <TeamMember member={memberZhen} />
              <TeamMember member={memberNeel} />
            </div>
          </div>
        </div>
        <div className="flex flex-row absolute left-[550px] -top-96">
          <Tilt perspective={6000}>
            <Husky className="husky" />
          </Tilt>
        </div>

        <div
          onClick={handleScroll}
          className="text-md z-10 cursor-pointer absolute bottom-6 right-1/2 flex flex-col  items-center text-white"
        >
          <div className="hover:text-blue-500">Explore</div>
          <button className="transition-transform duration-300 ease-in-out hover:translate-y-3">
            <DownArrowIcon
              className="w-12 h-12"
              color={"white"}
              width={100}
              height={100}
            />
          </button>
        </div>
        <BackToTop />
      </div>
    </div>
  );
}
export default Home;
