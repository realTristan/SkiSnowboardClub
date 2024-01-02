"use client";

import LoadingCenter, { LoadingRelative } from "@/components/Loading";
import Navbar from "@/components/Navbar/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import GuelphLogo from "@/components/logos/GuelphLogo";
import SocialMedia from "@/components/logos/SocialMediaLogos";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Permission, Status } from "@/types/types";
import { hasPermissions } from "@/lib/utils/permissions";
import InvalidSession from "@/components/InvalidSession";
import InvalidPermissions from "@/components/InvalidPermissions";
import SearchInput from "./_components/SearchInput";
import { NextUIProvider } from "@nextui-org/react";
import PermissionCheckbox from "./_components/PermissionsCheckbox";
import Image from "next/image";
import { type User } from "next-auth";
import Button from "@/components/buttons/Button";
import BackButton from "./_components/BackButton";
import MainWrapper from "@/components/MainWrapper";
import ErrorMessage from "@/components/ErrorMessage";
import { updateUserPermissions } from "./_utils/permissions";

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
  const [search, setSearch] = useState<string>("");
  const [editingUser, setEditingUser] = useState<User>();
  const [fetchStatus, setFetchStatus] = useState<Status>(Status.LOADING);
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

  if (status === "loading" || fetchStatus === Status.LOADING) {
    return <LoadingCenter />;
  }

  if (status === "unauthenticated" || !session) {
    return <InvalidSession />;
  }

  if (!hasPermissions(session.user.permissions, [Permission.ADMIN])) {
    return <InvalidPermissions />;
  }

  if (fetchStatus === Status.ERROR) {
    return (
      <MainWrapper className="flex-col px-16 pb-20 pt-40">
        <h1 className="text-5xl font-extrabold">Manage Users</h1>
        <BackButton />
        <SearchInput setSearch={setSearch} />
        <ErrorMessage>An error occurred while fetching users.</ErrorMessage>
      </MainWrapper>
    );
  }

  return (
    <MainWrapper className="flex-col items-start justify-start gap-2 px-7 pb-20 pt-40 xs:gap-7 sm:px-16">
      <h1 className="text-4xl font-extrabold xs:text-5xl">Manage Users</h1>
      <BackButton />
      <SearchInput setSearch={setSearch} />

      {users.map((user) => {
        if (!user.name?.includes(search) && !user.email?.includes(search)) {
          return <></>;
        }

        // If the user is editing the current user
        const editingCurrentUser = editingUser && editingUser.id === user.id;

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
                  src={user.image || "/images/default-pfp.png"}
                  alt="..."
                  className="rounded-full"
                  width={50}
                  height={50}
                />

                <div className="flex flex-col items-start justify-start">
                  <h1 className="">{user.name}</h1>
                  <p className="text-xs text-gray-500 xs:text-sm">
                    {user.email}
                  </p>
                </div>
              </div>

              <Button
                disabled={userUpdateStatus === Status.LOADING}
                onClick={() => {
                  editingCurrentUser
                    ? setEditingUser(undefined)
                    : setEditingUser(user);
                }}
              >
                {editingCurrentUser ? "Cancel" : "Edit"}
              </Button>
            </div>

            {/* The checkboxes for permissions (nextui) */}
            {editingUser?.id === user.id && (
              <div className="mt-4 flex w-full flex-col items-start justify-start gap-4 xs:flex-row xs:items-center xs:justify-between xs:gap-0">
                {/* Checkboxes */}
                <div className="ml-2 flex flex-wrap items-start justify-start gap-4">
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
                <Button
                  disabled={userUpdateStatus === Status.LOADING}
                  onClick={async () => await onSaveChangesClick()}
                >
                  {userUpdateStatus === Status.LOADING ? (
                    <LoadingRelative className="h-5 w-5" />
                  ) : (
                    <p>Save changes</p>
                  )}
                </Button>

                {/* Error message */}
                {userUpdateStatus === Status.ERROR && (
                  <ErrorMessage>
                    An error occurred while updating the user&apos;s
                    permissions.
                  </ErrorMessage>
                )}
              </div>
            )}
          </div>
        );
      })}
    </MainWrapper>
  );
}
