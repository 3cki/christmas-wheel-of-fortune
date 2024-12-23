export type Question = {
  label: string;
  description: string;
  lines: string[];
  difficulty: number;
};

export const gedichtQuestions: Question[] = [
  {
    label: "Gedicht: Oh Tannenbaum",
    description: "Vervollständige die Strophe",
    lines: ["Oh Tannenbaum, oh __________", "Wie ____ sind deine _______"],
    difficulty: 1,
  },
];

export const wahrFalschQuestions: Question[] = [
  {
    label: "Wahr / Falsch: Schuhgröße",
    description: "Stimmt das?",
    lines: ["Der Weihnachtsmann trägt Schuhgröße 50"],
    difficulty: 10,
  },
];

export const liederQuestions: Question[] = [
  {
    label: "Lieder trällern: Oh Tannenbaum",
    description: "Träller!",
    lines: ["Singe als erster 'Oh Tannenbaum'!"],
    difficulty: 4,
  },
];

export const schaetzenQuestions: Question[] = [
  {
    label: "Schätzen: Tannenbäume",
    description: "Was denkst du?",
    lines: ["Wie viele Weihnachtsbäume gibt es?"],
    difficulty: 10,
  },
];
