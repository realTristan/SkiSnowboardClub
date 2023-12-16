import { type ClubEvent } from "@/lib/types";

export async function getPurchasedEvents(
  userSecret: string,
): Promise<ClubEvent[]> {
  return await fetch("/api/events/user", {
    method: "GET",
    headers: { Authorization: userSecret },
  })
    .then((res) => res.json())
    .then((data) => (data.events as ClubEvent[]) || []);
}
