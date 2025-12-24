"use client";

import { useEffect } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import {
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/solid";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useGameStore } from "@/app/state/game-store";

import Table from "@/app/components/table";
import Wheel from "@/app/components/Wheel";
import QuestionModal from "@/app/components/question-modal";
import InfoModal from "@/app/components/info-modal";
import SnowAnimation from "@/app/components/snow-animation";

export default function WheelOfFortune() {
  const { isSpinning, selectedSlice } = useGameStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const fullScreen = useFullScreenHandle();

  // Open modal when spin completes (fixed: was useMemo, should be useEffect)
  useEffect(() => {
    if (!isSpinning && selectedSlice) {
      onOpen();
    }
  }, [isSpinning, selectedSlice, onOpen]);

  return (
    <FullScreen handle={fullScreen}>
      <div className="h-screen flex flex-col items-center justify-between screen bg-gradient-to-b from-indigo-800 to-sky-700">
        <header className="w-full flex items-center justify-end gap-4 p-4">
          <InfoModal />
          <Button
            isIconOnly
            onPress={() => {
              if (fullScreen.active) {
                fullScreen.exit();
              } else {
                fullScreen.enter();
              }
            }}
            aria-label={
              fullScreen.active ? "Exit fullscreen" : "Enter fullscreen"
            }
          >
            {fullScreen.active ? (
              <ArrowsPointingInIcon className="w-6 h-6" />
            ) : (
              <ArrowsPointingOutIcon className="w-6 h-6" />
            )}
          </Button>
        </header>

        <main className="flex items-center justify-between gap-8">
          <Wheel />
          <Table />
        </main>

        <footer />

        <QuestionModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          questionType={selectedSlice?.type}
        />
      </div>
      <SnowAnimation />
    </FullScreen>
  );
}
