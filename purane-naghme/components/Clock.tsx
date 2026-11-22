"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  const time = now
    ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "--:--";

  return (
    <div className="flex flex-col leading-none text-ivory-100 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
      <span className="tnum text-sm font-semibold sm:text-base">{time}</span>
      <span className="text-[10px] uppercase tracking-[0.18em] text-white/60">
        on air
      </span>
    </div>
  );
}
