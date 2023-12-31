import { cn } from "@/lib/utils/cn";
import DefaultNavbar from "./DefaultNavbar";
import MobileNavbar from "./MobileNavbar";

/**
 * Navbar component
 * @param props Navbar props
 * @returns JSX.Element
 */
export interface NavbarProps {
  centered?: boolean;
  className?: string;
  dark?: boolean;
}
export default function Navbar(props: NavbarProps): JSX.Element {
  return (
    <>
      <DefaultNavbar
        centered={props.centered}
        className={cn("hidden flex-auto lg:flex", props.className)}
        dark={props.dark}
      />
      <MobileNavbar
        className={cn("lg:hidden", props.className)}
        dark={props.dark}
      />
    </>
  );
}
