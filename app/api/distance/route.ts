import { NextRequest, NextResponse } from "next/server";

// Haversine formula to calculate distance between two points on Earth
function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c); // Distance in meters
}

export async function POST(request: NextRequest) {
  try {
    const { placeId1, placeId2 } = await request.json();

    if (!placeId1 || !placeId2) {
      return NextResponse.json(
        { error: "Both place IDs are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Google Maps API key not configured" },
        { status: 500 }
      );
    }

    // Fetch place details for both places
    const [place1Response, place2Response] = await Promise.all([
      fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId1}&fields=geometry,name&key=${apiKey}`
      ),
      fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId2}&fields=geometry,name&key=${apiKey}`
      ),
    ]);

    const [place1Data, place2Data] = await Promise.all([
      place1Response.json(),
      place2Response.json(),
    ]);

    if (place1Data.status !== "OK" || place2Data.status !== "OK") {
      return NextResponse.json(
        { error: "Failed to fetch place details" },
        { status: 500 }
      );
    }

    const loc1 = place1Data.result.geometry.location;
    const loc2 = place2Data.result.geometry.location;

    const distance = calculateHaversineDistance(
      loc1.lat,
      loc1.lng,
      loc2.lat,
      loc2.lng
    );

    return NextResponse.json({
      distance,
      place1Name: place1Data.result.name,
      place2Name: place2Data.result.name,
    });
  } catch (error) {
    console.error("Distance calculation error:", error);
    return NextResponse.json(
      { error: "Failed to calculate distance" },
      { status: 500 }
    );
  }
}
