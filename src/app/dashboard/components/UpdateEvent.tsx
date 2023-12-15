import { ClubEvent } from "@/lib/types";
import { FormEvent } from "react";

export default function UpdateEvent(props: {
  event: ClubEvent;
  userSecret: string;
  className?: string;
}): JSX.Element {
  const { event } = props;

  return (
    <div className="relative z-50 flex w-full flex-col rounded-lg bg-white">
      <form
        className="space-y-5"
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const title = e.currentTarget.title;
          const description = e.currentTarget.description.value;
          const location = e.currentTarget.location.value;
          const date = e.currentTarget.date.value;

          fetch(`/api/events/${event.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: props.userSecret,
            },
            body: JSON.stringify({
              title,
              description,
              location,
              date,
            }),
          });
        }}
      >
        <div className="flex flex-col space-y-1">
          <label htmlFor="name" className="text-sm font-bold">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full border border-gray-300 px-5 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Title"
            defaultValue={event.title}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="description" className="text-sm font-bold">
            Description
          </label>
          <textarea
            id="description"
            maxLength={50}
            className="w-full border border-gray-300 px-5 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Description"
            defaultValue={event.description}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="location" className="text-sm font-bold">
            Location
          </label>
          <input
            id="location"
            type="text"
            className="w-full border border-gray-300 px-5 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Location"
            defaultValue={event.location}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="date" className="text-sm font-bold">
            Date
          </label>
          <input
            id="date"
            type="date"
            className="w-full border border-gray-300 px-5 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Date"
            defaultValue={event.date}
          />
        </div>
        <button
          type="submit"
          className="btn w-full border border-transparent bg-black px-5 py-3 text-sm text-white duration-300 ease-in-out hover:border-black hover:bg-white hover:text-black"
        >
          Update
        </button>
        <button
          onClick={() => window.location.reload()}
          className="btn w-full border border-transparent bg-black px-5 py-3 text-sm text-white duration-300 ease-in-out hover:border-black hover:bg-white hover:text-black"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
