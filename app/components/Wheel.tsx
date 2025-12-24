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
  const rotation = index * (360 / totalSlices);

  return (
    <div className="text-xl font-bold tracking-wide">
      {/* Background slice */}
      <div
        className={styles.sector}
        style={{
          zIndex: -1,
          transform: `rotate(${rotation}deg)`,
          clipPath: "polygon(0% -2%, 50% 50%, 0% 50%)",
          borderRadius: "50%",
          backgroundColor: slice.color,
          rotate: `${90 + 180 / totalSlices}deg`,
        }}
      />
      {/* Label */}
      <div
        className={styles.sector}
        style={{
          transform: `rotate(${rotation}deg)`,
          rotate: "0.75deg",
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
    <div className="w-2/5">
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
