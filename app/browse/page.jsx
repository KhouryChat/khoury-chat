"use client";
import React from "react";
import PageTransition from "@/components/PageTransition/PageTransition";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ButtonBox from "@/components/ButtonBox/ButtonBox";
import CourseCatalogue from "@/components/CourseCatalogue/CourseCatalogue";
import BackToTop from "@/components/BackToTop/BackToTop";

const Page = () => {
  const router = useRouter();

  const [courses, setCourses] = useState([]);
  const [coursesCS, setCoursesCS] = useState([]);
  const [coursesDS, setCoursesDS] = useState([]);
  const [coursesCY, setCoursesCY] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`https://www.khourychat.com/api/courses`);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.log("error fetching courses", error);
      }
    };

    fetchCourses();
  }, [router]);

  useEffect(() => {
    if (
      coursesCS.length == 0 ||
      coursesDS.length == 0 ||
      coursesCY.length == 0
    ) {
      const cs = [];
      const ds = [];
      const cy = [];
      courses.forEach((course) => {
        if (course.course_id.includes("CS") && !cs.includes(course)) {
          cs.push(course);
        } else if (course.course_id.includes("DS") && !ds.includes(course)) {
          ds.push(course);
        } else if (course.course_id.includes("CY") && !cy.includes(course)) {
          cy.push(course);
        }
        setCoursesCS(cs);
        setCoursesDS(ds);
        setCoursesCY(cy);
      });
    }
  }, [courses]);

  const handleScrollCS = () => {
    const csElement = document.getElementById("cs");
    if (csElement) {
      csElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleScrollDS = () => {
    const dsElement = document.getElementById("ds");
    if (dsElement) {
      dsElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleScrollCY = () => {
    const cyElement = document.getElementById("cy");
    if (cyElement) {
      cyElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-evenly h-screen w-screen p-20">
        <div className="text-8xl font-bold">Select Major</div>
        <div className="flex flex-row gap-16 items-center justify-center w-2/3 h-1/3">
          <ButtonBox
            text={"Computer Science"}
            onClick={handleScrollCS}
            className="red-body"
          />
          <ButtonBox
            text={"Data Science"}
            onClick={handleScrollDS}
            className="bg-green-400"
          />
          <ButtonBox
            text={"Cybersecurity"}
            onClick={handleScrollCY}
            className="bg-blue-400"
          />
        </div>
      </div>

      <CourseCatalogue
        text={"Computer Science"}
        id="cs"
        className="red-body"
        courses={coursesCS}
      />
      <CourseCatalogue
        text={"Data Science"}
        id="ds"
        className="bg-green-400"
        courses={coursesDS}
      />
      <CourseCatalogue
        text={"Cybersecurity"}
        id="cy"
        className="bg-blue-400"
        courses={coursesCY}
      />
      <BackToTop />
    </div>
  );
};

export default Page;
