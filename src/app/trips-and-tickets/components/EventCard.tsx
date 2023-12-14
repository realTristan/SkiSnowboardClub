import { ClubEvent } from "@/lib/types";
import { cn } from "@/utils/cn";
import Image from "next/image";

export default function EventCard(props: { event: ClubEvent }): JSX.Element {
  const event: ClubEvent = props.event;

  return (
    <div className="relative flex h-[28.5rem] w-80 flex-col items-start justify-start gap-1 border border-black bg-white p-7 duration-300 ease-in-out hover:scale-105">
      <Image
        src={event.image}
        alt="..."
        width={400}
        height={400}
        className="rounded-none"
      />
      <h2 className="mt-3 text-3xl font-extrabold">{event.title}</h2>
      <p className="text-sm ">{event.description}</p>
      <button
        disabled={event.disabled}
        onClick={() => {
          window.location.href = event.payment_url;
        }}
        className={cn(
          !event.disabled ? "btn" : "",
          "absolute bottom-7 left-7 border border-black px-10 py-3 text-sm duration-300 ease-in-out enabled:hover:bg-black enabled:hover:text-white disabled:opacity-50",
        )}
      >
        {event.disabled ? "Unavailable" : "Register"}
      </button>
    </div>
  );
}
