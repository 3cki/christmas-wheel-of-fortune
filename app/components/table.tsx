"use client";

import { useRef, useState, useMemo } from "react";
import { Button, Input } from "@nextui-org/react";
import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Participant, useGameStore } from "@/app/state/game-store";
import clsx from "clsx";

export default function Table() {
  const { participants } = useGameStore();

  // Sort participants by gifts (descending)
  const sortedParticipants = useMemo(() => {
    return [...participants].sort((a, b) => b.gifts - a.gifts);
  }, [participants]);

  return (
    <div className="w-2/5 p-4 bg-white rounded-lg border border-dotted border-red-400 border-8">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left py-2 px-2 w-12">#</th>
            <th className="text-left py-2 px-2">Name</th>
            <th className="text-center py-2 px-2">Geschenke</th>
            <th className="text-right py-2 px-2 w-12"></th>
          </tr>
        </thead>
        <tbody>
          {sortedParticipants.map((participant, index) => (
            <ParticipantRow
              key={participant.id}
              participant={participant}
              rank={index + 1}
            />
          ))}
        </tbody>
      </table>
      <AddParticipantRow />
    </div>
  );
}

function ParticipantRow({
  participant,
  rank,
}: {
  participant: Participant;
  rank: number;
}) {
  const { removeParticipant, increaseGifts, decreaseGifts } = useGameStore();

  const getRankEmoji = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank.toString();
  };

  return (
    <tr
      className={clsx(
        "border-b border-gray-100 transition-colors",
        participant.gifts <= 0 && "bg-red-50"
      )}
    >
      <td className="py-2 px-2 text-xl">{getRankEmoji(rank)}</td>
      <td className="py-2 px-2 font-medium">{participant.name}</td>
      <td className="py-2 px-2">
        <div className="flex items-center justify-center gap-2">
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
          <span className="w-8 text-center font-bold text-lg">
            {participant.gifts}
          </span>
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
      </td>
      <td className="py-2 px-2 text-right">
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
      </td>
    </tr>
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

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  return (
    <form className="flex items-center gap-4 mt-4" onSubmit={handleSubmit}>
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
