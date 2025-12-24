"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Button, useDraggable } from "@nextui-org/react";
import Image from "next/image";
import { BaseModal } from "./ui/base-modal";
import { PlacesAutocomplete } from "./ui/places-autocomplete";
import { useQuestionSelection } from "@/app/hooks/use-question-selection";
import { useGoogleMapsLoaded } from "./providers/google-maps-provider";
import { GameType, GAME_TYPE_LABELS } from "@/app/config/constants";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";

type ModalStep = "intro" | "challenge";

// Letters for Stadt Land Fluss (excluding difficult letters like Q, X, Y)
const STADT_LAND_FLUSS_LETTERS = "ABCDEFGHIKLMNOPRSTUVWZ";

function getRandomLetter(excludeLetter?: string): string {
  const available = excludeLetter
    ? STADT_LAND_FLUSS_LETTERS.replace(excludeLetter, "")
    : STADT_LAND_FLUSS_LETTERS;
  const index = Math.floor(Math.random() * available.length);
  return available[index];
}

// Categories that only show instructions (no specific questions)
const INSTRUCTION_ONLY_CATEGORIES: GameType[] = ["song_raten", "montagsmaler"];

interface QuestionModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  questionType?: GameType;
}

export default function QuestionModal({
  isOpen,
  onOpenChange,
  questionType,
}: QuestionModalProps) {
  const targetRef = useRef<HTMLElement>(null);
  const { moveProps } = useDraggable({
    targetRef,
    isDisabled: !isOpen,
    canOverflow: true,
  });

  const [step, setStep] = useState<ModalStep>("intro");
  const [showAnswer, setShowAnswer] = useState(false);
  const [randomLetter, setRandomLetter] = useState<string>("");
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isLoadingTranslation, setIsLoadingTranslation] = useState(false);
  const [translationData, setTranslationData] = useState<{
    sentence: string;
    languageCode: string;
    answer: string;
    langKey: string;
  } | null>(null);
  const [place1, setPlace1] = useState<{ id: string; name: string } | null>(null);
  const [place2, setPlace2] = useState<{ id: string; name: string } | null>(null);
  const [distanceData, setDistanceData] = useState<{
    distance: number;
    place1Name: string;
    place2Name: string;
  } | null>(null);
  const [isLoadingDistance, setIsLoadingDistance] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isGoogleMapsLoaded = useGoogleMapsLoaded();
  const {
    currentQuestion,
    selectRandomQuestion,
    getImageForType,
    getDescriptionForType,
  } = useQuestionSelection();

  const isStadtLandFluss = questionType === "stadt_land_fluss";
  const isBerlinFoto = questionType === "berlin_foto";
  const isEntfernungRaten = questionType === "entfernung_raten";
  const isSpracheRaten = questionType === "sprache_raten";
  const isInstructionOnly =
    questionType && INSTRUCTION_ONLY_CATEGORIES.includes(questionType);

  // Fetch random translation
  const fetchRandomTranslation = useCallback(async (excludeLang?: string) => {
    setIsLoadingTranslation(true);
    try {
      const url = excludeLang
        ? `/api/translate?exclude=${excludeLang}`
        : "/api/translate";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Translation failed");
      const data = await response.json();
      setTranslationData(data);
    } catch (error) {
      console.error("Failed to fetch translation:", error);
    } finally {
      setIsLoadingTranslation(false);
    }
  }, []);

  // Play TTS audio
  const playAudio = useCallback(async (text: string, languageCode: string) => {
    setIsLoadingAudio(true);
    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, languageCode }),
      });

      if (!response.ok) throw new Error("TTS failed");

      const { audio } = await response.json();
      const audioBlob = new Blob(
        [Uint8Array.from(atob(audio), (c) => c.charCodeAt(0))],
        { type: "audio/mp3" }
      );
      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlayingAudio(false);
      audioRef.current.play();
      setIsPlayingAudio(true);
    } catch (error) {
      console.error("Failed to play audio:", error);
    } finally {
      setIsLoadingAudio(false);
    }
  }, []);

  // Calculate distance between two places
  const calculateDistance = useCallback(async (placeId1: string, placeId2: string) => {
    setIsLoadingDistance(true);
    try {
      const response = await fetch("/api/distance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placeId1, placeId2 }),
      });
      if (!response.ok) throw new Error("Distance calculation failed");
      const data = await response.json();
      setDistanceData(data);
    } catch (error) {
      console.error("Failed to calculate distance:", error);
    } finally {
      setIsLoadingDistance(false);
    }
  }, []);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen && questionType) {
      setStep("intro");
      setShowAnswer(false);
      setRandomLetter("");
      setIsPlayingAudio(false);
      setTranslationData(null);
      setPlace1(null);
      setPlace2(null);
      setDistanceData(null);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    }
  }, [isOpen, questionType]);

  const handleShowChallenge = () => {
    if (questionType) {
      if (isStadtLandFluss) {
        setRandomLetter(getRandomLetter());
      } else if (isSpracheRaten) {
        fetchRandomTranslation();
      } else if (!isInstructionOnly) {
        selectRandomQuestion(questionType);
      }
      setStep("challenge");
      setShowAnswer(false);
    }
  };

  const handleAnotherChallenge = () => {
    if (questionType) {
      if (isStadtLandFluss) {
        setRandomLetter(getRandomLetter(randomLetter));
      } else if (isSpracheRaten) {
        fetchRandomTranslation(translationData?.langKey);
      } else {
        selectRandomQuestion(questionType);
      }
      setShowAnswer(false);
    }
  };

  const currentImage = questionType ? getImageForType(questionType) : null;
  const categoryDescription = questionType
    ? getDescriptionForType(questionType)
    : null;
  const categoryLabel = questionType ? GAME_TYPE_LABELS[questionType] : "";

  // Intro step: show category description
  if (step === "intro") {
    return (
      <BaseModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={categoryLabel}
        size="3xl"
        modalRef={targetRef}
        headerProps={moveProps}
        footer={
          <>
            <Button color="primary" onPress={handleShowChallenge}>
              {isInstructionOnly ? "Los geht's!" : "Aufgabe zeigen"}
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-8 justify-center items-center">
          {currentImage && (
            <Image
              alt=""
              className="fixed left-0 h-2/3 w-auto"
              src={currentImage}
            />
          )}
          <p className="text-2xl text-center max-w-lg">{categoryDescription}</p>
        </div>
      </BaseModal>
    );
  }

  // Instruction-only categories: just show "Los geht's!" confirmation
  if (isInstructionOnly) {
    return (
      <BaseModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={categoryLabel}
        size="3xl"
        modalRef={targetRef}
        headerProps={moveProps}
        footer={
          <>
            <Button color="primary" onPress={() => onOpenChange()}>
              Fertig
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-8 justify-center items-center">
          {currentImage && (
            <Image
              alt=""
              className="fixed left-0 h-2/3 w-auto"
              src={currentImage}
            />
          )}
          <p className="text-6xl font-bold text-primary">Los geht's!</p>
          <p className="text-xl text-center text-default-500">
            {categoryDescription}
          </p>
        </div>
      </BaseModal>
    );
  }

  // Stadt Land Fluss challenge: show random letter
  if (isStadtLandFluss && randomLetter) {
    return (
      <BaseModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Stadt Land Fluss"
        size="3xl"
        modalRef={targetRef}
        headerProps={moveProps}
        footer={
          <>
            <Button color="secondary" onPress={handleAnotherChallenge}>
              Neuer Buchstabe
            </Button>
            <Button color="primary" onPress={() => onOpenChange()}>
              Fertig
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-8 justify-center items-center">
          {currentImage && (
            <Image
              alt=""
              className="fixed left-0 h-2/3 w-auto"
              src={currentImage}
            />
          )}
          <p className="text-xl">Euer Buchstabe ist:</p>
          <p className="text-9xl font-bold text-primary">{randomLetter}</p>
          <div className="text-lg text-center text-default-500">
            <p>Stadt - Land - Weihnachten</p>
          </div>
        </div>
      </BaseModal>
    );
  }

  // Berlin Foto challenge: show photo and Google Maps link
  if (isBerlinFoto && currentQuestion) {
    const photoPath = currentQuestion.lines[0];
    return (
      <BaseModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Wo in Berlin?"
        size="3xl"
        modalRef={targetRef}
        headerProps={moveProps}
        footer={
          <>
            {!showAnswer && (
              <Button onPress={() => setShowAnswer(true)}>Ort zeigen</Button>
            )}
            <Button color="secondary" onPress={handleAnotherChallenge}>
              Anderes Foto
            </Button>
            <Button color="primary" onPress={() => onOpenChange()}>
              Fertig
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-6 justify-center items-center">
          <p className="text-xl">{currentQuestion.description}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Wo in Berlin?"
            className="max-h-[50vh] w-auto rounded-lg shadow-lg"
            src={photoPath}
          />
          {showAnswer && (
            <a
              href={currentQuestion.answer}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline text-xl"
            >
              Auf Google Maps ansehen
            </a>
          )}
        </div>
      </BaseModal>
    );
  }

  // Entfernung Raten challenge: autocomplete inputs for places
  if (isEntfernungRaten && step === "challenge") {
    const handlePlace1Select = (placeId: string, placeName: string) => {
      setPlace1({ id: placeId, name: placeName });
      setDistanceData(null);
      setShowAnswer(false);
      if (place2) {
        calculateDistance(placeId, place2.id);
      }
    };

    const handlePlace2Select = (placeId: string, placeName: string) => {
      setPlace2({ id: placeId, name: placeName });
      setDistanceData(null);
      setShowAnswer(false);
      if (place1) {
        calculateDistance(place1.id, placeId);
      }
    };

    const handleReset = () => {
      setPlace1(null);
      setPlace2(null);
      setDistanceData(null);
      setShowAnswer(false);
    };

    const formatDistance = (meters: number): string => {
      if (meters >= 1000) {
        return `${(meters / 1000).toFixed(1)} km`;
      }
      return `${meters} m`;
    };

    return (
      <BaseModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Entfernung Raten"
        size="3xl"
        modalRef={targetRef}
        headerProps={moveProps}
        footer={
          <>
            {!showAnswer && distanceData && (
              <Button onPress={() => setShowAnswer(true)}>
                Entfernung zeigen
              </Button>
            )}
            <Button
              color="secondary"
              onPress={handleReset}
              isDisabled={!place1 && !place2}
            >
              Neu starten
            </Button>
            <Button color="primary" onPress={() => onOpenChange()}>
              Fertig
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-6 justify-center items-center">
          <p className="text-xl">Wie weit ist es Luftlinie?</p>
          {isGoogleMapsLoaded ? (
            <div className="flex flex-col gap-4 w-full max-w-md">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-default-500">Von:</label>
                <PlacesAutocomplete
                  placeholder="Ersten Ort eingeben..."
                  onPlaceSelect={handlePlace1Select}
                />
              </div>
              <div className="flex justify-center">
                <span className="text-2xl">↓</span>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-default-500">Nach:</label>
                <PlacesAutocomplete
                  placeholder="Zweiten Ort eingeben..."
                  onPlaceSelect={handlePlace2Select}
                />
              </div>
            </div>
          ) : (
            <p className="text-default-500">Lade Google Maps...</p>
          )}
          {isLoadingDistance && (
            <p className="text-default-500">Berechne Entfernung...</p>
          )}
          {showAnswer && distanceData && (
            <div className="flex flex-col items-center gap-2 mt-4">
              <p className="text-lg text-default-500">Luftlinie:</p>
              <p className="text-5xl font-bold text-primary">
                {formatDistance(distanceData.distance)}
              </p>
            </div>
          )}
        </div>
      </BaseModal>
    );
  }

  // Sprache Raten challenge: play audio, guess language
  if (isSpracheRaten && step === "challenge") {
    return (
      <BaseModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Sprache Raten"
        size="3xl"
        modalRef={targetRef}
        headerProps={moveProps}
        footer={
          <>
            {!showAnswer && translationData && (
              <Button onPress={() => setShowAnswer(true)}>
                Sprache zeigen
              </Button>
            )}
            <Button
              color="secondary"
              onPress={handleAnotherChallenge}
              isDisabled={isLoadingTranslation}
            >
              Andere Sprache
            </Button>
            <Button color="primary" onPress={() => onOpenChange()}>
              Fertig
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-8 justify-center items-center py-8">
          <p className="text-xl">Welche Sprache ist das?</p>
          {isLoadingTranslation ? (
            <div className="flex flex-col items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-default-200 animate-pulse" />
              <p className="text-lg text-default-500">Übersetze...</p>
            </div>
          ) : translationData ? (
            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                color="primary"
                isIconOnly
                isLoading={isLoadingAudio}
                onPress={() =>
                  playAudio(translationData.sentence, translationData.languageCode)
                }
                className="h-20 w-20 min-w-0 rounded-full"
              >
                {!isLoadingAudio && <SpeakerWaveIcon className="h-10 w-10" />}
              </Button>
              <p className="text-lg text-default-500">
                {isPlayingAudio ? "Spielt ab..." : "Klicken zum Abspielen"}
              </p>
            </div>
          ) : (
            <p className="text-lg text-danger">Fehler beim Laden</p>
          )}
          {showAnswer && translationData && (
            <p className="text-3xl font-bold text-primary mt-4">
              {translationData.answer}
            </p>
          )}
        </div>
      </BaseModal>
    );
  }

  // Regular challenge step: show the question (fallback, shouldn't be reached now)
  if (!currentQuestion || !currentImage) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={`${currentQuestion.label} - Schwierigkeit ${currentQuestion.difficulty} / 10`}
      size="3xl"
      modalRef={targetRef}
      headerProps={moveProps}
      footer={
        <>
          {!showAnswer && (
            <Button onPress={() => setShowAnswer(true)}>Antwort anzeigen</Button>
          )}
          <Button color="secondary" onPress={handleAnotherChallenge}>
            Andere Aufgabe
          </Button>
          <Button color="primary" onPress={() => onOpenChange()}>
            Fertig
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-8 justify-center items-center">
        <Image
          alt=""
          className="fixed left-0 h-2/3 w-auto"
          src={currentImage}
        />
        <p className="text-xl">{currentQuestion.description}</p>
        <div className="text-4xl flex flex-col items-center gap-4">
          {currentQuestion.lines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        {showAnswer && (
          <p className="italic text-xl">{currentQuestion.answer}</p>
        )}
      </div>
    </BaseModal>
  );
}
