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

      // Read usedQuestionIds directly from store to avoid dependency
      const usedQuestionIds = useGameStore.getState().usedQuestionIds;

      // Filter out already used questions
      const availableQuestions = questions.filter(
        (q) => !usedQuestionIds.includes(getQuestionId(q))
      );

      // If all questions used, use full pool (allows cycling)
      const pool =
        availableQuestions.length > 0 ? availableQuestions : questions;

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

  return {
    currentQuestion,
    selectRandomQuestion,
    getImageForType,
  };
}
