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
  {
    label: "Gedicht: Advent, Advent",
    description: "Vervollständige die Strophe",
    lines: [
      "Advent, Advent,",
      "Ein Lichtlein brennt.",
      "____ ___, ____ ____,",
      "____ ____, ____ ____.",
    ],
    answer: "Erst ein, dann zwei, dann drei, dann vier.",
    difficulty: 3,
  },
  {
    label: "Gedicht: Von drauß",
    description: "Vervollständige die Strophe",
    lines: [
      "Von drauß vom Walde komm' ich her;",
      "___ ____ ____ _____, __ ___________ ____!",
    ],
    answer: "Ich muss euch sagen, es weihnachtet sehr!",
    difficulty: 2,
  },
  {
    label: "Gedicht: Fröhliche Weihnacht",
    description: "Vervollständige die Strophe",
    lines: [
      "Fröhliche Weihnacht überall!",
      "_____ _____ ___ _____ ______ ______.",
    ],
    answer: "Tönet durch die Lüfte froher Schall.",
    difficulty: 4,
  },
  {
    label: "Gedicht: Ihr Kinderlein",
    description: "Vervollständige die Strophe",
    lines: [
      "Ihr Kinderlein, kommet,",
      "o kommet doch all!",
      "___ ______ ___ ______",
      "__ __________ _____",
    ],
    answer: "Zur Krippe her kommet in Bethlehems Stall",
    difficulty: 5,
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
    label: "Lied: Oh Tannenbaum",
    description: "Träller!",
    lines: ["Singe die erste Strophe von 'Oh Tannenbaum'!"],
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
