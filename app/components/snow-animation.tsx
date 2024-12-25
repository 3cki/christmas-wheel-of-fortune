"use client";

import Lottie from "lottie-web";
import animationData from "@/public/lottie/snow.json";
import { useEffect, useRef } from "react";

const SnowAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      Lottie.loadAnimation({
        container: containerRef.current,
        animationData: animationData,
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed w-screen top-0 left-0 right-0 lottie-animation"
    ></div>
  );
};

export default SnowAnimation;
