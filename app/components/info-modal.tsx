import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function InfoModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>How To</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        isDismissable={false}
        backdrop="opaque"
      >
        <ModalContent className="border border-dotted border-red-400 border-8 rounded-xl">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl">
                How To - Ich dreh am Rad!
              </ModalHeader>
              <ModalBody className="flex flex-col gap-8 text-2xl">
                <p>
                  1. Der Weihnachtsmann bietet ein Präsent zur Versteigerung an
                </p>
                <p>2. Wenn sich mehrere melden, wird das Glücksrad gedreht</p>
                <p>3. Wer als erstes die Aufgabe löst, gewinnt das Präsent</p>
                <p>Teilnehmer mit weniger Präsenten werden bevorzugt</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Schließen
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
