"use client";
import Table from "@/app/components/table";
import Wheel from "@/app/components/Wheel";
import { Button } from "@nextui-org/react";
import {
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export type CurrentGame =
  | "normal"
  | "Gedicht vervollständigen"
  | "Wahr / Falsch"
  | "Weihnachstlieder trällern"
  | "Schätzen";

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

  const fullScreen = useFullScreenHandle();

  return (
    <FullScreen handle={fullScreen}>
      <div className="h-screen flex flex-col items-center justify-between screen">
        <div className="w-full flex items-center justify-end gap-4 p-4">
          <Button
            isIconOnly
            startContent={
              fullScreen.active ? (
                <ArrowsPointingInIcon className="w-6 h-6" />
              ) : (
                <ArrowsPointingOutIcon className="w-6 h-6" />
              )
            }
            onPress={() => {
              if (fullScreen.active) {
                fullScreen.exit();
              } else {
                fullScreen.enter();
              }
            }}
          />
        </div>
        <div className="flex items-center justify-between gap-8">
          <Wheel
            spinning={spinning}
            setSpinning={setSpinning}
            setSelectedSlice={setSelectedSlice}
          />
          <Table />
        </div>
        <div></div>
      </div>
    </FullScreen>
  );
};

export default WheelOfFortune;
