import { GameType } from "./constants";
import {
  gedichtQuestions,
  wahrFalschQuestions,
  liederQuestions,
  schaetzenQuestions,
  Question,
} from "@/app/data/questions";
import { StaticImageData } from "next/image";

import TrueFalseImgSrc from "@/public/img/truefalse.png";
import GuessImgSrc from "@/public/img/guess.png";
import SingImgSrc from "@/public/img/sing.png";
import CompleteImgSrc from "@/public/img/complete.png";

export interface QuestionTypeConfig {
  image: StaticImageData;
  questions: Question[];
}

export const QUESTION_TYPE_CONFIG: Record<GameType, QuestionTypeConfig> = {
  gedicht: {
    image: CompleteImgSrc,
    questions: gedichtQuestions,
  },
  wahr_falsch: {
    image: TrueFalseImgSrc,
    questions: wahrFalschQuestions,
  },
  lieder: {
    image: SingImgSrc,
    questions: liederQuestions,
  },
  schaetzen: {
    image: GuessImgSrc,
    questions: schaetzenQuestions,
  },
};
