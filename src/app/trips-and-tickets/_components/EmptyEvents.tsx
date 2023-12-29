/**
 * If there aren't any events posted yet, this component will be displayed.
 * @returns JSX.Element
 */
export default function EmptyEvents(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center gap-4 border border-black p-20">
      <p className="text-center text-5xl font-extrabold tracking-wide">
        Nothing here yet
      </p>
      <p className="text-center text-lg font-light">
        Check back later for more events
      </p>
    </div>
  );
}
