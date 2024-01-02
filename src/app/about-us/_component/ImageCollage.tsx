import Image from "next/image";

export default function ImageCollage(): JSX.Element {
  return (
    <div className="fixed -z-10 hidden h-max w-[1900px] scale-110 transform flex-wrap items-start justify-center gap-8 overflow-hidden sm:flex">
      {Array.from(Array(10).keys()).map((i) => (
        <Image
          key={Math.random()}
          src={`/images/collage/cimg_${i + 1}.png`}
          alt={"..."}
          width={500}
          height={500}
          className="h-fit w-fit"
          quality={100}
        />
      ))}
    </div>
  );
}
