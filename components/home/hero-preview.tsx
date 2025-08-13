"use client"

import React from "react"

export function HeroPreview() {
  return (
    <div className="relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur shadow-2xl overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500" aria-hidden="true"></div>

      <svg viewBox="0 0 720 420" className="w-full h-auto" role="img" aria-label="Ilustración Crypto animada con persona">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* halos suaves */}
        <circle cx="640" cy="40" r="90" fill="url(#g1)" opacity="0.12" />
        <circle cx="520" cy="360" r="80" fill="url(#g2)" opacity="0.10" />

        {/* "monedas" */}
        <g>
          <circle className="coin coin-a" cx="420" cy="100" r="16" fill="url(#g1)" />
          <circle className="coin coin-b" cx="470" cy="80" r="10" fill="url(#g2)" />
          <circle className="coin coin-c" cx="500" cy="110" r="8" fill="#a78bfa" />
        </g>

        {/* tarjeta */}
        <g transform="translate(360,120)">
          <rect x="0" y="0" width="300" height="180" rx="16" fill="#ffffff" opacity="0.05" stroke="#ffffff" strokeOpacity="0.12" />
          <rect x="20" y="20" width="140" height="10" rx="5" fill="#ffffff" opacity="0.20" />
          <rect x="20" y="40" width="100" height="8" rx="4" fill="#ffffff" opacity="0.15" />

          {/* barras */}
          <g className="bars" transform="translate(20,70)">
            <rect className="bar b1" x="0" y="20" width="14" height="60" rx="4" fill="#22c55e" />
            <rect className="bar b2" x="28" y="10" width="14" height="70" rx="4" fill="#22c55e" />
            <rect className="bar b3" x="56" y="30" width="14" height="50" rx="4" fill="#ef4444" />
            <rect className="bar b4" x="84" y="0" width="14" height="80" rx="4" fill="#22c55e" />
          </g>

          {/* línea de tendencia */}
          <path className="trend" d="M20,140 C60,120 100,130 140,110 C180,90 220,100 260,80" fill="none" stroke="url(#g1)" strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* figura humana minimalista */}
        <g transform="translate(250,220)">
          <circle cx="-80" cy="-60" r="20" fill="#f59e0b" />
          <path d="M-100,-40 Q-80,-20 -60,-40 L-50,10 L-110,10 Z" fill="url(#g2)" opacity="0.9" />
          <path d="M-60,-40 C-40,-20 -10,-10 10,-5" stroke="url(#g1)" strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="12" cy="-4" r="4" fill="#ef4444" />
        </g>
      </svg>

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


