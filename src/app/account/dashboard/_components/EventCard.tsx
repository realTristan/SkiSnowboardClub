import { type ClubEvent, Permission, Status } from "@/types/types";
import Image from "next/image";
import UpdateEventCard from "./UpdateEventCard";
import { useState } from "react";
import { hasPermissions } from "@/lib/utils/permissions";
import { LoadingRelative } from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import { type User } from "next-auth";

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
  user: User;
  permissions: Permission[];
}
export default function EventCard(props: EventCardProps): JSX.Element {
  const { event, user, permissions } = props;

  const canDeleteEvent = hasPermissions(permissions, [Permission.DELETE_EVENT]);
  const canEditEvent = hasPermissions(permissions, [Permission.EDIT_EVENT]);

  const [deletionStatus, setDeletionStatus] = useState<Status>(Status.IDLE);
  const [updatingEvent, setUpdatingEvent] = useState(false);
  const [confirmDeleteEvent, setConfirmDeleteEvent] = useState(false);

  function ConfirmDeleteEventButton(): JSX.Element {
    return (
      <button
        disabled={!canDeleteEvent || deletionStatus === Status.LOADING}
        className="btn group flex flex-row items-center justify-center gap-2 rounded-none border border-black px-10 py-3 text-sm text-black duration-300 ease-in-out enabled:hover:bg-black enabled:hover:text-white disabled:opacity-50"
        onClick={async () => {
          setDeletionStatus(Status.LOADING);

          const res = await deleteEvent(event.id, props.user.secret);
          if (res.ok) {
            window.location.reload();
          } else {
            setDeletionStatus(Status.ERROR);
          }
        }}
      >
        {deletionStatus === Status.LOADING ? (
          <LoadingRelative className="h-5 w-5" />
        ) : (
          <CheckmarkSvg className="fill-black group-enabled:group-hover:fill-white" />
        )}
      </button>
    );
  }

  return (
    <div className="relative flex h-fit w-full flex-col items-start justify-start gap-1 border border-black bg-white px-7 pb-5 pt-7 duration-300 ease-in-out sm:w-96">
      {updatingEvent ? (
        <UpdateEventCard
          setUpdatingEvent={setUpdatingEvent}
          user={user}
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
          <p className="mb-4 text-sm">{event.description}</p>
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
            {confirmDeleteEvent ? (
              <div className="flex flex-row gap-2">
                <ConfirmDeleteEventButton />
                <button
                  disabled={
                    !canDeleteEvent || deletionStatus === Status.LOADING
                  }
                  onClick={() => setConfirmDeleteEvent(false)}
                  className="btn group flex flex-row items-center justify-center gap-2 rounded-none border border-black px-10 py-3 text-sm text-black duration-300 ease-in-out enabled:hover:bg-black enabled:hover:text-white disabled:opacity-50"
                >
                  <XSvg className="fill-black group-enabled:group-hover:fill-white" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDeleteEvent(true)}
                disabled={!canDeleteEvent || deletionStatus === Status.LOADING}
                className="btn group flex flex-row items-center justify-center gap-2 rounded-none border border-black px-10 py-3 text-sm text-black duration-300 ease-in-out enabled:hover:bg-black enabled:hover:text-white disabled:opacity-50"
              >
                Delete
              </button>
            )}
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

function CheckmarkSvg({ className }: { className?: string }): JSX.Element {
  return (
    <svg
      height="15px"
      width="15px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17.837 17.837"
      className={className}
    >
      <g>
        <path
          d="M16.145,2.571c-0.272-0.273-0.718-0.273-0.99,0L6.92,10.804l-4.241-4.27
		c-0.272-0.274-0.715-0.274-0.989,0L0.204,8.019c-0.272,0.271-0.272,0.717,0,0.99l6.217,6.258c0.272,0.271,0.715,0.271,0.99,0
		L17.63,5.047c0.276-0.273,0.276-0.72,0-0.994L16.145,2.571z"
        />
      </g>
    </svg>
  );
}

function XSvg({ className }: { className?: string }): JSX.Element {
  return (
    <svg
      height="15px"
      width="15px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 460.775 460.775"
      className={className}
    >
      <path
        d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
	c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
	c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
	c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
	l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
	c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
      />
    </svg>
  );
}
