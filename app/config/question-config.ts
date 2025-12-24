import { GameType } from "./constants";
import {
  berlinFotoQuestions,
  entfernungQuestions,
  spracheQuestions,
  Question,
} from "@/app/data/questions";
import { StaticImageData } from "next/image";

import BerlinFotoImgSrc from "@/public/img/truefalse.png";
import SongRatenImgSrc from "@/public/img/guess.png";
import StadtLandFlussImgSrc from "@/public/img/sing.png";
import MontagsmalerImgSrc from "@/public/img/complete.png";
import EntfernungImgSrc from "@/public/img/guess.png";
import SpracheImgSrc from "@/public/img/complete.png";

export interface QuestionTypeConfig {
  image: StaticImageData;
  questions: Question[];
  description: string;
}

export const QUESTION_TYPE_CONFIG: Record<GameType, QuestionTypeConfig> = {
  song_raten: {
    image: SongRatenImgSrc,
    questions: [],
    description:
      "Ohren gespitzt! Ein Song wird abgespielt und ihr müsst erraten, welcher es ist. Wer den Titel und Interpreten zuerst nennt, gewinnt!",
  },
  berlin_foto: {
    image: BerlinFotoImgSrc,
    questions: berlinFotoQuestions,
    description:
      "Erkennst du Berlin? Dir wird ein Foto von einem Ort in Berlin gezeigt. Rate, wo genau das Foto aufgenommen wurde!",
  },
  stadt_land_fluss: {
    image: StadtLandFlussImgSrc,
    questions: [],
    description:
      "Stadt, Land, Fluss - aber weihnachtlich! Du bekommst einen zufälligen Buchstaben und musst schnell passende Begriffe finden: Eine Stadt, ein Land und etwas Weihnachtliches - alles mit dem gleichen Anfangsbuchstaben!",
  },
  montagsmaler: {
    image: MontagsmalerImgSrc,
    questions: [],
    description:
      "Zeit zum Malen! Eine Person malt einen Begriff und die anderen müssen erraten, was es ist. Dabei darf nicht gesprochen oder geschrieben werden - nur malen!",
  },
  entfernung_raten: {
    image: EntfernungImgSrc,
    questions: entfernungQuestions,
    description:
      "Wie weit ist es? Zwei Orte in Berlin werden genannt und ihr müsst die Entfernung in Metern schätzen. Wer am nächsten dran ist, gewinnt!",
  },
  sprache_raten: {
    image: SpracheImgSrc,
    questions: spracheQuestions,
    description:
      "Sprachtalent gefragt! Ein Satz wird in einer fremden Sprache angezeigt. Erkennt ihr, welche Sprache das ist?",
  },
};
