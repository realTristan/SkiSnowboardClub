"use client";

import Navbar from "../components/Navbar/Navbar";
import CustomCursor from "../components/dynamic/CustomerCursor";
import GuelphLogo from "@/components/logos/GuelphLogo";
import SocialMediaLogos from "@/components/logos/SocialMediaLogos";
import MainWrapper from "@/components/MainWrapper";
import { BrowserView } from "react-device-detect";

export default function Home() {
  return (
    <>
      <Navbar centered={true} />

      <BrowserView>
        <CustomCursor />
      </BrowserView>

      <GuelphLogo className="fixed left-10 top-10 z-50 block lg:hidden xl:left-auto xl:right-10 xl:block" />
      <SocialMediaLogos />

      <MainWrapper
        className="bg-cover-all bg-fixed-all bg-center-all flex-col p-10 md:p-24"
        style={{
          backgroundImage: "url('/images/hero-background-2.png')",
        }}
      >
        <h1 className="z-10 text-center font-tangerine text-7xl font-black text-white sm:text-8xl lg:text-9xl">
          Conquer the Slopes
        </h1>

        <p className="z-10 mt-7 w-full text-center text-base font-light text-white md:w-[37rem] lg:text-lg">
          Elevate your experience with like-minded riders - Join the ski and
          snowboarding club for epic slope sessions and mountain memories!
        </p>
        <a
          href="https://gryphlife.uoguelph.ca/organization/skiandsnowboard"
          target="_blank"
          className="btn btn group z-10 mt-7 flex flex-row items-center justify-center gap-2 rounded-none border border-white px-16 py-3 text-white duration-300 ease-in-out hover:bg-white hover:text-slate-900"
        >
          <p>Join us</p>
        </a>
      </MainWrapper>

      <p className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 transform animate-pulse text-center text-base font-light text-white">
        See trips and tickets for our upcoming events!
      </p>
    </>
  );
}
