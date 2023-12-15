import { LoadingRelative } from "@/components/Loading";
import { ClubEvent, Status } from "@/lib/types";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

export default function UpdateEvent(props: {
  event: ClubEvent;
  userSecret: string;
  className?: string;
  setUpdatingEvent: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const { event } = props;

  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [location, setLocation] = useState(event.location);
  const [date, setDate] = useState(event.date);
  const [updateStatus, setUpdateStatus] = useState<Status>(Status.IDLE);

  if (updateStatus === Status.LOADING) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <LoadingRelative />
      </div>
    );
  }

  return (
    <form
      className="flex w-full flex-col space-y-5"
      onSubmit={async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Set the status to loading
        setUpdateStatus(Status.LOADING);

        // Send the request to the API
        await fetch(`/api/events/id/${event.id}`, {
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
        }).then((res) => {
          if (res.ok) {
            props.setUpdatingEvent(false);
            window.location.reload();
          } else {
            setUpdateStatus(Status.ERROR);
          }
        });
      }}
    >
      <div className="flex flex-col space-y-1">
        <label htmlFor="name" className="text-sm font-bold">
          Title
        </label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 px-5 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
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
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 px-5 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
          defaultValue={event.description}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="location" className="text-sm font-bold">
          Location
        </label>
        <input
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 px-5 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
          defaultValue={event.location}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="date" className="text-sm font-bold">
          Date
        </label>
        <input
          onChange={(e) => {
            // Create a Date object
            const date = new Date(e.target.value);

            // Get the time value in milliseconds and convert it to seconds
            const seconds = date.getTime() / 1000;

            // Set the date state
            setDate(seconds);
          }}
          type="date"
          className="w-full border border-gray-300 px-5 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
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
        onClick={() => props.setUpdatingEvent(false)}
        className="btn w-full border border-transparent bg-black px-5 py-3 text-sm text-white duration-300 ease-in-out hover:border-black hover:bg-white hover:text-black"
      >
        Cancel
      </button>

      <p className="text-sm text-red-500">
        {updateStatus === Status.ERROR
          ? "An error occurred while updating the event"
          : ""}
      </p>
    </form>
  );
}
