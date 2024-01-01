import Image from "next/image";

interface MemberCardProps {
    name: string;
    role: string;
    image: string;
    description: string;
}
export default function MemberCard(props: MemberCardProps): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center gap-4 w-96 h-[30rem] backdrop-blur-2xl border-white/30 border p-10 hover:scale-105 duration-300 ease-in-out">
            <Image src={props.image} alt={props.name} className="w-60 h-60 rounded-full" width={500} height={500} />
            <div className="flex flex-col items-center justify-center text-center">
                <p className="text-2xl font-bold text-white">{props.name}</p>
                <p className="text-lg font-light text-white">{props.role}</p>
            </div>
            <p className="text-center text-sm font-light text-white">{props.description}</p>
        </div>
    );

}