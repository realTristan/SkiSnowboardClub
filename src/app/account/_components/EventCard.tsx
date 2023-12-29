import { ClubEvent } from "@/lib/types";
import Image from "next/image";

export default function EventCard(props: { event: ClubEvent }): JSX.Element {
  const event: ClubEvent = props.event;

  return (
    <div className="relative flex h-auto w-fit flex-col items-start justify-start gap-1 border border-black bg-white p-7 duration-300 ease-in-out hover:scale-105">
      <Image
        src={event.image}
        alt="..."
        width={300}
        height={300}
        className="rounded-none"
      />
      <h2 className="mt-4 text-3xl font-extrabold">{event.title}</h2>
      <p className="text-sm ">{event.description}</p>
      <p className="text-xs">{new Date(event.date).toDateString()}</p>
      <p className="text-xs">{event.location}</p>
    </div>
  );
}
