"use client";

import { useEffect, useRef } from "react";
import { useGoogleMapsLoaded } from "../providers/google-maps-provider";

interface PlacesAutocompleteProps {
  placeholder?: string;
  onPlaceSelect: (placeId: string, placeName: string) => void;
  isDisabled?: boolean;
}

export function PlacesAutocomplete({
  placeholder = "Ort suchen...",
  onPlaceSelect,
  isDisabled = false,
}: PlacesAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const isGoogleMapsLoaded = useGoogleMapsLoaded();

  useEffect(() => {
    if (!isGoogleMapsLoaded || !inputRef.current || autocompleteRef.current) {
      return;
    }

    console.log("Initializing Places Autocomplete...");

    try {
      autocompleteRef.current = new google.maps.places.Autocomplete(
        inputRef.current,
        {
          fields: ["place_id", "name", "formatted_address"],
        }
      );

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        console.log("Place selected:", place);

        if (place?.place_id && inputRef.current) {
          const displayName = place.name || place.formatted_address || "";
          inputRef.current.value = displayName;
          onPlaceSelect(place.place_id, displayName);
        }
      });

      console.log("Places Autocomplete initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Places Autocomplete:", error);
    }

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, [isGoogleMapsLoaded, onPlaceSelect]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={isGoogleMapsLoaded ? placeholder : "Lädt..."}
      disabled={isDisabled || !isGoogleMapsLoaded}
      onKeyDown={handleKeyDown}
      autoComplete="off"
      className="w-full h-14 px-4 text-lg rounded-xl bg-default-100 hover:bg-default-200 focus:bg-default-100 focus:outline-none focus:ring-2 focus:ring-primary transition-colors disabled:opacity-50"
    />
  );
}
