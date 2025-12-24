"use client";

import { useEffect, useRef, useState } from "react";
import { Button, useDraggable } from "@nextui-org/react";
import Image from "next/image";
import { BaseModal } from "./ui/base-modal";
import { useQuestionSelection } from "@/app/hooks/use-question-selection";
import { GameType } from "@/app/config/constants";

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

  const [showAnswer, setShowAnswer] = useState(false);
  const { currentQuestion, selectRandomQuestion, getImageForType } =
    useQuestionSelection();

  // Select a new question when modal opens
  useEffect(() => {
    if (isOpen && questionType) {
      setShowAnswer(false);
      selectRandomQuestion(questionType);
    }
  }, [isOpen, questionType, selectRandomQuestion]);

  const currentImage = questionType ? getImageForType(questionType) : null;

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
          <Button onPress={() => setShowAnswer(true)}>Antwort anzeigen</Button>
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
