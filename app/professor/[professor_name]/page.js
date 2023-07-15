"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/Context/AuthContext";
import TitleBar from "@/components/Title/Title";
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
        <TitleBar text={profData["name"]} />
      </div>
      <div className="flex flex-row items-center justify-between "></div>
    </div>
  );
};

export default ProfessorPage;
