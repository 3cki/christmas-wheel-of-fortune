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

  // Split into two columns
  const midpoint = Math.ceil(sortedParticipants.length / 2);
  const leftColumn = sortedParticipants.slice(0, midpoint);
  const rightColumn = sortedParticipants.slice(midpoint);

  return (
    <div className="w-1/2 p-4 bg-white rounded-lg border border-dotted border-red-400 border-8 flex flex-col max-h-[calc(100vh-120px)]">
      <div className="flex gap-4 overflow-y-auto flex-1">
        {/* Left Column */}
        <div className="flex-1">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-2 w-10">#</th>
                <th className="text-left py-2 px-2">Name</th>
                <th className="text-center py-2 px-2">Geschenke</th>
                <th className="w-8"></th>
              </tr>
            </thead>
            <tbody>
              {leftColumn.map((participant, index) => (
                <ParticipantRow
                  key={participant.id}
                  participant={participant}
                  rank={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-200" />

        {/* Right Column */}
        <div className="flex-1">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-2 w-10">#</th>
                <th className="text-left py-2 px-2">Name</th>
                <th className="text-center py-2 px-2">Geschenke</th>
                <th className="w-8"></th>
              </tr>
            </thead>
            <tbody>
              {rightColumn.map((participant, index) => (
                <ParticipantRow
                  key={participant.id}
                  participant={participant}
                  rank={midpoint + index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
      <td className="py-1.5 px-2 text-base w-10">{getRankEmoji(rank)}</td>
      <td className="py-1.5 px-2 font-medium truncate max-w-[100px]">{participant.name}</td>
      <td className="py-1.5 px-2">
        <div className="flex items-center justify-center gap-1.5">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            color="danger"
            className="min-w-6 w-6 h-6"
            onPress={() => decreaseGifts(participant.id)}
            aria-label={`Decrease gifts for ${participant.name}`}
          >
            <MinusIcon className="h-3.5 w-3.5" />
          </Button>
          <span className="w-6 text-center font-bold">
            {participant.gifts}
          </span>
          <Button
            isIconOnly
            size="sm"
            color="primary"
            className="min-w-6 w-6 h-6"
            onPress={() => increaseGifts(participant.id)}
            aria-label={`Increase gifts for ${participant.name}`}
          >
            <PlusIcon className="h-3.5 w-3.5" />
          </Button>
        </div>
      </td>
      <td className="py-1.5 px-2">
        <Button
          isIconOnly
          size="sm"
          color="danger"
          variant="flat"
          className="min-w-6 w-6 h-6"
          onPress={() => removeParticipant(participant.id)}
          aria-label={`Remove ${participant.name}`}
        >
          <TrashIcon className="h-3.5 w-3.5" />
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
    <form className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200" onSubmit={handleSubmit}>
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
