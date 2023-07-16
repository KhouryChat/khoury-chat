"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/Context/AuthContext";
import TitleBar from "@/components/Title/Title";
import CourseTag from "@/components/CourseTag/CourseTag";
import { GoInfo } from "react-icons/go";
import SpiderGraph from "@/components/LinePlot/LinePlot";
const ProfessorPage = ({ params }) => {
  const [profData, setProfData] = useState({});
  const [ratingData, setRatingData] = useState({});
  const [overallRating, setOverallRating] = useState(0);
  const [showHuskyTooltip, setShowHuskyTooltip] = useState(false);
  const showHuskyScoreInfo = () => {
    setShowHuskyTooltip(!showHuskyTooltip);
  };
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

  useEffect(() => {
    const ratings = profData["ratings"];
    const ratingdata = [];
    const ignored = [
      "hours",
      "attend",
      "computer-skills",
      "out-class",
      "in-class",
      "online-material",
      "course-material",
      "fair",
    ];
    for (const rating in ratings) {
      if (!ignored.includes(rating)) {
        const mean =
          ratings[rating].reduce((acc, value) => acc + value, 0) /
          ratings[rating].length;
        if (rating === "overall") {
          setOverallRating(mean.toFixed(2));
          continue;
        }
        ratingdata.push({
          label: `${rating.replace(/\b\w/g, (match) => match.toUpperCase())}`,
          value: mean,
        });
      }
    }
    setRatingData(ratingdata);
  }, [profData]);
  let ratingColor = "";
  if (overallRating < 3) {
    ratingColor = "text-8xl italic text-red-500";
  } else if (overallRating <= 4) {
    ratingColor = "text-8xl italic text-yellow-500";
  } else if (overallRating > 4) {
    ratingColor = "text-8xl italic text-green-500";
  }
  return (
    <div className="bg-black ">
      <div className="mr-20 bg-black shadow-slate-800 shadow-2xl text-white">
        <TitleBar text={profData["name"] ? profData["name"] : ""} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="p-10 flex flex-col items-center">
          {profData && (
            <div className="flex flex-row gap-2">
              {profData["courses"] &&
                profData["courses"].map((course) => (
                  <CourseTag key={course} courseID={course} />
                ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 justify-center items-center font-bold text-white">
          <div className="ml-8 flex flex-row items-center gap-4">
            <div className="text-4xl ">HUSKY SCORE</div>
            <div
              onMouseOver={() => setShowHuskyTooltip(true)}
              onMouseLeave={() => setShowHuskyTooltip(false)}
            >
              <GoInfo width={80} height={80} />
              {showHuskyTooltip && (
                <div className=" max-w-sm absolute bg-white shadow-lg text-black p-2 rounded text-sm top-56">
                  Husky score is the overall rating of the professor calculated
                  using a compilation of the different areas of teaching.
                </div>
              )}
            </div>
          </div>
          <div className={ratingColor}>{overallRating}</div>
        </div>
        <div className="">
          <SpiderGraph data={ratingData} width={800} height={800} />
        </div>
      </div>
    </div>
  );
};

export default ProfessorPage;
