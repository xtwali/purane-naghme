import Clock from "@/components/Clock";
import ListenerCount from "@/components/ListenerCount";
import SocialLinks from "@/components/SocialLinks";
import Player from "@/components/Player";
import { SONGS } from "@/lib/songs";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      {/* Background */}
      <div className="hero-bg fixed inset-0 -z-20 bg-cover bg-center" />
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-black/35 via-black/10 to-black/60" />

      {/* Grain */}
      <div
        className="grain-overlay pointer-events-none fixed inset-0 -z-10 opacity-[0.15] mix-blend-overlay"
        aria-hidden
      />

      {/* Top row */}
      <div
        className="fixed inset-x-0 top-0 z-10 flex items-start justify-between p-4"
        style={{
          paddingTop: "max(1rem, env(safe-area-inset-top))",
          paddingLeft: "max(1rem, env(safe-area-inset-left))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
        }}
      >
        <Clock />
        <ListenerCount />
        <SocialLinks />
      </div>

      {/* Player */}
      <div
        className="relative z-10 mt-auto flex w-full flex-col items-center"
        style={{
          paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
          paddingLeft: "max(1rem, env(safe-area-inset-left))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
        }}
      >
        <Player songs={SONGS} />
      </div>
    </main>
  );
}
