import {
  gedichtQuestions,
  wahrFalschQuestions,
  liederQuestions,
  schaetzenQuestions,
  Question,
} from "@/app/data/questions";
import { CurrentGame } from "@/app/wheeloffortune/page";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDraggable,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

export default function QuestionModal({
  isOpen,
  onOpenChange,
  questionType,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  questionType?: CurrentGame;
}) {
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({
    targetRef,
    isDisabled: !isOpen,
    canOverflow: true,
  });
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowAnswer(false);
    let selectedQuestion;
    switch (questionType) {
      case "gedicht":
        selectedQuestion =
          gedichtQuestions[Math.floor(Math.random() * gedichtQuestions.length)];
        setCurrentQuestion(selectedQuestion);
        break;
      case "wahr_falsch":
        selectedQuestion =
          wahrFalschQuestions[
            Math.floor(Math.random() * wahrFalschQuestions.length)
          ];
        setCurrentQuestion(selectedQuestion);
        break;
      case "lieder":
        selectedQuestion =
          liederQuestions[Math.floor(Math.random() * liederQuestions.length)];
        setCurrentQuestion(selectedQuestion);
        break;
      case "schaetzen":
        selectedQuestion =
          schaetzenQuestions[
            Math.floor(Math.random() * schaetzenQuestions.length)
          ];
        setCurrentQuestion(selectedQuestion);
        break;
      default:
        selectedQuestion = null;
    }
    console.log(selectedQuestion);
  }, [isOpen, questionType]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      isDismissable={false}
      ref={targetRef}
      backdrop="opaque"
    >
      <ModalContent className="border border-dotted border-red-400 border-8 rounded-xl">
        {(onClose) => (
          <>
            <ModalHeader
              {...moveProps}
              className="flex flex-col gap-1 text-2xl"
            >
              {currentQuestion?.label} - Schwierigkeit{" "}
              {currentQuestion?.difficulty} / 10
            </ModalHeader>
            <ModalBody className="flex flex-col gap-8">
              <div className="text-xl">
                <p>{currentQuestion?.description}</p>
              </div>
              <div className="text-4xl flex flex-col items-center">
                <div className="flex flex-col gap-4">
                  {currentQuestion?.lines.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
              {showAnswer && <div>{currentQuestion?.answer}</div>}
            </ModalBody>
            <ModalFooter>
              <Button onPress={() => setShowAnswer(true)}>
                Antwort anzeigen
              </Button>
              <Button color="primary" onPress={onClose}>
                Fertig
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
