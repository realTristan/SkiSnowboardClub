import SignInButton from "@/components/SignInButton";

export default function NoPermissions(): JSX.Element {
  return (
    <main className="z-50 flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <p className="mb-4 text-center text-5xl font-extrabold tracking-wide">
        Invalid permissions
      </p>
      <SignInButton />
    </main>
  );
}
