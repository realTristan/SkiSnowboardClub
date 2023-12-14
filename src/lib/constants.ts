import { base64encode } from "./crypto";
import { ClubEvent } from "./types";

export const testEvents: ClubEvent[] = [
  {
    title: "Quebec Trip",
    description: "A super fun trip in Quebec!",
    payment_url: "/",
    id: base64encode(Math.random().toString()),
    image: "/images/default-event-photo.png",
    disabled: false,
    date: 0,
    attendees: [],
  },
  {
    title: "Ski Trip",
    description: "A super fun ski trip!",
    payment_url: "/",
    id: base64encode(Math.random().toString()),
    image: "/images/default-event-photo.png",
    disabled: true,
    date: 0,
    attendees: [],
  },
];
