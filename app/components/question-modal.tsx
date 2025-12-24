"use client";

import { useEffect, useRef, useState } from "react";
import { Button, useDraggable } from "@nextui-org/react";
import Image from "next/image";
import { BaseModal } from "./ui/base-modal";
import { useQuestionSelection } from "@/app/hooks/use-question-selection";
import { GameType, GAME_TYPE_LABELS } from "@/app/config/constants";

type ModalStep = "intro" | "challenge";

interface QuestionModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  questionType?: GameType;
}

export default function QuestionModal({
  isOpen,
  onOpenChange,
  questionType,
}: QuestionModalProps) {
  const targetRef = useRef<HTMLElement>(null);
  const { moveProps } = useDraggable({
    targetRef,
    isDisabled: !isOpen,
    canOverflow: true,
  });

  const [step, setStep] = useState<ModalStep>("intro");
  const [showAnswer, setShowAnswer] = useState(false);
  const {
    currentQuestion,
    selectRandomQuestion,
    getImageForType,
    getDescriptionForType,
  } = useQuestionSelection();

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen && questionType) {
      setStep("intro");
      setShowAnswer(false);
    }
  }, [isOpen, questionType]);

  const handleShowChallenge = () => {
    if (questionType) {
      selectRandomQuestion(questionType);
      setStep("challenge");
      setShowAnswer(false);
    }
  };

  const handleAnotherChallenge = () => {
    if (questionType) {
      selectRandomQuestion(questionType);
      setShowAnswer(false);
    }
  };

  const currentImage = questionType ? getImageForType(questionType) : null;
  const categoryDescription = questionType
    ? getDescriptionForType(questionType)
    : null;
  const categoryLabel = questionType ? GAME_TYPE_LABELS[questionType] : "";

  // Intro step: show category description
  if (step === "intro") {
    return (
      <BaseModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={categoryLabel}
        size="3xl"
        modalRef={targetRef}
        headerProps={moveProps}
        footer={
          <>
            <Button color="primary" onPress={handleShowChallenge}>
              Aufgabe zeigen
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-8 justify-center items-center">
          {currentImage && (
            <Image
              alt=""
              className="fixed left-0 h-2/3 w-auto"
              src={currentImage}
            />
          )}
          <p className="text-2xl text-center max-w-lg">{categoryDescription}</p>
        </div>
      </BaseModal>
    );
  }

  // Challenge step: show the question
  if (!currentQuestion || !currentImage) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={`${currentQuestion.label} - Schwierigkeit ${currentQuestion.difficulty} / 10`}
      size="3xl"
      modalRef={targetRef}
      headerProps={moveProps}
      footer={
        <>
          {!showAnswer && (
            <Button onPress={() => setShowAnswer(true)}>Antwort anzeigen</Button>
          )}
          <Button color="secondary" onPress={handleAnotherChallenge}>
            Andere Aufgabe
          </Button>
          <Button color="primary" onPress={() => onOpenChange()}>
            Fertig
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-8 justify-center items-center">
        <Image
          alt=""
          className="fixed left-0 h-2/3 w-auto"
          src={currentImage}
        />
        <p className="text-xl">{currentQuestion.description}</p>
        <div className="text-4xl flex flex-col items-center gap-4">
          {currentQuestion.lines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        {showAnswer && (
          <p className="italic text-xl">{currentQuestion.answer}</p>
        )}
      </div>
    </BaseModal>
  );
}
