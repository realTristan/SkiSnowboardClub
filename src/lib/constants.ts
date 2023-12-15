import { base64encode } from "./crypto";
import { ClubEvent } from "./types";

export const testEvents: ClubEvent[] = [
  {
    title: "Quebec Trip",
    description: "A super fun trip in Quebec!",
    payment_url: "/",
    id: base64encode(Math.random().toString()),
    image: "/images/default-event-photo.png",
    date: Date.now() + 10000,
    attendees: [],
    location: "The University of Guelph",
  },
  {
    title: "Ski Trip",
    description: "A super fun ski trip!",
    payment_url: "/",
    id: base64encode(Math.random().toString()),
    image: "/images/default-event-photo.png",
    date: Date.now(),
    attendees: [],
    location: "The University of Guelph",
  },
];
