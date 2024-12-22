import { Button, Input, Spacer } from "@nextui-org/react";
import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Participant, useParticipantsStore } from "@/app/state/participants";
import { useState } from "react";
import { div } from "framer-motion/client";

export default function Table() {
  const { participants } = useParticipantsStore();

  return (
    <div className="w-1/2 p-4 bg-white rounded-lg grid grid-cols-3 gap-4 border border-dotted border-red-400 border-8">
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
      <HeaderRow />
      <HeaderRow />
      <HeaderRow />
    </>
  );
}

function HeaderRow() {
  return (
    <div className="flex items-center justify-between">
      <div className="font-bold">Name</div>
      <div className="font-bold">Geschenke</div>
    </div>
  );
}

function ParticipantRow({ participant }: { participant: Participant }) {
  const { removeParticipant, increaseGifts, decreaseGifts } =
    useParticipantsStore();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button
          isIconOnly
          size="sm"
          color="danger"
          variant="flat"
          startContent={<TrashIcon className="h-4 w-4" />}
          onPress={() => removeParticipant(participant.id)}
        />
        {participant.name}
      </div>
      <div className="flex items-center gap-2">
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          startContent={<MinusIcon className="h-4 w-4" />}
          onPress={() => decreaseGifts(participant.id)}
        />
        {participant.gifts}
        <Button
          isIconOnly
          size="sm"
          color="primary"
          startContent={<PlusIcon className="h-4 w-4" />}
          onPress={() => increaseGifts(participant.id)}
        />
      </div>
    </div>
  );
}

function AddParticipantRow() {
  const { addParticipant } = useParticipantsStore();
  const [newParticipantName, setNewParticipantName] = useState("");

  return (
    <div className="col-span-3 flex items-center gap-4">
      <Input
        variant="bordered"
        value={newParticipantName}
        onChange={(e) => setNewParticipantName(e.target.value)}
      />
      <Button
        onPress={() => addParticipant(newParticipantName)}
        color="primary"
        variant="flat"
      >
        Hinzufügen
      </Button>
    </div>
  );
}
