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
    "I am a passionate and driven Computer Science major, equipped with a strong foundation in programming and problem-solving. Throughout my academic journey, I have honed my skills in various technologies and frameworks, including Next.js, React, Firebase, and MongoDB.",
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
          <div className="flex flex-col items-start justify-center h-screen gap-16 p-20 tall:py-10">
            <div className="max-w-2xl khoury-title text-white xl:text-[10rem] 2xl:text-[11rem] tall:text-[9rem] font-extrabold xl:leading-[9rem] 2xl:leading-[10rem] tall:leading-[8rem]">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter.typeString("KHOURY\nCHAT").pauseFor(1000).start();
                }}
              />
            </div>
            <div className="flex flex-col w-2/3 ml-3">
              <h2 className="text-white xl:text-3xl 2xl:text-4xl tall:text-2xl xl:mb-4 2xl:mb-8 tall:mb-4">
                What course are you looking for?
              </h2>
              <input
                type="text"
                placeholder=""
                className="focus:outline-none xl:w-[56%] 2xl:w-[64%] tall:w-[60%]  text-white outline-none  bg-transparent border-b-solid border-b border-b-white  p-2 xl:text-xl 2xl:text-2xl"
                onClick={() => setSearchValue("")}
                value={searchValue}
                onChange={handleSearch}
              />
              {filteredCourses.length > 0 && searchValue && (
                <div
                  ref={containerRef}
                  className="absolute overflow-y-auto xl:mt-24 2xl:mt-[120px] tall:mt-20 xl:w-1/3 2xl:w-[39%] tall:w-[36%] max-h-80 bg-white shadow-2xl scrollbar"
                >
                  {filteredCourses.map((course) => (
                    <div
                      key={course._id}
                      className="xl:p-2 2xl:p-3 tall:p-2  xl:text-lg 2xl:text-xl tall:text-lg bg-blue-100 font-bold cursor-pointer hover:bg-yellow-200"
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
              className="z-50 text-white xl:text-6xl 2xl:text-8xl tall:text-5xl font-bold flex  pt-32"
            >
              Trending Posts
            </div>
            <div style={{ zIndex: 40 }}>
              {trendingPosts && trendingPosts.length > 0 && (
                <PostCarousel posts={trendingPosts} />
              )}
            </div>
          </div>
          <div
            ref={vantaRef}
            id="about"
            className="text-black h-screen red-body flex items-center justify-end w-screen"
          >
            <div className="w-[80%] h-[80%] bg-white flex flex-col justify-start items-start gap-4 p-10 tall:p-5">
              <div className="xl:text-9xl 2xl:text-[10rem] tall:text-[6rem] font-extrabold px-5 ">
                ABOUT
              </div>
              <div className="xl:text-2xl 2xl:text-3xl tall:text-lg xl:leading-9 2xl:leading-[2.8rem] tall:leading-8 border-b p-5">
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
                <div className="flex flex-row items-center justify-center h-fit gap-5 xl:px-20 2xl:px-24 tall:px-20">
                  <Image
                    onClick={() => router.push("https://nextjs.org/")}
                    src="/nextjs.png"
                    alt="NextJS"
                    width={150}
                    height={150}
                    className="hover:scale-110 transition-transform duration-300 ease-in-out xl:w-[150px]  2xl:w-[180px] tall:w-[120px] h-auto cursor-pointer"
                  />
                  <Image
                    onClick={() => router.push("https://firebase.google.com/")}
                    src="/firebase.png"
                    alt="Firebase"
                    width={120}
                    height={120}
                    className="hover:scale-110 transition-transform duration-300 ease-in-out xl:w-[120px]  2xl:w-[150px]  tall:w-[100px] h-auto cursor-pointer"
                  />
                  <Image
                    onClick={() => router.push("https://react.dev/")}
                    src="/react.png"
                    alt="React"
                    width={90}
                    height={90}
                    className="hover:scale-110 transition-transform duration-300 ease-in-out xl:w-[80px]  2xl:w-[80px] tall:w-[60px] h-auto cursor-pointer"
                  />
                  <Image
                    onClick={() => router.push("https://www.mongodb.com/")}
                    src="/mongo.png"
                    alt="MongoDB"
                    width={130}
                    height={130}
                    className="hover:scale-110 transition-transform duration-300 ease-in-out xl:w-[130px]  2xl:w-[150px] tall:w-[120px] h-auto cursor-pointer"
                  />
                  <Image
                    onClick={() =>
                      router.push("https://flask.palletsprojects.com/en/2.3.x/")
                    }
                    src="/flask.png"
                    alt="Flask"
                    width={90}
                    height={90}
                    className="hover:scale-110 transition-transform duration-300 ease-in-out xl:w-[90px]  2xl:w-[120px] tall:w-[80px] h-auto cursor-pointer"
                  />
                  <Image
                    onClick={() => router.push("https://threejs.org/")}
                    src="/threejs.png"
                    alt="ThreeJS"
                    width={90}
                    height={90}
                    className="hover:scale-110 transition-transform duration-300 ease-in-out xl:w-[70px]  2xl:w-[90px] tall:w-[50px] h-auto cursor-pointer"
                  />
                  <Image
                    onClick={() => router.push("https://d3js.org/")}
                    src="/d3.png"
                    alt="D3JS"
                    width={80}
                    height={80}
                    className="hover:scale-110 transition-transform duration-300 ease-in-out xl:w-[80px]  2xl:w-[100px] tall:w-[70px] h-auto cursor-pointer"
                  />
                  <Image
                    onClick={() => router.push("https://tailwindcss.com/")}
                    src="/tailwind.png"
                    alt="TailwindCSS"
                    width={90}
                    height={90}
                    className="hover:scale-110 transition-transform duration-300 ease-in-out xl:w-[90px]  2xl:w-[110px] tall:w-[80px] h-auto cursor-pointer"
                  />
                  <Image
                    onClick={() =>
                      router.push("https://vercel.com/neelthepatel8")
                    }
                    src="/vercel.png"
                    alt="Vercel"
                    width={120}
                    height={120}
                    className="hover:scale-110 transition-transform duration-300 ease-in-out xl:w-[120px]  2xl:w-[150px] tall:w-[100px] h-auto cursor-pointer"
                  />
                </div>
              </Marquee>
            </div>
          </div>
          <div
            id="team"
            className="text-black h-screen red-body flex flex-col items-center w-screen"
          >
            <div className="relative text-white font-extrabold xl:text-[9rem] 2xl:text-[11rem] tall:text-[8rem] drop-shadow-2xl ">
              OUR TEAM
            </div>
            <div className="flex flex-row xl:gap-16 2xl:gap-20 tall:gap-14">
              <TeamMember member={memberZhen} />
              <TeamMember member={memberChase} />
              <TeamMember member={memberNeel} />
            </div>
          </div>
        </div>
        <div className="flex flex-row absolute 2xl:left-[650px] xl:left-[550px] tall:left-[500px] md:left-[450px] 2xl:-top-80 -top-96 tall:-top-[22rem] md:-top-80">
          <Tilt perspective={6000}>
            <Husky className="husky tall:w-[1600px] h-auto" />
          </Tilt>
        </div>

        <div
          onClick={handleScroll}
          className="xl:text-md 2xl:text-xl tall:text-sm z-10 cursor-pointer absolute bottom-6 tall:bottom-2 right-1/2  flex flex-col  items-center text-white"
        >
          <div className="hover:text-blue-500">Explore</div>
          <button className="transition-transform duration-300 ease-in-out hover:translate-y-3">
            <DownArrowIcon
              className="xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 tall:w-10 tall:h-10 "
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
