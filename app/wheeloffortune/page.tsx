"use client";
import Wheel from "@/app/components/Wheel";
import React, { useState } from "react";

export type CurrentGame =
  | "normal"
  | "Coin Flip"
  | "Pachinko"
  | "Cash Hunt"
  | "Jackpot";

export type Bets = {
  [key: string]: number;
};
export type BetChoices = 0.1 | 0.2 | 0.5 | 1 | 2;
export interface Slice {
  color: string;
  label: string;
  value: number;
  bonus: boolean;
  target: keyof Bets;
}

const WheelOfFortune = () => {
  const [spinning, setSpinning] = useState<boolean>(false);
  const [selectedSlice, setSelectedSlice] = useState<Slice | null>(null);

  return (
    <div className="h-screen flex items-center justify-center">
      <Wheel
        spinning={spinning}
        setSpinning={setSpinning}
        setSelectedSlice={setSelectedSlice}
      />
    </div>
  );
};

export default WheelOfFortune;
