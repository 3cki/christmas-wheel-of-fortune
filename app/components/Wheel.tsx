"use client";

import styles from "./Wheel.module.css";
import { WHEEL_CONFIG } from "@/app/config/constants";
import { WHEEL_SLICES, SliceConfig } from "@/app/config/wheel-config";
import { useWheelSpin } from "@/app/hooks/use-wheel-spin";
import FaceImageSrc from "@/public/img/face.png";
import Image from "next/image";

// Sub-component for wheel slices
function WheelSlice({
  slice,
  index,
  totalSlices,
}: {
  slice: SliceConfig;
  index: number;
  totalSlices: number;
}) {
  const sliceAngle = 360 / totalSlices;
  const rotation = index * sliceAngle;

  // Calculate clip-path polygon for a wedge
  // Using half the slice angle to calculate the y-offset from center
  const halfAngleRad = ((sliceAngle / 2) * Math.PI) / 180;
  const yOffset = 50 * Math.tan(halfAngleRad);
  const topY = 50 - yOffset - 1; // small overlap to avoid gaps
  const bottomY = 50 + yOffset + 1;

  return (
    <div className="text-xl font-bold tracking-wide">
      {/* Background slice */}
      <div
        className={styles.sector}
        style={{
          zIndex: -1,
          transform: `rotate(${rotation + 90}deg)`,
          clipPath: `polygon(0% ${topY}%, 50% 50%, 0% ${bottomY}%)`,
          borderRadius: "50%",
          backgroundColor: slice.color,
        }}
      />
      {/* Label */}
      <div
        className={styles.sector}
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <p className={styles.bonusSector}>{slice.label}</p>
      </div>
    </div>
  );
}

export default function Wheel() {
  const { angle, spin, isSpinning } = useWheelSpin();

  return (
    <div className="w-3/5">
      <div className={styles.container}>
        <div className={styles.arrow} />
        <button
          className={`${styles.middlebutton} text-5xl cursor-pointer`}
          onClick={spin}
          disabled={isSpinning}
          aria-label="Spin the wheel"
        >
          <Image alt="Spin button" src={FaceImageSrc} />
        </button>
        <div
          className={styles.wheel}
          style={{
            transform: `rotate(${angle}deg)`,
            transition: `transform ${WHEEL_CONFIG.SPIN_DURATION_MS}ms ${WHEEL_CONFIG.TRANSITION_TIMING}`,
          }}
        >
          {WHEEL_SLICES.map((slice, index) => (
            <WheelSlice
              key={`${slice.type}-${index}`}
              slice={slice}
              index={index}
              totalSlices={WHEEL_SLICES.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
