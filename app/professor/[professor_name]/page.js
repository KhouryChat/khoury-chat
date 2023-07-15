"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/Context/AuthContext";
import TitleBar from "@/components/Title/Title";
import CourseTag from "@/components/CourseTag/CourseTag";
const ProfessorPage = ({ params }) => {
  const [profData, setProfData] = useState({});

  useEffect(() => {
    const getProfData = async () => {
      try {
        const response = await fetch(
          `https://www.khourychat.com/api/professors/${params.professor_name}`
        );
        const data = await response.json();
        console.log(data);
        setProfData(data);
      } catch (e) {
        console.log(e);
      }
    };
    getProfData();
  }, []);

  return (
    <div className="bg-white ">
      <div className="bg-black text-white shadow-xl">
        <TitleBar text={profData["name"] ? profData["name"] : ""} />
      </div>
      <div className="p-10 flex flex-col items-center">
        {profData && (
          <div className="flex flex-row gap-2">
            {profData["courses"] &&
              profData["courses"].map((course) => (
                <CourseTag courseID={course} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessorPage;
