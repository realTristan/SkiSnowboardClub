import Image from "next/image";

export default function ImageCollage(): JSX.Element {
    return (
        <div className="flex flex-wrap w-[1900px] h-max fixed -z-10 gap-8 overflow-hidden transform justify-center items-start scale-110">
            {Array.from(Array(10).keys()).map((i) => (
                <Image key={Math.random()} src={`/images/collage/cimg-${i + 1}.png`} alt={"..."} width={500} height={500} className="w-fit h-fit" quality={100}/>
            ))}
        </div>
    );

}