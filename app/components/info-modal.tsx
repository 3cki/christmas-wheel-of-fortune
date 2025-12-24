"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import { BaseModal } from "./ui/base-modal";

export default function InfoModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>How To</Button>
      <BaseModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="How To - Santa's Spin"
        size="4xl"
      >
        <div className="flex flex-col gap-8 text-2xl">
          <p>1. Der Weihnachtsmann bringt ein Geschenk zur Versteigerung.</p>
          <p>
            2. Wenn mehrere Teilnehmer interessiert sind, wird das Glücksrad
            gedreht.
          </p>
          <p>
            3. Wer sich zuerst meldet, darf versuchen, die Aufgabe zu lösen. Ist
            die Lösung falsch, kommt der nächste dran. Der letzte Teilnehmer
            gewinnt automatisch.
          </p>
          <p>
            Nachschlagen ist erlaubt – es zählt die Geschwindigkeit! Meldet ihr
            euch gleichzeitig, hat derjenige mit weniger Geschenken Vorrang.
          </p>
          <p>
            Ist ein Name auf dem Geschenk, muss dieser trotzdem eine Aufgabe
            lösen.
          </p>
        </div>
      </BaseModal>
    </>
  );
}
