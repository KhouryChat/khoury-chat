"use client";
import { useRouter } from "next/navigation";
import React from "react";

const CourseTag = ({ courseID, width }) => {
  const router = useRouter();
  const redirectToCoursePage = (e) => {
    router.push(`/course/${courseID}`);
  };
  let classname = "";
  if (courseID.toLowerCase().includes("cs")) {
    classname =
      "bg-purple-500 hover:bg-purple-600 text-sm py-2 px-3 text-center rounded text-white";
  } else if (courseID.toLowerCase().includes("ds")) {
    classname =
      "bg-blue-400 hover:bg-blue-600 text-sm py-2 px-3 text-center rounded text-white";
  } else if (courseID.toLowerCase().includes("cy")) {
    classname =
      "bg-red-400 hover:bg-red-600 text-sm py-2 px-3 text-center rounded text-white";
  } else {
    classname =
      "bg-green-400 hover:bg-green-600 text-sm py-2 px-3 text-center rounded text-white";
  }
  return (
    <button onClick={redirectToCoursePage} className={classname}>
      {courseID}
    </button>
  );
};

export default CourseTag;
