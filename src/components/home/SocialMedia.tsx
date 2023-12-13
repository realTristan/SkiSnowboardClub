import FacebookLogo from "../fixed/FacebookLogo";
import InstagramLogo from "../fixed/InstagramLogo";

export default function SocialMedia(): JSX.Element {
  return (
    <div className="fixed bottom-6 left-6 flex flex-row items-center justify-center gap-4">
      <InstagramLogo className="btn z-50 duration-300 ease-in-out hover:scale-110" />
      <FacebookLogo className="btn z-50 duration-300 ease-in-out hover:scale-110" />
    </div>
  );
}
