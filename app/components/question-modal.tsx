"use client";

import { useEffect, useRef, useState } from "react";
import { Button, useDraggable } from "@nextui-org/react";
import Image from "next/image";
import { BaseModal } from "./ui/base-modal";
import { useQuestionSelection } from "@/app/hooks/use-question-selection";
import { GameType, GAME_TYPE_LABELS } from "@/app/config/constants";

type ModalStep = "intro" | "challenge";

// Letters for Stadt Land Fluss (excluding difficult letters like Q, X, Y)
const STADT_LAND_FLUSS_LETTERS = "ABCDEFGHIKLMNOPRSTUVWZ";

function getRandomLetter(): string {
  const index = Math.floor(Math.random() * STADT_LAND_FLUSS_LETTERS.length);
  return STADT_LAND_FLUSS_LETTERS[index];
}

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
  const [randomLetter, setRandomLetter] = useState<string>("");
  const {
    currentQuestion,
    selectRandomQuestion,
    getImageForType,
    getDescriptionForType,
  } = useQuestionSelection();

  const isStadtLandFluss = questionType === "stadt_land_fluss";

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen && questionType) {
      setStep("intro");
      setShowAnswer(false);
      setRandomLetter("");
    }
  }, [isOpen, questionType]);

  const handleShowChallenge = () => {
    if (questionType) {
      if (isStadtLandFluss) {
        setRandomLetter(getRandomLetter());
      } else {
        selectRandomQuestion(questionType);
      }
      setStep("challenge");
      setShowAnswer(false);
    }
  };

  const handleAnotherChallenge = () => {
    if (questionType) {
      if (isStadtLandFluss) {
        setRandomLetter(getRandomLetter());
      } else {
        selectRandomQuestion(questionType);
      }
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

  // Stadt Land Fluss challenge: show random letter
  if (isStadtLandFluss && randomLetter) {
    return (
      <BaseModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Stadt Land Fluss"
        size="3xl"
        modalRef={targetRef}
        headerProps={moveProps}
        footer={
          <>
            <Button color="secondary" onPress={handleAnotherChallenge}>
              Neuer Buchstabe
            </Button>
            <Button color="primary" onPress={() => onOpenChange()}>
              Fertig
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
          <p className="text-xl">Euer Buchstabe ist:</p>
          <p className="text-9xl font-bold text-primary">{randomLetter}</p>
          <div className="text-lg text-center text-default-500">
            <p>Stadt - Land - Weihnachtliches - Geschenk</p>
          </div>
        </div>
      </BaseModal>
    );
  }

  // Regular challenge step: show the question
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
