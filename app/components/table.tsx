import { Button, Input } from "@nextui-org/react";
import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Participant, useParticipantsStore } from "@/app/state/participants";
import { useState } from "react";

export default function Table() {
  const { participants, addParticipant } = useParticipantsStore();
  const [newParticipantName, setNewParticipantName] = useState("");

  return (
    <div className="w-1/3 p-4 bg-white rounded grid grid-cols-4 gap-4">
      <div className="font-bold">Name</div>
      <div className="font-bold">Geschenke</div>
      <div className="font-bold">Name</div>
      <div className="font-bold">Geschenke</div>
      {participants.map((participant) => (
        <ParticipantRow participant={participant} key={participant.id} />
      ))}
      <Input
        variant="bordered"
        value={newParticipantName}
        onChange={(e) => setNewParticipantName(e.target.value)}
      />
      <Button onPress={() => addParticipant(newParticipantName)}>
        Teilnehmer hinzufügen
      </Button>
    </div>
  );
}

function ParticipantRow({ participant }: { participant: Participant }) {
  const { removeParticipant, increaseGifts, decreaseGifts } =
    useParticipantsStore();

  return (
    <>
      <div>
        <Button
          isIconOnly
          startContent={<TrashIcon className="h-6 w-6" />}
          onPress={() => removeParticipant(participant.id)}
        />
        {participant.name}
      </div>
      <div>
        <Button
          isIconOnly
          startContent={<MinusIcon className="h-6 w-6" />}
          onPress={() => decreaseGifts(participant.id)}
        />
        {participant.gifts}
        <Button
          isIconOnly
          startContent={<PlusIcon className="h-6 w-6" />}
          onPress={() => increaseGifts(participant.id)}
        />
      </div>
    </>
  );
}
