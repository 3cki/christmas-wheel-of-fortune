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
  description: string;
}

export const QUESTION_TYPE_CONFIG: Record<GameType, QuestionTypeConfig> = {
  gedicht: {
    image: CompleteImgSrc,
    questions: gedichtQuestions,
    description:
      "Bei dieser Kategorie bekommst du den Anfang eines bekannten Weihnachtsgedichts oder -lieds. Deine Aufgabe ist es, die fehlenden Wörter zu ergänzen. Zeig, wie gut du die Klassiker kennst!",
  },
  wahr_falsch: {
    image: TrueFalseImgSrc,
    questions: wahrFalschQuestions,
    description:
      "Dir wird eine Aussage über Weihnachten präsentiert. Entscheide, ob sie wahr oder falsch ist. Manchmal ist es kniffliger als gedacht!",
  },
  lieder: {
    image: SingImgSrc,
    questions: liederQuestions,
    description:
      "Jetzt wird gesungen! Du bekommst den Namen eines Weihnachtslieds und sollst die erste Strophe zum Besten geben. Trau dich - es geht um den Spaß!",
  },
  schaetzen: {
    image: GuessImgSrc,
    questions: schaetzenQuestions,
    description:
      "Bei dieser Kategorie geht es ums Schätzen. Dir wird eine Frage mit einer Zahl als Antwort gestellt. Wer am nächsten dran ist, gewinnt!",
  },
};
