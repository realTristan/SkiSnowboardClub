"use client";

import LoadingCenter from "@/components/Loading";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { Prisma } from "@/lib/prisma";
import { Permission } from "@/lib/types";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <CustomCursor />
      <SessionProvider>
        <Main />
      </SessionProvider>
    </>
  );
}

function Main(): JSX.Element {
  const { data: session, status } = useSession();
  const [permissions, setPermission] = useState<Permission[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google");
      return;
    }
  }, [status]);

  if (status === "loading") return <LoadingCenter />;

  return (
    <main className="z-50 flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Admin Dashboard</h1>
      {session?.user.permissions.map((permission) => (
        <p key={permission}>
          {permission === Permission.ADMIN ? "true" : "false"}
        </p>
      ))}
    </main>
  );
}
