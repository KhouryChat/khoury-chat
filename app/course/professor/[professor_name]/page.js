"use client";
import React, { useState } from "react";
import { useAuthContext } from "@/Context/AuthContext";
import TitleBar from "@/components/Title/Title";
const ProfessorPage = ({ params }) => {
  return (
    <div className="bg-white ">
      <div className="bg-black text-white shadow-xl">
        <TitleBar text={params.professor_name} />
      </div>
      <div className="flex flex-row items-center justify-between "></div>
    </div>
  );
};

export default ProfessorPage;
