import { NextRequest, NextResponse } from "next/server";
import { v2 } from "@google-cloud/translate";

const translate = new v2.Translate();

// Base sentence to translate
const BASE_SENTENCE = "Frohe Weihnachten und ein gutes neues Jahr!";

// Languages to choose from (language code -> display name in German)
const LANGUAGES: Record<string, { name: string; ttsCode: string }> = {
  en: { name: "Englisch", ttsCode: "en-US" },
  fr: { name: "Französisch", ttsCode: "fr-FR" },
  es: { name: "Spanisch", ttsCode: "es-ES" },
  it: { name: "Italienisch", ttsCode: "it-IT" },
  pt: { name: "Portugiesisch", ttsCode: "pt-PT" },
  pl: { name: "Polnisch", ttsCode: "pl-PL" },
  nl: { name: "Niederländisch", ttsCode: "nl-NL" },
  sv: { name: "Schwedisch", ttsCode: "sv-SE" },
  da: { name: "Dänisch", ttsCode: "da-DK" },
  no: { name: "Norwegisch", ttsCode: "nb-NO" },
  fi: { name: "Finnisch", ttsCode: "fi-FI" },
  ru: { name: "Russisch", ttsCode: "ru-RU" },
  uk: { name: "Ukrainisch", ttsCode: "uk-UA" },
  cs: { name: "Tschechisch", ttsCode: "cs-CZ" },
  hu: { name: "Ungarisch", ttsCode: "hu-HU" },
  ro: { name: "Rumänisch", ttsCode: "ro-RO" },
  el: { name: "Griechisch", ttsCode: "el-GR" },
  tr: { name: "Türkisch", ttsCode: "tr-TR" },
  ja: { name: "Japanisch", ttsCode: "ja-JP" },
  ko: { name: "Koreanisch", ttsCode: "ko-KR" },
  zh: { name: "Chinesisch", ttsCode: "cmn-CN" },
  ar: { name: "Arabisch", ttsCode: "ar-XA" },
  hi: { name: "Hindi", ttsCode: "hi-IN" },
  th: { name: "Thailändisch", ttsCode: "th-TH" },
  vi: { name: "Vietnamesisch", ttsCode: "vi-VN" },
  id: { name: "Indonesisch", ttsCode: "id-ID" },
};

export async function GET(request: NextRequest) {
  try {
    // Get optional exclude parameter (to avoid same language twice)
    const excludeLang = request.nextUrl.searchParams.get("exclude");

    // Pick a random language (excluding the specified one if provided)
    const availableLanguages = Object.keys(LANGUAGES).filter(
      (lang) => lang !== excludeLang
    );
    const randomLang =
      availableLanguages[Math.floor(Math.random() * availableLanguages.length)];
    const langInfo = LANGUAGES[randomLang];

    // Translate the sentence using v2 API
    const [translation] = await translate.translate(BASE_SENTENCE, {
      from: "de",
      to: randomLang,
    });

    if (!translation) {
      return NextResponse.json(
        { error: "Translation failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      sentence: translation,
      languageCode: langInfo.ttsCode,
      answer: langInfo.name,
      langKey: randomLang,
    });
  } catch (error) {
    console.error("Translation Error:", error);
    return NextResponse.json(
      { error: "Failed to translate" },
      { status: 500 }
    );
  }
}
