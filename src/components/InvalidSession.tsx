import SignInButton from "@/components/SignInButton";

export default function InvalidSession(): JSX.Element {
  return (
    <main className="z-50 flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <p className="text-center text-5xl font-extrabold tracking-wide">
        Invalid session
      </p>
      <SignInButton />
    </main>
  );
}
