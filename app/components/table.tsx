"use client";

import { useRef, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Participant, useGameStore } from "@/app/state/game-store";
import clsx from "clsx";

export default function Table() {
  const { participants } = useGameStore();

  return (
    <div className="w-3/5 p-4 bg-white rounded-lg grid grid-cols-3 gap-2 border border-dotted border-red-400 border-8">
      <Header />
      {participants.map((participant) => (
        <ParticipantRow participant={participant} key={participant.id} />
      ))}
      <AddParticipantRow />
    </div>
  );
}

function Header() {
  return (
    <>
      <HeaderCell label="Name" />
      <HeaderCell label="Geschenke" />
      <HeaderCell label="" />
    </>
  );
}

function HeaderCell({ label }: { label: string }) {
  return <div className="font-bold text-center">{label}</div>;
}

function ParticipantRow({ participant }: { participant: Participant }) {
  const { removeParticipant, increaseGifts, decreaseGifts } = useGameStore();

  return (
    <div
      className={clsx(
        "flex items-center justify-between rounded p-2 gap-4 w-full",
        participant.gifts <= 0 && "bg-red-100"
      )}
    >
      <div className="flex items-center gap-2">
        <Button
          isIconOnly
          size="sm"
          color="danger"
          variant="flat"
          onPress={() => removeParticipant(participant.id)}
          aria-label={`Remove ${participant.name}`}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
        {participant.name}
      </div>
      <div className="flex items-center gap-2">
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          color="danger"
          onPress={() => decreaseGifts(participant.id)}
          aria-label={`Decrease gifts for ${participant.name}`}
        >
          <MinusIcon className="h-4 w-4" />
        </Button>
        {participant.gifts}
        <Button
          isIconOnly
          size="sm"
          color="primary"
          onPress={() => increaseGifts(participant.id)}
          aria-label={`Increase gifts for ${participant.name}`}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function AddParticipantRow() {
  const { addParticipant } = useGameStore();
  const [newParticipantName, setNewParticipantName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newParticipantName.trim()) return;

    addParticipant(newParticipantName);
    setNewParticipantName("");

    // Use ref instead of document.getElementById
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  return (
    <form className="col-span-3 flex items-center gap-4" onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
        variant="bordered"
        autoFocus
        value={newParticipantName}
        onChange={(e) => setNewParticipantName(e.target.value)}
        placeholder="Name eingeben"
        aria-label="New participant name"
      />
      <Button color="primary" variant="flat" type="submit">
        Hinzufügen
      </Button>
    </form>
  );
}
