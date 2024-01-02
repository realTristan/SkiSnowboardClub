import { type ClubEvent } from "@/types/types";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";

export default function EventCard(props: { event: ClubEvent }): JSX.Element {
  const event: ClubEvent = props.event;
  const eventDisabled = new Date(event.date).getTime() < new Date().getTime();

  return (
    <div className="relative flex h-fit w-96 flex-col items-start justify-start gap-1 border border-black bg-white p-7 duration-300 ease-in-out hover:scale-105">
      <Image
        src={event.image}
        alt="..."
        width={400}
        height={400}
        className="rounded-none"
      />

      <h2 className="mt-4 text-2xl font-extrabold uppercase">{event.title}</h2>
      <p className="text-sm mb-4">{event.description}</p>
      <p className="text-xs">{new Date(event.date).toDateString()}</p>
      <p className="text-xs">{event.location}</p>

      <a
        aria-disabled={eventDisabled}
        href={event.formUrl}
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
