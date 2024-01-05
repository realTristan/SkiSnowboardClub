import Button from "@/components/buttons/Button";
import ErrorMessage from "@/components/ErrorMessage";
import { LoadingRelative } from "@/components/Loading";
import { type ClubEvent, Status } from "@/types/types";
import { Checkbox } from "@nextui-org/react";
import { type User } from "next-auth";
import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useState,
  useRef,
} from "react";

type StateDispatch<T> = Dispatch<SetStateAction<T>>;
interface UpdateEventCardProps {
  event: ClubEvent;
  user: User;
  setUpdatingEvent: StateDispatch<boolean>;
}

export default function UpdateEventCard(
  props: UpdateEventCardProps,
): JSX.Element {
  const { event, user } = props;

  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [location, setLocation] = useState(event.location);
  const [date, setDate] = useState(event.date);
  const [price, setPrice] = useState(event.price);
  const [visible, setVisible] = useState<boolean>(event.visible);
  const [formUrl, setFormUrl] = useState(event.formUrl);
  const [updateStatus, setUpdateStatus] = useState<Status>(Status.IDLE);
  const imageRef = useRef<HTMLInputElement>(null);

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

        const _event: ClubEvent = {
          title,
          description,
          location,
          date,
          price,
          visible,
          formUrl,
        } as ClubEvent;

        if (imageRef.current?.files) {
          const image = imageRef.current.files[0];

          if (image) {
            // Convert the image to base64
            const imageb64 = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.readAsDataURL(image);
              reader.onload = () => resolve(reader.result as string);
            });

            _event.image = imageb64;
          }
        }

        // Send the request to the API
        const res = await fetch(`/api/events/id/${event.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: user.secret,
          },
          body: JSON.stringify({ event: _event }),
        });

        if (!res.ok) {
          return setUpdateStatus(Status.ERROR);
        }

        props.setUpdatingEvent(false);
        window.location.reload();
      }}
    >
      <div className="flex flex-col space-y-1">
        <label htmlFor="name" className="text-sm font-bold">
          Title
        </label>
        <input
          type="text"
          maxLength={50}
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
          maxLength={100}
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
      <div className="flex flex-col space-y-1">
        <label htmlFor="image" className="text-sm font-bold">
          Image
        </label>
        <input
          type="file"
          ref={imageRef}
          className="w-full border border-gray-300 px-5 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="formUrl" className="text-sm font-bold">
          Form URL
        </label>
        <input
          type="text"
          onChange={(e) => setFormUrl(e.target.value)}
          className="w-full border border-gray-300 px-5 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
          defaultValue={event.formUrl}
        />
      </div>

      <Checkbox
        defaultSelected={visible}
        onChange={(e) => setVisible(e.target.checked)}
      >
        Visible to all users
      </Checkbox>

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
