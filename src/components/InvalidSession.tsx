import SignInButton from "@/components/buttons/SignInButton";
import MainWrapper from "./MainWrapper";

export default function InvalidSession(): JSX.Element {
  return (
    <MainWrapper className="gap-4 p-24">
      <p className="text-center text-5xl font-extrabold tracking-wide">
        Invalid session
      </p>
      <SignInButton />
    </MainWrapper>
  );
}
