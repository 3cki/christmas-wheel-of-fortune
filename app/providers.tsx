"use client";

import { NextUIProvider } from "@nextui-org/react";
import { GoogleMapsProvider } from "./components/providers/google-maps-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <GoogleMapsProvider>{children}</GoogleMapsProvider>
    </NextUIProvider>
  );
}
