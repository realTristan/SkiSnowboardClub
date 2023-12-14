import FacebookLogo from "./FacebookLogo";
import InstagramLogo from "./InstagramLogo";

export default function SocialMedia(props: { dark?: boolean }): JSX.Element {
  return (
    <div className="fixed bottom-6 left-6 flex flex-row items-center justify-center gap-4">
      <InstagramLogo
        dark={props.dark}
        className="btn z-50 duration-300 ease-in-out hover:scale-110"
      />
      <FacebookLogo
        dark={props.dark}
        className="btn z-50 duration-300 ease-in-out hover:scale-110"
      />
    </div>
  );
}
