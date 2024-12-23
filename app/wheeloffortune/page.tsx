"use client";
import Table from "@/app/components/table";
import Wheel from "@/app/components/Wheel";
import { Button, useDisclosure } from "@nextui-org/react";
import {
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/solid";
import React, { useState, useMemo } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import QuestionModal from "@/app/components/question-modal";
import InfoModal from "@/app/components/info-modal";

export type CurrentGame = "gedicht" | "wahr_falsch" | "lieder" | "schaetzen";

export interface Slice {
  color: string;
  label: string;
  type: CurrentGame;
}

const WheelOfFortune = () => {
  const [spinning, setSpinning] = useState<boolean>(false);
  const [selectedSlice, setSelectedSlice] = useState<Slice | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useMemo(() => {
    if (!onOpen) return;
    if (spinning) return;
    onOpen();
  }, [spinning, selectedSlice, onOpen]);

  const fullScreen = useFullScreenHandle();

  return (
    <FullScreen handle={fullScreen}>
      <div className="h-screen flex flex-col items-center justify-between screen">
        <div className="w-full flex items-center justify-end gap-4 p-4">
          <InfoModal />
          <Button onPress={onOpen}>Letzte Frage erneut öffnen</Button>
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
        <QuestionModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          questionType={selectedSlice?.type}
        />
      </div>
    </FullScreen>
  );
};

export default WheelOfFortune;
