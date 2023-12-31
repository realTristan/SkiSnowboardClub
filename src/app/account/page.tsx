"use client";

import Navbar from "@/components/Navbar/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import GuelphLogo from "@/components/logos/GuelphLogo";
import SocialMedia from "@/components/logos/SocialMediaLogos";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SignOutButton from "@/components/buttons/SignOutButton";
import LoadingCenter from "@/components/Loading";
import DashboardButton from "./_components/DashboardButton";
import InvalidSession from "@/components/InvalidSession";
import UserHeader from "./_components/UserHeader";
import MainWrapper from "@/components/MainWrapper";

export default function AccountPage(): JSX.Element {
  return (
    <>
      <Navbar dark={true} centered={false} className="bg-white" />
      <CustomCursor />
      <SocialMedia dark={true} />
      <GuelphLogo
        dark={true}
        className="fixed left-6 top-6 z-50 lg:left-auto lg:right-10 lg:top-10"
      />

      <SessionProvider>
        <Main />
      </SessionProvider>
    </>
  );
}

function Main(): JSX.Element {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google");
    }
  }, [status, session]);

  if (status === "loading") {
    return <LoadingCenter />;
  }

  if (status === "unauthenticated" || !session) {
    return <InvalidSession />;
  }

  return (
    <MainWrapper className="items-start justify-start px-16 pb-20 pt-40">
      <UserHeader user={session.user} />

      <div className="my-8 flex flex-row gap-2">
        <SignOutButton />
        <DashboardButton />
      </div>
    </MainWrapper>
  );
}
