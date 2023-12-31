import MainWrapper from "@/components/MainWrapper";
import SignInButton from "@/components/buttons/SignInButton";

export default function InvalidPermissions(): JSX.Element {
  return (
    <MainWrapper className="gap-4 p-24">
      <p className="mb-4 text-center text-5xl font-extrabold tracking-wide">
        Invalid permissions
      </p>
      <SignInButton />
    </MainWrapper>
  );
}
