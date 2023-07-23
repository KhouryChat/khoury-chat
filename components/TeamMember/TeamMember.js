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
    <div className="bg-white w-[350px] h-[550px] rounded-2xl shadow-xl flex flex-col items-center justify-between">
      <img
        key={member.name}
        className="relative bottom-36 rounded-full drop-shadow-2xl"
        src={member.image}
        alt=""
        height={240}
        width={240}
      />
      <div className="relative bottom-28 text-4xl font-extrabold font-arcade">
        {member.name.toUpperCase()}
      </div>
      <div className="relative bottom-32 text-md p-10 text-center">
        {member.content}
      </div>
      <div className="flex flex-row gap-6 relative bottom-32">
        <HoverScaleTransition>
          <div
            onClick={() => router.push(member.github)}
            className="cursor-pointer"
          >
            <GithubIcon size={30} color={"black"} />
          </div>
        </HoverScaleTransition>
        <HoverScaleTransition>
          <div
            onClick={() => router.push(member.linkedin)}
            className="cursor-pointer"
          >
            <LinkedInIcon size={30} color={"#1e40af"} />
          </div>
        </HoverScaleTransition>
      </div>
    </div>
  );
};

export default TeamMember;
