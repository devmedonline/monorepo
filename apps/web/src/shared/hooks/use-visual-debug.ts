import { useEffect } from "react";

export const toggleVisualDebug = () => {
  const body = document.querySelector("body");

  if (body) {
    body.appendChild(document.createElement("style")).textContent = `
		.debug * {
			background-color: hsl(0deg 100% 70% / 15%) !important;
			outline: 1px solid hsl(0deg 100% 50% / 85%) !important;
		}
		`;

    body.classList.toggle("debug");
  }
};

export function useVisualDebug() {
  useEffect(() => {
    const handleDebug = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault();

        toggleVisualDebug();
      }
    };

    window.addEventListener("keypress", handleDebug);

    return () => {
      window.removeEventListener("keypress", handleDebug);
    };
  }, []);
}
