import React from "react";
import { TailChase } from "ldrs/react";
import "ldrs/react/TailChase.css";

/**
 * Reusable Loader Component
 *
 * Props:
 * - size (string | number): size of the loader, e.g. "40" or "60"
 * - speed (string | number): animation speed, e.g. "1.75"
 * - color (string): color value (CSS color)
 * - fullScreen (boolean): if true, centers loader fullscreen
 */
export default function Loader({
  size = 40,
  speed = 1.75,
  color = "black",
  fullScreen = false,
}) {
  if (fullScreen) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-white/70">
        <TailChase size={size} speed={speed} color={color} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <TailChase size={size} speed={speed} color={color} />
    </div>
  );
}
