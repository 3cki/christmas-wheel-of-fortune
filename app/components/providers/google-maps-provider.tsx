"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const GoogleMapsContext = createContext(false);

export function GoogleMapsProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if already loaded
    if (window.google?.maps?.places) {
      setIsLoaded(true);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.addEventListener("load", () => setIsLoaded(true));
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set");
      return;
    }

    // Load script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log("Google Maps loaded successfully");
      setIsLoaded(true);
    };
    script.onerror = (e) => {
      console.error("Failed to load Google Maps:", e);
    };
    document.head.appendChild(script);

    return () => {
      // Don't remove script on cleanup as it causes issues
    };
  }, []);

  return (
    <GoogleMapsContext.Provider value={isLoaded}>
      {children}
    </GoogleMapsContext.Provider>
  );
}

export function useGoogleMapsLoaded() {
  return useContext(GoogleMapsContext);
}
