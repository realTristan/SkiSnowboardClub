"use client";

import Button from "@/components/buttons/Button";
import Navbar from "@/components/Navbar/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import GuelphLogo from "@/components/logos/GuelphLogo";
import SocialMedia from "@/components/logos/SocialMediaLogos";
import ExternalSVG from "@/components/svgs/External";
import MainWrapper from "@/components/MainWrapper";
import { BrowserView } from "react-device-detect";

export default function ContactPage() {
  const contactEmail = "skiandboard@uoguelph.ca";

  return (
    <>
      <Navbar dark={true} centered={false} className="bg-white" />

      <BrowserView>
        <CustomCursor />
      </BrowserView>

      <SocialMedia dark={true} />
      <GuelphLogo
        dark={true}
        className="fixed left-6 top-6 z-50 lg:left-auto lg:right-10 lg:top-10"
      />

      <MainWrapper className="flex-col p-7 xs:p-12 sm:p-24">
        <h1 className="font-tangerine text-6xl font-bold sm:text-7xl lg:text-9xl">
          Contact Us
        </h1>
        <p className="mt-3 text-center text-base font-light sm:w-[32rem]">
          If you have any questions, please feel free to reach out to us!
          Message us via email @{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="text-blue-500 hover:underline"
          >
            {contactEmail}
          </a>
        </p>
        <Button
          href={`mailto:${contactEmail}`}
          className="group mt-6 flex flex-row items-center justify-center gap-2"
        >
          <ExternalSVG className="mb-px h-5 w-5 fill-black duration-300 ease-in-out group-hover:fill-white" />{" "}
          Message us via email
        </Button>
      </MainWrapper>
    </>
  );
}
