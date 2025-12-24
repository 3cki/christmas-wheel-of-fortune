export type Question = {
  label: string;
  description: string;
  lines: string[];
  difficulty: number;
  answer: string;
};

export const gedichtQuestions: Question[] = [
  {
    label: "Oh Tannenbaum",
    description: "Vervollständige die Strophe",
    lines: ["Oh Tannenbaum, oh __________", "Wie ____ sind deine _______"],
    answer: "Oh Tannenbaum, oh Tannenbaum - Wie grün sind deine Blätter",
    difficulty: 1,
  },
  {
    label: "Advent, Advent",
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
    label: "Von drauß",
    description: "Vervollständige die Strophe",
    lines: [
      "Von drauß von der Waldseite komme ich her;",
      "___ ____ ____ _____, __ ___________ ____!",
    ],
    answer: "Ich muss euch sagen, es weihnachtet sehr!",
    difficulty: 2,
  },
  {
    label: "Fröhliche Weihnacht",
    description: "Vervollständige die Strophe",
    lines: [
      "Fröhliche Weihnacht überall!",
      "_____ _____ ___ _____ ______ ______.",
    ],
    answer: "Tönet durch die Lüfte froher Schall.",
    difficulty: 4,
  },
  {
    label: "Ihr Kinderlein",
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
  {
    label: "Weihnachstbäckerei",
    description: "Vervollständige die Strophe",
    lines: [
      "In der Weihnachtsbäckerei gibt es manche Leckerei.",
      "Zwischen Mehl und Milch macht so mancher Knilch ____ ___________ _________.",
    ],
    answer: "eine riesengroße Kleckerei.",
    difficulty: 6,
  },
];

export const wahrFalschQuestions: Question[] = [
  {
    label: "Farbe von Santa",
    description: "Stimmt das?",
    lines: ["Der Weihnachtsmann trägt traditionell eine grüne Kleidung."],
    answer: "Falsch",
    difficulty: 1,
  },
  {
    label: "Nikolaus",
    description: "Stimmt das?",
    lines: ["Die Figur des Weihnachtsmanns basiert auf dem heiligen Nikolaus."],
    answer: "Wahr",
    difficulty: 5,
  },
  {
    label: "Weihnachtskarten",
    description: "Stimmt das?",
    lines: [
      "In Großbritannien wurde die Tradition, Weihnachtskarten zu verschicken, erfunden.",
    ],
    answer: "Wahr",
    difficulty: 6,
  },
  {
    label: "Weihnachtsstern",
    description: "Stimmt das?",
    lines: [
      "Der Weihnachtsstern ist eine Pflanze, die oft zur Dekoration verwendet wird.",
    ],
    answer: "Wahr",
    difficulty: 2,
  },
  {
    label: "Hexe Befana",
    description: "Stimmt das?",
    lines: ["In Italien bringt die Hexe Buffala Geschenke zu Weihnachten."],
    answer: "Falsch",
    difficulty: 7,
  },
  {
    label: "Ziegenbock",
    description: "Stimmt das?",
    lines: [
      "In Schweden wird Weihnachten mit einem riesigen Ziegenbock aus Stroh gefeiert.",
    ],
    answer: "Wahr",
    difficulty: 8,
  },
  {
    label: "Adventskranz",
    description: "Stimmt das?",
    lines: ["Der Adventskranz wurde erstmals in Italien erfunden."],
    answer: "Falsch",
    difficulty: 9,
  },
  {
    label: "Rudolf",
    description: "Stimmt das?",
    lines: [
      "Rentier Rudolf wurde bereits im Mittelalter als Teil der Weihnachtsgeschichte erwähnt.",
    ],
    answer: "Falsch",
    difficulty: 3,
  },
  {
    label: "Lichtfest",
    description: "Stimmt das?",
    lines: [
      "Der Begriff 'Weihnachten' leitet sich vom altrömischen Wort für 'Lichtfest' ab.",
    ],
    answer: "Falsch",
    difficulty: 10,
  },
  {
    label: "Römer",
    description: "Stimmt das?",
    lines: ["Weihnachtsmärkte gibt es seit der Römerzeit."],
    answer: "Falsch",
    difficulty: 4,
  },
];

export const schaetzenQuestions: Question[] = [
  {
    label: "Stille Nacht",
    description: "Was denkst du?",
    lines: [
      "In welchem Jahr wurde das Lied 'Stille Nacht' erstmals aufgeführt?",
    ],
    answer: "1818",
    difficulty: 4,
  },
  {
    label: "Rentiere",
    description: "Was denkst du?",
    lines: [
      "In welchem Jahr wurde Coca-Colas berühmte Weihnachtsmann-Werbekampagne erstmals veröffentlicht?",
    ],
    answer: "1931",
    difficulty: 8,
  },
  {
    label: "Weihnachtsbaum",
    description: "Was denkst du?",
    lines: [
      "Wie hoch war der größte jemals aufgestellte Weihnachtsbaum? (in Metern)",
    ],
    answer: "67,36 Meter (1967 in Seattle, USA)",
    difficulty: 5,
  },
  {
    label: "Feiertag",
    description: "Was denkst du?",
    lines: ["Wie viele Kilo Lebkuchen werden jährlich in Nürnberg produziert?"],
    answer: "c.a. 160.000 kg",
    difficulty: 7,
  },
  {
    label: "Adventskalender",
    description: "Was denkst du?",
    lines: [
      "Wie viele Liter Glühwein werden jährlich in Deutschland getrunken?",
    ],
    answer: "c.a. 50 Millionen",
    difficulty: 3,
  },
  {
    label: "Schoko-Kalender",
    description: "Was denkst du?",
    lines: [
      "Wie viele Briefe an den Weihnachtsmann werden in Deutschland jedes Jahr verschickt?",
    ],
    answer: "c.a. 600.000",
    difficulty: 10,
  },
  {
    label: "Weihnachtsbäume",
    description: "Was denkst du?",
    lines: [
      "Wie viele Weihnachtsbäume werden in Deutschland jedes Jahr verkauft?",
    ],
    answer: "c.a. 29 Millionen",
    difficulty: 2,
  },
  {
    label: "Budget",
    description: "Was denkst du?",
    lines: [
      "Wie viel Geld wird in Deutschland durchschnittlich pro Haushalt für Weihnachtsgeschenke ausgegeben?",
    ],
    answer: "c.a. 530 Euro",
    difficulty: 1,
  },
  {
    label: "Baum",
    description: "Was denkst du?",
    lines: [
      "Wie viele TAGE vor Weihnachten beginnt traditionell die Adventszeit?",
    ],
    answer: "22 - 28 Tage",
    difficulty: 6,
  },
];
