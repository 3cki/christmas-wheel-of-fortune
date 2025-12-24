"use client";

import animationData from "@/public/lottie/snow.json";
import { useEffect, useRef } from "react";

const SnowAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    import("lottie-web").then((Lottie) => {
      if (containerRef.current) {
        Lottie.default.loadAnimation({
          container: containerRef.current,
          animationData: animationData,
        });
      }
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed w-screen top-0 left-0 right-0 lottie-animation"
    />
  );
};

export default SnowAnimation;
