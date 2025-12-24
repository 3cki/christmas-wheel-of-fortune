import { COLORS, GameType } from "./constants";

export interface SliceConfig {
  color: string;
  label: string;
  type: GameType;
}

// Base slices (4 categories)
const BASE_SLICES: SliceConfig[] = [
  { color: COLORS.gedicht, label: "Vervollständige", type: "gedicht" },
  { color: COLORS.berlin_foto, label: "Wo in Berlin?", type: "berlin_foto" },
  { color: COLORS.stadt_land_fluss, label: "Stadt Land Fluss", type: "stadt_land_fluss" },
  { color: COLORS.schaetzen, label: "Schätzen", type: "schaetzen" },
];

// Full wheel with repeated slices (8 total)
export const WHEEL_SLICES: SliceConfig[] = [...BASE_SLICES, ...BASE_SLICES];
