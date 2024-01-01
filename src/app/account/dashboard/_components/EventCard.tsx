import { type ClubEvent, Permission, Status } from "@/types/types";
import Image from "next/image";
import UpdateEventCard from "./UpdateEventCard";
import { useState } from "react";
import { hasPermissions } from "@/lib/utils/permissions";
import { LoadingRelative } from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";

async function deleteEvent(eventId: string, userSecret: string) {
  return await fetch(`/api/events/id/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: userSecret,
    },
  });
}

interface EventCardProps {
  event: ClubEvent;
  userSecret: string;
  permissions: Permission[];
}
export default function EventCard(props: EventCardProps): JSX.Element {
  const { event, userSecret, permissions } = props;

  const canDeleteEvent = hasPermissions(permissions, [Permission.DELETE_EVENT]);
  const canEditEvent = hasPermissions(permissions, [Permission.EDIT_EVENT]);

  const [deletionStatus, setDeletionStatus] = useState<Status>(Status.IDLE);
  const [updatingEvent, setUpdatingEvent] = useState(false);

  return (
    <div className="relative flex h-fit w-96 flex-col items-start justify-start gap-1 border border-black bg-white px-7 pb-5 pt-7 duration-300 ease-in-out">
      {updatingEvent ? (
        <UpdateEventCard
          setUpdatingEvent={setUpdatingEvent}
          userSecret={userSecret}
          event={event}
        />
      ) : (
        <>
          <Image
            src={event.image}
            alt="..."
            width={400}
            height={400}
            className="rounded-none"
          />
          <h2 className="mt-4 text-3xl font-extrabold">{event.title}</h2>
          <p className="text-sm ">{event.description}</p>
          <p className="text-xs">{new Date(event.date).toDateString()}</p>
          <p className="text-xs">{event.location}</p>

          <div className="mt-4 flex flex-row gap-2">
            <button
              onClick={() => setUpdatingEvent(true)}
              disabled={!canEditEvent || deletionStatus === Status.LOADING}
              className="btn group flex flex-row items-center justify-center gap-2 rounded-none border border-black px-10 py-3 text-sm text-black duration-300 ease-in-out enabled:hover:bg-black enabled:hover:text-white disabled:opacity-50"
            >
              Edit
            </button>
            <button
              onClick={async () => {
                setDeletionStatus(Status.LOADING);

                const res = await deleteEvent(event.id, props.userSecret);
                if (res.ok) {
                  window.location.reload();
                } else {
                  setDeletionStatus(Status.ERROR);
                }
              }}
              disabled={!canDeleteEvent || deletionStatus === Status.LOADING}
              className="btn group flex flex-row items-center justify-center gap-2 rounded-none border border-black px-10 py-3 text-sm text-black duration-300 ease-in-out enabled:hover:bg-black enabled:hover:text-white disabled:opacity-50"
            >
              {deletionStatus === Status.LOADING ? (
                <LoadingRelative className="h-5 w-5" />
              ) : (
                <p>Delete</p>
              )}
            </button>
          </div>

          {deletionStatus === Status.ERROR && (
            <ErrorMessage>
              An error occurred while deleting the event
            </ErrorMessage>
          )}
        </>
      )}
    </div>
  );
}
