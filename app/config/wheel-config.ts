import { COLORS, GameType } from "./constants";

export interface SliceConfig {
  color: string;
  label: string;
  type: GameType;
}

// Base slices (6 categories)
const BASE_SLICES: SliceConfig[] = [
  { color: COLORS.song_raten, label: "Song Raten", type: "song_raten" },
  { color: COLORS.berlin_foto, label: "Wo in Berlin?", type: "berlin_foto" },
  { color: COLORS.stadt_land_fluss, label: "Stadt Land Fluss", type: "stadt_land_fluss" },
  { color: COLORS.montagsmaler, label: "Montagsmaler", type: "montagsmaler" },
  { color: COLORS.entfernung_raten, label: "Entfernung Raten", type: "entfernung_raten" },
  { color: COLORS.sprache_raten, label: "Sprache Raten", type: "sprache_raten" },
];

// Full wheel with repeated slices (12 total)
export const WHEEL_SLICES: SliceConfig[] = [...BASE_SLICES, ...BASE_SLICES];
