"use client"

import React from "react"

export function HeroPreview() {
  return (
    <div className="relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur shadow-2xl overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500" aria-hidden="true"></div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulseSoft {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0.6; }
        }
        @keyframes barUp {
          0% { transform: scaleY(0.4); }
          60% { transform: scaleY(1.05); }
          100% { transform: scaleY(1); }
        }
        @keyframes drawLine {
          0% { stroke-dasharray: 240; stroke-dashoffset: 240; }
          100% { stroke-dasharray: 240; stroke-dashoffset: 0; }
        }
        .coin { animation: float 4s ease-in-out infinite; transform-origin: center; }
        .coin-a { animation-delay: 0.1s; }
        .coin-b { animation-delay: 0.6s; }
        .coin-c { animation-delay: 1s; }
        .bars .bar { transform-box: fill-box; transform-origin: bottom center; animation: barUp 900ms ease-out both; }
        .bars .b1 { animation-delay: 120ms; }
        .bars .b2 { animation-delay: 240ms; }
        .bars .b3 { animation-delay: 360ms; }
        .bars .b4 { animation-delay: 480ms; }
        .trend { stroke-linecap: round; animation: drawLine 1200ms ease-out both; }
      `}</style>
    </div>
  )
}


