import { User } from "next-auth";
import Image from "next/image";

export default function UserHeader(props: { user: User }): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <Image
        src={props.user.image!}
        alt="..."
        className="rounded-full"
        width={65}
        height={65}
      />

      <div className="flex flex-col">
        <p className="text-4xl font-black uppercase tracking-wider">
          {props.user.name}
        </p>
        <p className="ml-1 text-sm font-light text-gray-500">
          {props.user.email}
        </p>
      </div>
    </div>
  );
}
