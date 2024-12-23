export type Question = {
  label: string;
  description: string;
  lines: string[];
  difficulty: number;
  answer: string;
};

export const gedichtQuestions: Question[] = [
  {
    label: "Gedicht: Oh Tannenbaum",
    description: "Vervollständige die Strophe",
    lines: ["Oh Tannenbaum, oh __________", "Wie ____ sind deine _______"],
    answer: "Oh Tannenbaum, oh Tannenbaum - Wie grün sind deine Blätter",
    difficulty: 1,
  },
];

export const wahrFalschQuestions: Question[] = [
  {
    label: "Wahr / Falsch: Schuhgröße",
    description: "Stimmt das?",
    lines: ["Der Weihnachtsmann trägt Schuhgröße 50"],
    answer: "Falsch",
    difficulty: 10,
  },
];

export const liederQuestions: Question[] = [
  {
    label: "Lieder trällern: Oh Tannenbaum",
    description: "Träller!",
    lines: ["Singe als erster 'Oh Tannenbaum'!"],
    answer:
      "https://www.liederkiste.com/index.php?s=o-tannenbaum-o-tannenbaum&l=de#gsc.tab=0",
    difficulty: 4,
  },
];

export const schaetzenQuestions: Question[] = [
  {
    label: "Schätzen: Tannenbäume",
    description: "Was denkst du?",
    lines: ["Wie viele Weihnachtsbäume gibt es?"],
    answer: "Keine Ahnung",
    difficulty: 10,
  },
];
