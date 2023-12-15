import { ClubEvent, Permission } from "@/lib/types";
import Image from "next/image";
import UpdateEvent from "./UpdateEvent";
import { Dispatch, SetStateAction, useState } from "react";
import { hasPermissions } from "@/utils/hasPermissions";

export default function EventCard(props: {
  event: ClubEvent;
  userSecret: string;
  permissions: Permission[];
}): JSX.Element {
  const [updatingEvent, setUpdatingEvent] = useState(false);

  return (
    <div className="relative flex h-[35rem] w-96 flex-col items-start justify-start gap-1 border border-black bg-white p-7 duration-300 ease-in-out hover:scale-105">
      {updatingEvent ? (
        <UpdateEvent userSecret={props.userSecret} event={props.event} />
      ) : (
        <EventInfo
          event={props.event}
          permissions={props.permissions}
          userSecret={props.userSecret}
          setUpdatingEvent={setUpdatingEvent}
        />
      )}
    </div>
  );
}

/**
 * Event info component
 * @param props
 * @returns JSX.Element
 */
interface EventInfoProps {
  event: ClubEvent;
  permissions: Permission[];
  userSecret: string;
  setUpdatingEvent: Dispatch<SetStateAction<boolean>>;
}
function EventInfo(props: EventInfoProps): JSX.Element {
  const { event, permissions, setUpdatingEvent } = props;
  const canDeleteEvent = hasPermissions(permissions, [Permission.DELETE_EVENT]);
  const canEditEvent = hasPermissions(permissions, [Permission.EDIT_EVENT]);

  return (
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

      <div className="flex flex-row gap-2">
        <button
          onClick={() => setUpdatingEvent(true)}
          disabled={!canEditEvent}
          className="btn group mt-7 flex flex-row items-center justify-center gap-2 rounded-none border border-black px-10 py-3 text-sm text-black duration-300 ease-in-out hover:bg-black hover:text-white disabled:opacity-50"
        >
          Edit
        </button>
        <button
          onClick={() => deleteEvent(event.id, props.userSecret)}
          disabled={!canDeleteEvent}
          className="btn group mt-7 flex flex-row items-center justify-center gap-2 rounded-none border border-black px-10 py-3 text-sm text-black duration-300 ease-in-out hover:bg-black hover:text-white disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </>
  );
}

function deleteEvent(eventId: string, userSecret: string): void {
  fetch(`/api/events/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: userSecret,
    },
  });
}
