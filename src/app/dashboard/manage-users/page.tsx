"use client";

import LoadingCenter, { LoadingRelative } from "@/components/Loading";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import GuelphLogo from "@/components/logos/GuelphLogo";
import SocialMedia from "@/components/logos/SocialMediaLogos";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Permission, Status, type User } from "@/lib/types";
import { canAccessDashboard } from "@/utils/permissions";
import InvalidSession from "@/components/InvalidSession";
import NoPermissions from "../components/NoPermissions";
import Image from "next/image";
import { updateUserPermissions } from "./utils/updateUserPermissions";
import { updatePermissionsArray } from "./utils/updatePermissionsArray";
import SearchInput from "./components/SearchInput";
import { Checkbox, NextUIProvider } from "@nextui-org/react";
import PermissionCheckbox from "./components/PermissionsCheckbox";

export default function DashboardPage() {
  return (
    <>
      <Navbar dark={true} centered={false} className="bg-white" />
      <CustomCursor />
      <SocialMedia dark={true} />
      <GuelphLogo
        dark={true}
        className="fixed left-6 top-6 z-50 lg:left-auto lg:right-10 lg:top-10"
      />

      <NextUIProvider>
        <SessionProvider>
          <Main />
        </SessionProvider>
      </NextUIProvider>
    </>
  );
}

function Main(): JSX.Element {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [fetchStatus, setFetchStatus] = useState<Status>(Status.LOADING);
  const [search, setSearch] = useState<string>("");
  const [editingUser, setEditingUser] = useState<User>();
  const [userUpdateStatus, setUserUpdateStatus] = useState<Status>(Status.IDLE);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google");
      return;
    }

    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setFetchStatus(Status.SUCCESS);
      })
      .catch((_) => setFetchStatus(Status.ERROR));
  }, [status]);

  if (status === "loading") {
    return <LoadingCenter />;
  }

  if (!session || !session.user) {
    return <InvalidSession />;
  }

  if (!canAccessDashboard(session.user.permissions)) {
    return <NoPermissions />;
  }

  return (
    <main className="z-50 flex min-h-screen flex-col items-start justify-start gap-7 px-16 pb-20 pt-40">
      <h1 className="text-5xl font-extrabold">Manage Users</h1>
      <SearchInput setSearch={setSearch} />

      {fetchStatus === Status.LOADING && <LoadingCenter />}
      {fetchStatus === Status.SUCCESS &&
        users.map((user) => {
          if (!user.name.includes(search) && !user.email.includes(search)) {
            return <></>;
          }

          /**
           * When the user clicks the save changes button
           * @returns void
           */
          const onSaveChangesClick = async () => {
            const secret: string | null = session.user.secret;
            if (!secret) return;

            // Set the update status to loading
            setUserUpdateStatus(Status.LOADING);

            await updateUserPermissions(secret, user, user.permissions).then(
              (res) => {
                if (!res.ok) {
                  setUserUpdateStatus(Status.ERROR);
                } else {
                  setEditingUser(undefined);
                  setUserUpdateStatus(Status.IDLE);
                }
              },
            );
          };

          return (
            <div
              key={user.id}
              className="flex w-full flex-col items-start justify-start gap-2 border border-black p-3"
            >
              <div className="flex w-full flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-center gap-4">
                  <Image
                    src={user.image}
                    alt="..."
                    className="rounded-full"
                    width={50}
                    height={50}
                  />

                  <div className="flex flex-col items-start justify-start">
                    <h1 className="">{user.name}</h1>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  disabled={userUpdateStatus === Status.LOADING}
                  onClick={() => {
                    editingUser && editingUser.id === user.id
                      ? setEditingUser(undefined)
                      : setEditingUser(user);
                  }}
                  className="btn border border-black px-10 py-3 text-sm text-black duration-300 ease-in-out enabled:hover:bg-black enabled:hover:text-white disabled:opacity-50"
                >
                  {editingUser && editingUser.id === user.id ? (
                    <p>Cancel</p>
                  ) : (
                    <p>Edit</p>
                  )}
                </button>
              </div>

              {/* The checkboxes for permissions (nextui) */}
              {editingUser?.id === user.id && (
                <div className="mt-4 flex w-full flex-row items-center justify-between">
                  {/* Checkboxes */}
                  <div className="ml-2 flex flex-row items-center justify-center gap-4">
                    <PermissionCheckbox
                      permission={Permission.ADMIN}
                      user={user}
                      users={users}
                      setUsers={setUsers}
                      disabled={user.id === session.user.id}
                    >
                      Admin
                    </PermissionCheckbox>
                    <PermissionCheckbox
                      permission={Permission.POST_EVENT}
                      user={user}
                      users={users}
                      setUsers={setUsers}
                    >
                      Post Events
                    </PermissionCheckbox>
                    <PermissionCheckbox
                      permission={Permission.EDIT_EVENT}
                      user={user}
                      users={users}
                      setUsers={setUsers}
                    >
                      Edit Events
                    </PermissionCheckbox>
                    <PermissionCheckbox
                      permission={Permission.DELETE_EVENT}
                      user={user}
                      users={users}
                      setUsers={setUsers}
                    >
                      Delete Events
                    </PermissionCheckbox>
                  </div>

                  {/* Save changes button */}
                  <button
                    disabled={userUpdateStatus === Status.LOADING}
                    className="btn group flex flex-col items-center justify-center gap-2 rounded-none border border-black px-10 py-3 text-sm text-black duration-300 ease-in-out enabled:hover:bg-black enabled:hover:text-white disabled:opacity-50"
                    onClick={async () => await onSaveChangesClick()}
                  >
                    {userUpdateStatus === Status.IDLE && <p>Save changes</p>}
                    {userUpdateStatus === Status.LOADING && (
                      <LoadingRelative className="h-5 w-5" />
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
    </main>
  );
}
