import { GameType } from "./constants";
import {
  gedichtQuestions,
  wahrFalschQuestions,
  schaetzenQuestions,
  Question,
} from "@/app/data/questions";
import { StaticImageData } from "next/image";

import TrueFalseImgSrc from "@/public/img/truefalse.png";
import GuessImgSrc from "@/public/img/guess.png";
import StadtLandFlussImgSrc from "@/public/img/sing.png";
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
  stadt_land_fluss: {
    image: StadtLandFlussImgSrc,
    questions: [],
    description:
      "Stadt, Land, Fluss - aber weihnachtlich! Du bekommst einen zufälligen Buchstaben und musst schnell passende Begriffe finden: Eine Stadt, ein Land, etwas Weihnachtliches und ein Geschenk - alles mit dem gleichen Anfangsbuchstaben!",
  },
  schaetzen: {
    image: GuessImgSrc,
    questions: schaetzenQuestions,
    description:
      "Bei dieser Kategorie geht es ums Schätzen. Dir wird eine Frage mit einer Zahl als Antwort gestellt. Wer am nächsten dran ist, gewinnt!",
  },
};
