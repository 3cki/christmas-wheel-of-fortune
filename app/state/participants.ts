import { create } from "zustand";

export interface Participant {
  id: string;
  name: string;
  gifts: number;
}

interface ParticipantsState {
  participants: Participant[];
  addParticipant: (name: string) => void;
  removeParticipant: (id: string) => void;
  increaseGifts: (id: string) => void;
  decreaseGifts: (id: string) => void;
}

export const useParticipantsStore = create<ParticipantsState>((set) => ({
  participants: [
    {
      id: "1",
      name: "Max",
      gifts: 0,
    },
  ],
  addParticipant: (name: string) =>
    set((state) => ({
      participants: [
        ...state.participants,
        { id: Math.random().toString(), name, gifts: 0 },
      ],
    })),
  removeParticipant: (id: string) =>
    set((state) => ({
      participants: state.participants.filter(
        (participant) => participant.id !== id
      ),
    })),
  increaseGifts: (id: string) =>
    set((state) => ({
      participants: state.participants.map((participant) =>
        participant.id === id
          ? { ...participant, gifts: participant.gifts + 1 }
          : participant
      ),
    })),
  decreaseGifts: (id: string) =>
    set((state) => ({
      participants: state.participants.map((participant) =>
        participant.id === id
          ? { ...participant, gifts: participant.gifts - 1 }
          : participant
      ),
    })),
}));
