"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Song } from "@/lib/songs";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function initials(title: string): string {
  const cleaned = title.replace(/[^A-Za-z0-9 ]/g, "");
  const words = cleaned.split(" ").filter(Boolean);
  return (words[0]?.[0] ?? "♪") + (words[1]?.[0] ?? "");
}

const GLASS =
  "border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] backdrop-blur-3xl backdrop-saturate-[1.7] shadow-glass";

export default function Player({ songs }: { songs: Song[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const song = useMemo(() => songs[index], [songs, index]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(0);
    setDuration(0);
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing]);

  function togglePlay() {
    setPlaying((p) => !p);
  }

  function goNext() {
    setIndex((i) => (i + 1) % songs.length);
    setPlaying(true);
  }

  function goPrev() {
    setIndex((i) => (i - 1 + songs.length) % songs.length);
    setPlaying(true);
  }

  function onSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    const value = Number(e.target.value);
    setCurrentTime(value);
    if (audio) audio.currentTime = value;
  }

  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full max-w-xl px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-0">
      <audio
        ref={audioRef}
        src={song.src}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onEnded={goNext}
        preload="metadata"
      />

      {/* ---------- Desktop: horizontal pill ---------- */}
      <div
        className={`hidden sm:flex w-full items-center gap-4 rounded-full p-3 pr-5 ${GLASS}`}
      >
        <Vinyl song={song} playing={playing} size={80} />

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <p className="truncate text-[15px] font-semibold text-ivory-100">
              {song.title}
            </p>
            <span className="tnum shrink-0 text-[10.5px] text-white/60">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          <p className="truncate text-[12.5px] text-white/70">{song.key}</p>
          <SeekBar
            currentTime={currentTime}
            duration={duration}
            pct={pct}
            onSeek={onSeek}
          />
        </div>

        <Transport
          playing={playing}
          onPrev={goPrev}
          onToggle={togglePlay}
          onNext={goNext}
        />
      </div>

            {/* ---------- Mobile: compact player ---------- */}
      <div className={`flex items-center gap-3 rounded-2xl p-3 sm:hidden ${GLASS}`}>
        <Vinyl song={song} playing={playing} size={52} />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ivory-100">
            {song.title}
          </p>

          <p className="truncate text-[11px] text-white/60">
            {song.key}
          </p>

          <SeekBar
            currentTime={currentTime}
            duration={duration}
            pct={pct}
            onSeek={onSeek}
          />
        </div>

        <Transport
          playing={playing}
          onPrev={goPrev}
          onToggle={togglePlay}
          onNext={goNext}
        />
           </div>
    </div>
  );
}

function Vinyl({
  song,
  playing,
  size,
}: {
  song: Song;
  playing: boolean;
  size: number;
}) {
  return (
    <div
      className="relative shrink-0 rounded-full"
      style={{ width: size, height: size }}
    >
      <div
        className="animate-spin-slow flex h-full w-full items-center justify-center rounded-full bg-cover bg-center ring-1 ring-white/10"
        style={{
          backgroundColor: song.tint,
          animationPlayState: playing ? "running" : "paused",
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 32%, rgba(0,0,0,0.25) 33%, rgba(0,0,0,0) 34%, rgba(0,0,0,0) 46%, rgba(0,0,0,0.2) 47%, rgba(0,0,0,0) 48%)`,
        }}
      >
        <span className="font-display select-none text-sm font-semibold text-ivory-100/80">
          {initials(song.title)}
        </span>
      </div>
      <div
        className="spindle absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40"
        aria-hidden
      />
    </div>
  );
}

function SeekBar({
  currentTime,
  duration,
  pct,
  onSeek,
}: {
  currentTime: number;
  duration: number;
  pct: number;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="group relative mt-1.5 flex h-6 w-full items-center">
      <div className="seek-rail absolute inset-x-0 h-[3px] rounded-full" />
      <div
        className="seek-fill absolute h-[3px] rounded-full"
        style={{ width: `${pct}%` }}
      />
      <div
        className="seek-knob pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 rounded-full opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        style={{ left: `${pct}%` }}
        aria-hidden
      />
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={currentTime}
        onChange={onSeek}
        aria-label="Seek"
        className="absolute inset-0 h-6 w-full cursor-pointer appearance-none bg-transparent opacity-0"
      />
    </div>
  );
}

function Transport({
  playing,
  onPrev,
  onToggle,
  onNext,
  large = false,
}: {
  playing: boolean;
  onPrev: () => void;
  onToggle: () => void;
  onNext: () => void;
  large?: boolean;
}) {
  const iconSize = large ? "h-5 w-5" : "h-4 w-4";
  const playSize = large ? "h-14 w-14" : "h-10 w-10";
  return (
    <div className={`flex shrink-0 items-center ${large ? "gap-6" : "gap-1"}`}>
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous song"
        className="flex h-9 w-9 items-center justify-center rounded-full text-ivory-100/85 transition hover:bg-white/10 hover:text-ivory-100"
      >
        <svg viewBox="0 0 24 24" className={`${iconSize} fill-current`}>
          <path d="M6 5h2v14H6zM20 5v14l-11-7z" />
        </svg>
      </button>

      <button
        type="button"
        onClick={onToggle}
        aria-label={playing ? "Pause" : "Play"}
        className={`flex ${playSize} items-center justify-center rounded-full bg-brass-500 text-dusk-950 shadow-[0_4px_16px_-2px_rgba(227,167,60,0.6)] transition hover:bg-brass-400 active:scale-95`}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" className={`${large ? "h-6 w-6" : "h-4 w-4"} fill-current`}>
            <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className={`${large ? "h-6 w-6" : "h-4 w-4"} fill-current`}>
            <path d="M7 5l12 7-12 7z" />
          </svg>
        )}
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next song"
        className="flex h-9 w-9 items-center justify-center rounded-full text-ivory-100/85 transition hover:bg-white/10 hover:text-ivory-100"
      >
        <svg viewBox="0 0 24 24" className={`${iconSize} fill-current`}>
          <path d="M16 5h2v14h-2zM4 5v14l11-7z" />
        </svg>
      </button>
    </div>
  );
}
