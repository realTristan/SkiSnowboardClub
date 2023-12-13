import ExternalSVG from "../svgs/External";

export default function Hero(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center font-tangerine text-8xl font-black text-white">
        Conquer the slopes
      </h1>

      <p className="mt-7 w-[37rem] text-center text-lg font-light text-white">
        Elevate your experience with like-minded riders - Join the ski and
        snowboarding club for epic slope sessions and mountain memories!
      </p>
      <a
        href="https://gryphlife.uoguelph.ca/organization/skiandsnowboard"
        target="_blank"
        className="btn btn group mt-7 flex flex-row items-center justify-center gap-2 rounded-none border border-white px-16 py-3 text-white duration-300 ease-in-out hover:bg-white hover:text-slate-900"
      >
        {/*<ExternalSVG className="duration-300 ease-in-out group-hover:fill-black" />{" "}*/}
        <p>Join us</p>
      </a>
    </div>
  );
}
