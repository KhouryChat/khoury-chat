import React from "react";
import Flashcards from "../AnimatedBox/AnimatedBox";
import { useRouter } from "next/navigation";
const CourseCatalogue = ({ text, className, id, courses }) => {
  const router = useRouter();
  // Sort courses by course number
  courses.sort((a, b) => a.course_id.localeCompare(b.course_id));

  const coursesByNumber = {};

  // Group courses by course number
  courses.forEach((course) => {
    const courseNumber = course.course_id.slice(2, 3);
    if (coursesByNumber[courseNumber]) {
      coursesByNumber[courseNumber].push(course);
    } else {
      coursesByNumber[courseNumber] = [course];
    }
  });
  const handleCourseSelection = (e) => {
    router.push(`/course/${e.target.innerText}`);
  };

  const classes = `h-screen text-white flex flex-col items-center justify-center p-20 gap-10 ${className}`;
  return (
    <div id={id} className={classes}>
      <span className="text-4xl">{text}</span>
      <div className="flex flex-wrap gap-2 justify-start">
        {Object.keys(coursesByNumber).map((courseNumber) => (
          <div key={courseNumber} className="flex flex-col gap-2">
            <div className="text-5xl font-bold">{courseNumber}</div>
            <div className="grid grid-cols-3 gap-1">
              {coursesByNumber[courseNumber].map((course) => (
                <div
                  onClick={handleCourseSelection}
                  key={course.course_id}
                  className="text-2xl hover:text-gray-400 cursor-pointer"
                >
                  {course.course_id}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCatalogue;
