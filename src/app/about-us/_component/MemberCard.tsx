import Image from "next/image";

interface MemberCardProps {
  name: string;
  role: string;
  image: string;
  description: string;
}
export default function MemberCard(props: MemberCardProps): JSX.Element {
  return (
    <div className="flex h-96 w-72 flex-col items-center justify-center gap-4 border border-white/30 p-6 backdrop-blur-2xl duration-300 ease-in-out hover:scale-105 xs:h-96 xs:w-80 xs:p-10 sm:h-[30rem] sm:w-96">
      <Image
        src={props.image}
        alt={props.name}
        className="h-32 w-32 rounded-full xs:h-40 xs:w-40 sm:h-60 sm:w-60"
        width={500}
        height={500}
      />
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-lg font-bold text-white xs:text-2xl">{props.name}</p>
        <p className="text-base font-light text-white xs:text-lg">
          {props.role}
        </p>
      </div>
      <p className="text-center text-xs font-light text-white xs:text-sm">
        {props.description}
      </p>
    </div>
  );
}
