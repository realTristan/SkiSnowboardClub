import { useEffect } from "react";

export default function CustomCursor(): JSX.Element {
  useEffect(() => {
    const cursor = document.querySelector(".cursor") as HTMLElement;
    if (!cursor) return;

    const btns = document.querySelectorAll(".btn") as NodeListOf<HTMLElement>;
    btns.forEach((btn) => {
      // Mouse enter/move listener for button
      btn.addEventListener("mousemove", (e) => {
        cursor.classList.add("scale-150");
        cursor.classList.add("bg-white");
      });

      // Mouse exit listener for button
      btn.addEventListener("mouseout", (_) => {
        cursor.classList.remove("scale-150");
        cursor.classList.remove("bg-white");
      });
    });

    // Mouse move listener
    document.addEventListener(
      "mousemove",
      (e) =>
        (cursor.style.cssText = `left: ${e.clientX - 11.5}px; top: ${
          e.clientY - 13
        }px;`),
      false,
    );
  }, []);

  return (
    <div className="cursor pointer-events-none fixed z-50 rounded-full border-2 border-white p-[0.6rem] mix-blend-difference ease-linear"></div>
  );
}
