"use client";

import { useEffect, useState } from "react";

const BASE = 214;

export default function ListenerCount() {
  const [count, setCount] = useState(BASE);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => {
        const drift = Math.floor(Math.random() * 5) - 2;
        const next = c + drift;
        return next < BASE - 20 ? BASE - 20 : next > BASE + 20 ? BASE + 20 : next;
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 backdrop-blur-md">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brass-400" />
      </span>
      <span className="tnum text-xs font-medium text-ivory-100 sm:text-[13px]">
        {count.toLocaleString()} listening
      </span>
    </div>
  );
}
