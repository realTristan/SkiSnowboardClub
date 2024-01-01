import Button from "@/components/buttons/Button";
import ErrorMessage from "@/components/ErrorMessage";
import { LoadingRelative } from "@/components/Loading";
import { type ClubEvent, Status } from "@/types/types";
import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useState,
} from "react";

export default function UpdateEventCard(props: {
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
  const [price, setPrice] = useState(event.price);
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
      className="flex h-fit w-full flex-col space-y-4"
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
            price,
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
          onChange={(e) => setDate(e.target.value)}
          type="date"
          className="w-full border border-gray-300 px-5 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
          defaultValue={event.date}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="price" className="text-sm font-bold">
          Price
        </label>
        <input
          type="number"
          onChange={(e) => setPrice(parseInt(e.target.value))}
          className="w-full border border-gray-300 px-5 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
          defaultValue={event.price}
        />
      </div>
      <Button dark={true} type="submit">
        Update
      </Button>
      <Button onClick={() => props.setUpdatingEvent(false)} dark={true}>
        Cancel
      </Button>

      {updateStatus === Status.ERROR && (
        <ErrorMessage>An error occurred while updating the event</ErrorMessage>
      )}
    </form>
  );
}
