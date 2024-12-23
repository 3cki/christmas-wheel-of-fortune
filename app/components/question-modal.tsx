import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export default function QuestionModal({
  isOpen,
  onOpenChange,
  questionType,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  questionType?: string;
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent className="border border-dotted border-red-400 border-8 rounded-xl">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl">
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
