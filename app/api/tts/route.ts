import { NextRequest, NextResponse } from "next/server";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

const client = new TextToSpeechClient();

export async function POST(request: NextRequest) {
  try {
    const { text, languageCode } = await request.json();

    if (!text || !languageCode) {
      return NextResponse.json(
        { error: "Missing text or languageCode" },
        { status: 400 }
      );
    }

    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: { languageCode, ssmlGender: "NEUTRAL" },
      audioConfig: { audioEncoding: "MP3" },
    });

    if (!response.audioContent) {
      return NextResponse.json(
        { error: "No audio content generated" },
        { status: 500 }
      );
    }

    // Return audio as base64
    const audioBase64 = Buffer.from(response.audioContent).toString("base64");
    return NextResponse.json({ audio: audioBase64 });
  } catch (error) {
    console.error("TTS Error:", error);
    return NextResponse.json(
      { error: "Failed to generate speech" },
      { status: 500 }
    );
  }
}
