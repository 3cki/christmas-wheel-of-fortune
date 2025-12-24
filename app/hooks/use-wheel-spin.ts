import { useState, useCallback } from "react";
import { WHEEL_CONFIG } from "@/app/config/constants";
import { WHEEL_SLICES } from "@/app/config/wheel-config";
import { useGameStore } from "@/app/state/game-store";

export function useWheelSpin() {
  const [angle, setAngle] = useState(0);
  const { isSpinning, startSpin, endSpin } = useGameStore();

  const spin = useCallback(() => {
    if (isSpinning) return;

    startSpin();

    const sliceCount = WHEEL_SLICES.length;
    const anglePerSlice = 360 / sliceCount;
    const offset = anglePerSlice / 2;

    const randomAngle =
      Math.floor(Math.random() * sliceCount) * anglePerSlice +
      WHEEL_CONFIG.MIN_SPIN_DEGREES;
    const newAngle = angle + randomAngle;
    setAngle(newAngle);

    // Calculate selected slice based on final angle
    const normalizedDegrees = Math.abs(Math.round((newAngle + offset) % 360));
    const selectedIndex =
      (sliceCount - Math.floor(normalizedDegrees / anglePerSlice)) % sliceCount;
    const selectedSlice = WHEEL_SLICES[selectedIndex];

    // End spin after animation completes
    setTimeout(() => {
      endSpin(selectedSlice);
    }, WHEEL_CONFIG.SPIN_DURATION_MS);
  }, [angle, isSpinning, startSpin, endSpin]);

  return { angle, spin, isSpinning };
}
