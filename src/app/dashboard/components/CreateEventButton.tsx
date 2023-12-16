import Button from "@/components/Button";

export default function CreateEventButton(): JSX.Element {
  return (
    <Button link={true} href="/dashboard/events/new">
      Create event
    </Button>
  );
}
