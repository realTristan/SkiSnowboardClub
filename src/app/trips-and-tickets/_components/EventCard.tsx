import { type ClubEvent } from "@/types/types";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";

export default function EventCard(props: { event: ClubEvent }): JSX.Element {
  const event: ClubEvent = props.event;
  const beyondDate = new Date(event.date).getTime() < new Date().getTime();
  const eventDisabled = beyondDate || !event.allowRegistration;

  return (
    <div className="relative flex h-fit w-full flex-col items-start justify-start gap-1 border border-black bg-white p-7 duration-300 ease-in-out hover:scale-105 xs:w-96">
      <Image
        src={event.image}
        alt="..."
        width={300}
        height={300}
        className="h-fit w-full rounded-none sm:h-auto sm:w-auto"
      />

      <h2 className="mt-4 text-2xl font-extrabold uppercase">{event.title}</h2>
      <p className="mb-2 text-sm">{event.description}</p>
      <p className="text-xs">{new Date(event.date).toDateString()}</p>
      <p className="text-xs">{event.location}</p>
      <a
        aria-disabled={eventDisabled}
        href={eventDisabled ? "#" : event.formUrl}
        target="_blank"
        className={cn(
          eventDisabled ? "" : "btn hover:bg-black hover:text-white",
          "mt-4 border border-black px-10 py-3 text-sm duration-300 ease-in-out aria-disabled:opacity-50",
        )}
      >
        {eventDisabled ? "Unavailable" : `Register - $${event.price}`}
      </a>
    </div>
  );
}
