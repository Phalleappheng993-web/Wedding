import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import confetti from "canvas-confetti";

import { I18nProvider } from "./i18n";
import { wedding } from "./data/wedding";
import { guestFromUrl, rememberGuestName } from "./lib/guest";
import { usePhase } from "./lib/phase";
import type { Guest } from "./types";

import Controls from "./components/Controls";
import GuestEntry from "./components/GuestEntry";
import Envelope from "./components/Envelope";
import Hero from "./components/Hero";
import Welcome from "./components/Welcome";
import Moment from "./components/Moment";
import Schedule from "./components/Schedule";
import LoveStory from "./components/LoveStory";
import Gallery from "./components/Gallery";
import RSVP from "./components/RSVP";
import Wishes from "./components/Wishes";
import Gift from "./components/Gift";
import Share from "./components/Share";
import Footer from "./components/Footer";

// Map (Leaflet) is the heaviest part, so it loads only when needed.
const Location = lazy(() => import("./components/Location"));

const MUSIC_SRC = "/music/wedding.mp3";

function Shell() {
  const [guest, setGuest] = useState<Guest | null>(() => guestFromUrl());
  const [opened, setOpened] = useState(false);
  const [dark, setDark] = useState(
    () => window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false
  );
  const [musicOn, setMusicOn] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);
  const resumeOnReturn = useRef(false);
  const phase = usePhase(wedding.date);

  // Theme on <html> so the page background follows too
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#17120f" : "#f6f1e7");
  }, [dark]);

  const getAudio = useCallback(() => {
    if (!audio.current) {
      audio.current = new Audio(MUSIC_SRC);
      audio.current.loop = true;
      audio.current.volume = 0.35;
    }
    return audio.current;
  }, []);

  const play = useCallback(() => {
    getAudio().play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
  }, [getAudio]);

  const pause = useCallback(() => {
    audio.current?.pause();
    setMusicOn(false);
  }, []);

  // Pause when the guest switches app/tab, resume when they come back
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        resumeOnReturn.current = !audio.current?.paused;
        audio.current?.pause();
      } else if (resumeOnReturn.current) {
        audio.current?.play().catch(() => setMusicOn(false));
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  function openInvitation() {
    setOpened(true);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      confetti({ particleCount: 110, spread: 90, origin: { y: 0.65 }, colors: ["#d3b062", "#f6f1e7", "#7a2b3b"] });
    }
    play();
  }

  const showEntry = !guest;
  const showEnvelope = Boolean(guest) && !opened;

  return (
    <>
      <Controls
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
        musicOn={musicOn}
        onToggleMusic={opened ? (musicOn ? pause : play) : undefined}
      />

      <AnimatePresence>
        {showEntry && (
          <GuestEntry
            key="entry"
            onSubmit={(name) => {
              rememberGuestName(name);
              setGuest({ name });
            }}
          />
        )}
        {showEnvelope && guest && <Envelope key="envelope" guestName={guest.name} onOpen={openInvitation} />}
      </AnimatePresence>

      {opened && guest && (
        <main>
          <Hero wedding={wedding} />
          <Welcome guest={guest} phase={phase} />
          <Moment wedding={wedding} phase={phase} />

          {phase !== "after" && <Schedule wedding={wedding} phase={phase} />}
          {phase === "before" && <LoveStory story={wedding.story} />}
          <Gallery photos={wedding.gallery} />

          {phase !== "after" && (
            <Suspense fallback={<div className="h-96" aria-hidden />}>
              <Location wedding={wedding} />
            </Suspense>
          )}

          {phase === "before" && <RSVP guest={guest} />}
          <Wishes guest={guest} />
          {wedding.gift && phase !== "after" && <Gift gift={wedding.gift} />}
          {phase === "before" && <Share />}
          <Footer wedding={wedding} />
        </main>
      )}
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <MotionConfig reducedMotion="user">
        <Shell />
      </MotionConfig>
    </I18nProvider>
  );
}
