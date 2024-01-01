"use client";

import MainWrapper from "@/components/MainWrapper";
import Navbar from "@/components/Navbar/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import GuelphLogo from "@/components/logos/GuelphLogo";
import SocialMedia from "@/components/logos/SocialMediaLogos";
import MemberCard from "./_component/MemberCard";
import ImageCollage from "./_component/ImageCollage";
import DarkOverlay from "@/components/DarkOverlay";

const  TEAM_MEMBERS = [
  {
    name: "Calin Good",
    role: "President",
    image: "/images/team/calin-good.png",
    description: "I'm a 2nd year Biomedical Sciences from Waterloo, ON. My favourite place to ski is Revelstoke, BC!",
  },
  {
    name: "Lindsay Bouwman",
    role: "Vice President/Event Planner",
    image: "/images/default-pfp-white.png",
    description: "I'm a 2nd year student from Elora, ON. My favourite place to ski is Whistler, BC!",
  },
  {
    name: "Tristan Simpson",
    role: "Software Engineer/Developer",
    image: "/images/default-pfp-white.png",
    description: "I'm a 1st year student from Cambridge, ON. My favourite place to snowboard is Mont Tremblant, QC!",
  },
];

export default function AboutUsPage() {
  return (
    <>
      <Navbar dark={false} centered={true} />
      <CustomCursor />
      <SocialMedia dark={true} />
      <GuelphLogo
        dark={false}
        className="fixed left-6 top-6 z-50 lg:left-auto lg:right-10 lg:top-10"
      />

      <ImageCollage/>
      <DarkOverlay className="bg-black" />

      <MainWrapper  className="gap-4 p-20 pt-32">
        <div className="flex flex-row flex-wrap justify-center items-center gap-12">
        {TEAM_MEMBERS.map((member) => (
          <MemberCard
            key={Math.random()}
            name={member.name}
            role={member.role}
            image={member.image}
            description={member.description}/>
        ))}
        </div>
        
      </MainWrapper>
    </>
  );
}
