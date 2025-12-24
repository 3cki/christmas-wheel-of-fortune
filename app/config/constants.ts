// Game type definitions
export const GAME_TYPES = [
  "song_raten",
  "berlin_foto",
  "stadt_land_fluss",
  "montagsmaler",
  "entfernung_raten",
  "sprache_raten",
] as const;

export type GameType = (typeof GAME_TYPES)[number];

// Wheel configuration
export const WHEEL_CONFIG = {
  SPIN_DURATION_MS: 4000,
  MIN_SPIN_DEGREES: 360,
  TRANSITION_TIMING: "cubic-bezier(0.2, -0.17, 0, 1.03)",
} as const;

// Wheel slice colors (Christmas palette)
export const COLORS = {
  song_raten: "#cf4762", // Red
  berlin_foto: "#308060", // Green
  stadt_land_fluss: "#1683b0", // Blue
  montagsmaler: "#c57e4d", // Orange/Brown
  entfernung_raten: "#9b59b6", // Purple
  sprache_raten: "#e67e22", // Orange
} as const;

// Game type labels for display
export const GAME_TYPE_LABELS: Record<GameType, string> = {
  song_raten: "Song Raten",
  berlin_foto: "Wo in Berlin?",
  stadt_land_fluss: "Stadt Land Fluss",
  montagsmaler: "Montagsmaler",
  entfernung_raten: "Entfernung Raten",
  sprache_raten: "Sprache Raten",
};
