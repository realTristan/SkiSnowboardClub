export default function Hero(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-tangerine text-center text-8xl font-black text-white">
        Conquer the slopes
      </h1>

      <p className="mt-7 w-[37rem] text-center text-lg font-light text-white">
        Elevate your experience with like-minded riders - Join the ski and
        snowboarding club for epic slope sessions and mountain memories!
      </p>
      <button className="btn btn mt-7 rounded-none border border-white px-16 py-3 text-white duration-300 ease-in-out hover:bg-white hover:text-slate-900">
        Join us
      </button>
    </div>
  );
}
