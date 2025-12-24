export type Question = {
  label: string;
  description: string;
  lines: string[];
  difficulty: number;
  answer: string;
};

import berlinData from "./berlin.json";
import distancesData from "./distances.json";
import languagesData from "./languages.json";

// Berlin photo questions - generated from berlin.json
export const berlinFotoQuestions: Question[] = Object.entries(berlinData).map(
  ([key, mapsLink], index) => ({
    label: `Foto ${index + 1}`,
    description: "Wo in Berlin ist das?",
    lines: [`/img/berlin/${key}.png`],
    answer: mapsLink,
    difficulty: index + 1,
  })
);

// Distance guessing questions - generated from distances.json
export const entfernungQuestions: Question[] = distancesData.map(
  (item, index) => ({
    label: `${item.from} → ${item.to}`,
    description: "Wie weit ist es Luftlinie?",
    lines: [item.from, item.to],
    answer: `${item.distance} Meter`,
    difficulty: index + 1,
  })
);

// Language guessing questions - generated from languages.json
// lines[0] = sentence, lines[1] = languageCode for TTS
export const spracheQuestions: Question[] = languagesData.map(
  (item, index) => ({
    label: `Sprache ${index + 1}`,
    description: "Welche Sprache ist das?",
    lines: [item.sentence, item.languageCode],
    answer: item.language,
    difficulty: index + 1,
  })
);
