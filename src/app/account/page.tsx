"use client";

import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import GuelphLogo from "@/components/logos/GuelphLogo";
import SocialMedia from "@/components/logos/SocialMediaLogos";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

export default function AccountPage() {
  return (
    <>
      <Navbar dark={true} />
      <CustomCursor />
      <SocialMedia dark={true} />
      <GuelphLogo
        dark={true}
        className="fixed right-7 top-7 z-50 hidden lg:block"
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
  }, [status]);

  if (!session || !session.user) {
    return <InvalidSession />;
  }

  return (
    <main className="z-50 flex min-h-screen flex-col items-center justify-start p-40">
      <div className="flex flex-row items-center justify-center gap-4">
        <Image
          src={session?.user?.image!}
          alt="..."
          className="rounded-full"
          width={65}
          height={65}
        />
        <div className="flex flex-col">
          <p className="text-4xl font-extrabold">{session.user.name}</p>
          <p className="ml-1 text-sm">{session.user.email}</p>
        </div>

        <button
          className="btn ml-10 border border-black px-10 py-3 duration-300 ease-in-out hover:bg-black hover:text-white"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    </main>
  );
}

function InvalidSession(): JSX.Element {
  return (
    <main className="z-50 flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <p className="text-center text-5xl font-extrabold tracking-wide">
        Invalid session
      </p>
      <button
        className="btn border border-black px-10 py-3 duration-300 ease-in-out hover:bg-black hover:text-white"
        onClick={() => signIn("google")}
      >
        Sign in
      </button>
    </main>
  );
}
