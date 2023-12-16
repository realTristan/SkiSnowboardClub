/**
 * If the user isn't registered for any events, this should appear.
 * @returns JSX.Element
 */
export default function NothingYet(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-5xl font-extrabold tracking-wide">
        Nothing here yet
      </p>
      <p className="text-center text-lg font-light">
        Check back later for more events
      </p>
    </div>
  );
}
