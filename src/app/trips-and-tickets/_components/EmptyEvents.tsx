import MainWrapper from "@/components/MainWrapper";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import GuelphLogo from "@/components/logos/GuelphLogo";
import SocialMedia from "@/components/logos/SocialMediaLogos";
import Navbar from "@/components/Navbar/Navbar";

/**
 * If there aren't any events posted yet, this component will be displayed.
 * @returns JSX.Element
 */
export default function EmptyEvents(): JSX.Element {
  return (
    <>
      <Navbar dark={true} centered={false} className="bg-white" />
      <CustomCursor />
      <GuelphLogo
        dark={true}
        className="fixed left-6 top-6 z-50 lg:left-auto lg:right-10 lg:top-10"
      />

      <MainWrapper className="flex-col gap-4 p-20">
        <p className="text-center text-5xl font-extrabold tracking-wide">
          Nothing here yet
        </p>
        <p className="text-center text-lg font-light">
          Check back later for more events
        </p>
      </MainWrapper>

      <SocialMedia dark={true} />
    </>
  );
}
