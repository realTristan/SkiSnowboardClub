import { User } from "@/lib/types";
import Image from "next/image";

export default function UserInfo(props: { user: User }): JSX.Element {
  const { user } = props;

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <Image
        src={user.image}
        alt="..."
        className="rounded-full"
        width={50}
        height={50}
      />

      <div className="flex flex-col items-start justify-start">
        <h1 className="">{user.name}</h1>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}
