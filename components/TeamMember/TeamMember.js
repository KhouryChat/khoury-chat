"use client";
import React from "react";
import Image from "next/image";
import GithubIcon from "@/Icons/GithubIcon";
import LinkedInIcon from "@/Icons/LinkedInIcon";
import HoverScaleTransition from "../HoverScaleTransition/HoverScaleTransition";
import { useRouter } from "next/navigation";

const TeamMember = ({ member }) => {
  const router = useRouter();

  return (
    <div className="bg-white xl:w-[350px] xl:h-[550px] 2xl:w-[400px] 2xl:h-[650px] tall:w-[300px] tall:h-[450px] xl:rounded-2xl 2xl:rounded-3xl shadow-xl flex flex-col items-center justify-between tall:mt-10">
      <img
        key={member.name}
        className="relative bottom-36 rounded-full drop-shadow-2xl xl:w-[240px] 2xl:w-[280px] tall:w-[180px] h-auto"
        src={member.image}
        alt=""
        height={240}
        width={240}
      />
      <div className="relative bottom-28 tall:bottom-32 xl:text-4xl 2xl:text-5xl tall:text-3xl font-extrabold font-arcade">
        {member.name.toUpperCase()}
      </div>
      <div className="relative bottom-32 tall:bottom-36 xl:text-md 2xl:text-lg tall:text-sm p-10 text-center">
        {member.content}
      </div>
      <div className="flex flex-row gap-6 relative bottom-32 tall:bottom-40">
        <HoverScaleTransition>
          <div
            onClick={() => router.push(member.github)}
            className="cursor-pointer"
          >
            <GithubIcon
              size={30}
              color={"black"}
              className={"xl:w-[30px] 2xl:w-[36px] tall:w-[28px] h-auto"}
            />
          </div>
        </HoverScaleTransition>
        <HoverScaleTransition>
          <div
            onClick={() => router.push(member.linkedin)}
            className="cursor-pointer"
          >
            <LinkedInIcon
              size={30}
              color={"#1e40af"}
              className={"xl:w-[30px] 2xl:w-[36px] tall:w-[28px] h-auto"}
            />
          </div>
        </HoverScaleTransition>
      </div>
    </div>
  );
};

export default TeamMember;
