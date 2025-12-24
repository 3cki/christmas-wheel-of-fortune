import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SliceConfig } from "@/app/config/wheel-config";
import { Question } from "@/app/data/questions";

// Participant types and state
export interface Participant {
  id: string;
  name: string;
  gifts: number;
}

interface GameState {
  // Participant state
  participants: Participant[];
  addParticipant: (name: string) => void;
  removeParticipant: (id: string) => void;
  increaseGifts: (id: string) => void;
  decreaseGifts: (id: string) => void;

  // Game state (moved from page.tsx useState)
  isSpinning: boolean;
  selectedSlice: SliceConfig | null;
  currentQuestion: Question | null;
  usedQuestionIds: string[];

  // Game actions
  startSpin: () => void;
  endSpin: (slice: SliceConfig) => void;
  setCurrentQuestion: (question: Question) => void;
  markQuestionUsed: (questionId: string) => void;
  resetUsedQuestions: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      // Participant state
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

      // Game state
      isSpinning: false,
      selectedSlice: null,
      currentQuestion: null,
      usedQuestionIds: [],

      startSpin: () =>
        set({
          isSpinning: true,
        }),

      endSpin: (slice: SliceConfig) =>
        set({
          isSpinning: false,
          selectedSlice: slice,
        }),

      setCurrentQuestion: (question: Question) =>
        set({
          currentQuestion: question,
        }),

      markQuestionUsed: (questionId: string) =>
        set((state) => ({
          usedQuestionIds: [...state.usedQuestionIds, questionId],
        })),

      resetUsedQuestions: () =>
        set({
          usedQuestionIds: [],
        }),
    }),
    {
      name: "game-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist participants, not game state
        participants: state.participants,
      }),
    }
  )
);

// Re-export for backwards compatibility during transition
export const useParticipantsStore = useGameStore;
