import { type User } from "next-auth";
import Image from "next/image";

interface UserHeadProps {
  user: User;
}
export default function UserHead(props: UserHeadProps): JSX.Element {
  const { user } = props;

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <Image
        src={user.image}
        alt="..."
        className="h-12 w-12 rounded-full xs:h-[65px] xs:w-[65px]"
        width={65}
        height={65}
      />

      <div className="flex flex-col">
        <p className="text-xl font-black uppercase tracking-wider xs:text-3xl sm:text-4xl">
          {user.name}
        </p>
        <div className="flex flex-row items-center justify-center gap-1">
          <span className="h-px w-full bg-gray-500 sm:w-0" />
          <p className="w-full text-xs font-light text-gray-500 xs:text-sm">
            {user.email}
          </p>
          <span className="ml-1 h-px w-full bg-gray-500 sm:w-0" />
        </div>
      </div>
    </div>
  );
}
