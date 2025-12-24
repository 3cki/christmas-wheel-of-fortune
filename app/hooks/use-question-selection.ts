import { useCallback } from "react";
import { useGameStore } from "@/app/state/game-store";
import { QUESTION_TYPE_CONFIG } from "@/app/config/question-config";
import { GameType } from "@/app/config/constants";
import { Question } from "@/app/data/questions";

// Generate a unique ID for a question
function getQuestionId(question: Question): string {
  return `${question.label}-${question.difficulty}`;
}

export function useQuestionSelection() {
  const { currentQuestion, setCurrentQuestion, markQuestionUsed } =
    useGameStore();

  const selectRandomQuestion = useCallback(
    (questionType: GameType): Question | null => {
      const config = QUESTION_TYPE_CONFIG[questionType];
      if (!config) return null;

      const questions = config.questions;
      if (questions.length === 0) return null;

      // Read state directly from store to avoid dependency
      const { usedQuestionIds, currentQuestion: current } =
        useGameStore.getState();
      const currentId = current ? getQuestionId(current) : null;

      // Filter out already used questions AND the current question
      const availableQuestions = questions.filter((q) => {
        const id = getQuestionId(q);
        return !usedQuestionIds.includes(id) && id !== currentId;
      });

      // If no available questions, reset pool but still exclude current
      let pool = availableQuestions;
      if (pool.length === 0) {
        pool = questions.filter((q) => getQuestionId(q) !== currentId);
        // If still empty (only 1 question exists), use all questions
        if (pool.length === 0) {
          pool = questions;
        }
      }

      // Select random question from pool
      const selected = pool[Math.floor(Math.random() * pool.length)];

      // Update store
      setCurrentQuestion(selected);
      markQuestionUsed(getQuestionId(selected));

      return selected;
    },
    [setCurrentQuestion, markQuestionUsed]
  );

  const getImageForType = useCallback((questionType: GameType) => {
    return QUESTION_TYPE_CONFIG[questionType]?.image ?? null;
  }, []);

  const getDescriptionForType = useCallback((questionType: GameType) => {
    return QUESTION_TYPE_CONFIG[questionType]?.description ?? null;
  }, []);

  return {
    currentQuestion,
    selectRandomQuestion,
    getImageForType,
    getDescriptionForType,
  };
}
