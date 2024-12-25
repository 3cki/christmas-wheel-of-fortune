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
                How To - Santa&apos;s Spin
              </ModalHeader>
              <ModalBody className="flex flex-col gap-8 text-2xl">
                <p>
                  1. Der Weihnachtsmann bringt ein Geschenk zur Versteigerung.
                  🎁
                </p>
                <p>
                  2. Wenn mehrere Teilnehmer interessiert sind, wird das
                  Glücksrad gedreht. 🎡
                </p>
                <p>
                  3. Wer sich zuerst meldet, darf versuchen, die Aufgabe zu
                  lösen. Ist die Lösung falsch, kommt der nächste dran. Der
                  letzte Teilnehmer gewinnt automatisch. 🎅
                </p>
                <p>
                  Nachschlagen ist erlaubt – es zählt die Geschwindigkeit!
                  Meldet ihr euch gleichzeitig, hat derjenige mit weniger
                  Geschenken Vorrang. 🎁✨
                </p>
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
