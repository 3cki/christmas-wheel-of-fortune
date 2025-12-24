// Game type definitions
export const GAME_TYPES = [
  "gedicht",
  "berlin_foto",
  "stadt_land_fluss",
  "schaetzen",
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
  gedicht: "#cf4762", // Red
  berlin_foto: "#308060", // Green
  stadt_land_fluss: "#1683b0", // Blue
  schaetzen: "#c57e4d", // Orange/Brown
} as const;

// Game type labels for display
export const GAME_TYPE_LABELS: Record<GameType, string> = {
  gedicht: "Vervollständige",
  berlin_foto: "Wo in Berlin?",
  stadt_land_fluss: "Stadt Land Fluss",
  schaetzen: "Schätzen",
};
