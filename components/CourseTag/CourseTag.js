import { useRouter } from "next/navigation";
import React from "react";

const CourseTag = ({ courseID }) => {
  const router = useRouter();
  const redirectToCoursePage = (e) => {
    router.push(`/course/${courseID}`);
  };
  let classname = "";
  if (courseID.toLowerCase().includes("cs")) {
    classname = "bg-green-400 text-sm py-2 px-3 text-center rounded text-white";
  } else if (courseID.toLowerCase().includes("ds")) {
    classname = "bg-blue-400 text-sm py-2 px-3 text-center rounded text-white";
  } else if (courseID.toLowerCase().includes("cy")) {
    classname = "bg-red-400 text-sm py-2 px-3 text-center rounded text-white";
  }
  return (
    <button onClick={redirectToCoursePage} className={classname}>
      {courseID}
    </button>
  );
};

export default CourseTag;
