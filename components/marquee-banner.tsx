"use client";

import * as React from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Edit this array to update the ticker sentences
// ─────────────────────────────────────────────────────────────────────────────
export const tickerItems: string[] = [
  "World's first AI-integrated healthcare system",
  "ECG diagnostics reached Kasurdi Village in minutes",
  "Healthcare accessible in any language, anytime",
  "AxonHealthHub — care anywhere in the world",
  "Powered by AI. Driven by compassion.",
  "Breaking language barriers in healthcare",
  "From chest pain to emergency care in minutes",
  "Saving lives through accessible diagnostics",
  "Health Initiative — bringing care closer to communities",
  "24/7 virtual consultations for every patient",
  "AxonScribe — where conversations become care records",
  "Redefining all possibilities in healthcare",
];

export function MarqueeBanner() {
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <div className="fixed bottom-0 left-0 right-0 z-40 flex h-10 items-center overflow-hidden bg-gray-950 border-t border-white/[0.07]">
        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-gray-950 to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-gray-950 to-transparent" />

        <div
          className="flex items-center whitespace-nowrap"
          style={{ animation: "ticker 50s linear infinite" }}
        >
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="text-[13px] font-medium text-white/90">
                {item}
              </span>
              <span className="mx-7 text-[10px] text-yellow-500">◆</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
