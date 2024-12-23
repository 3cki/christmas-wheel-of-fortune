import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDraggable,
} from "@nextui-org/react";
import { useRef } from "react";

export default function QuestionModal({
  isOpen,
  onOpenChange,
  questionType,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  questionType?: string;
}) {
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({
    targetRef,
    isDisabled: !isOpen,
    canOverflow: true,
  });

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      isDismissable={false}
      ref={targetRef}
    >
      <ModalContent className="border border-dotted border-red-400 border-8 rounded-xl">
        {(onClose) => (
          <>
            <ModalHeader
              {...moveProps}
              className="flex flex-col gap-1 text-2xl"
            >
              {questionType || "Leer"}
            </ModalHeader>
            <ModalBody className="flex flex-col gap-8">
              <div className="text-xl">
                <p>Vervollständige die Strophe:</p>
              </div>
              <div className="text-4xl flex flex-col items-center">
                <div className="flex flex-col gap-4">
                  <p>Oh Tannenbaum, oh ___________</p>
                  <p>Wie _____ sind deine ________</p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
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
