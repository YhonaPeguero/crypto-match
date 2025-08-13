"use client"

import React from "react"

export function HeroVisual() {
  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 720 420"
        className="w-full h-auto drop-shadow-[0_25px_40px_rgba(0,0,0,0.35)]"
        role="img"
        aria-label="Ilustración animada: teléfono con gráfico de velas y monedas Bitcoin y Ethereum"
      >
        <defs>
          <linearGradient id="hv-g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="hv-g2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="hv-phone" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0b0b0b" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
        </defs>
        <circle cx="640" cy="40" r="90" fill="url(#hv-g1)" opacity="0.12" />
        <circle cx="520" cy="360" r="80" fill="url(#hv-g2)" opacity="0.10" />
        <circle cx="300" cy="80" r="70" fill="url(#hv-g1)" opacity="0.10" />

        {/* teléfono */}
        <g transform="translate(360,70)">
          <rect x="0" y="0" width="280" height="240" rx="28" fill="url(#hv-phone)" />
          <rect x="12" y="12" width="256" height="216" rx="18" fill="#0f172a" />
          <rect x="120" y="18" width="40" height="6" rx="3" fill="#111827" />

          {/* velas */}
          <g className="hv-bars" transform="translate(42,70)">
            <line x1="8" y1="-14" x2="8" y2="84" stroke="#22c55e" strokeWidth="3" />
            <rect className="hv-bar hv-b1" x="2" y="40" width="12" height="30" rx="3" fill="#22c55e" />

            <line x1="46" y1="-6" x2="46" y2="90" stroke="#ef4444" strokeWidth="3" />
            <rect className="hv-bar hv-b2" x="40" y="22" width="12" height="48" rx="3" fill="#ef4444" />

            <line x1="84" y1="-20" x2="84" y2="80" stroke="#22c55e" strokeWidth="3" />
            <rect className="hv-bar hv-b3" x="78" y="30" width="12" height="40" rx="3" fill="#22c55e" />

            <line x1="122" y1="-10" x2="122" y2="88" stroke="#22c55e" strokeWidth="3" />
            <rect className="hv-bar hv-b4" x="116" y="18" width="12" height="54" rx="3" fill="#22c55e" />

            <path className="hv-trend" d="M0,74 C30,60 60,66 90,52 C120,38 150,44 180,30" fill="none" stroke="url(#hv-g1)" strokeWidth="4" strokeLinecap="round" />
          </g>
        </g>

        {/* monedas Bitcoin y Ethereum */}
        <g className="hv-orb hv-o1 hv-orb-strong" transform="translate(320,110)">
          <circle className="hv-ping p1" r="22" fill="none" stroke="#fb923c" strokeOpacity="0.5" strokeWidth="2" />
          <circle className="hv-ping p2" r="22" fill="none" stroke="#f43f5e" strokeOpacity="0.35" strokeWidth="2" />
          <circle r="22" fill="url(#hv-g1)" />
          <text y="6" textAnchor="middle" fontSize="18" fontWeight="800" fill="#fff">₿</text>
        </g>
        <g className="hv-orb hv-o2" transform="translate(590,120)">
          <circle r="18" fill="url(#hv-g2)" />
          <text y="6" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">Ξ</text>
        </g>

        {/* candado de seguridad */}
        <g transform="translate(600,300)">
          <rect x="-18" y="8" width="36" height="26" rx="6" fill="#0b0b0b" opacity="0.6" stroke="#ffffff" strokeOpacity="0.12" />
          <path d="M-8,8 v-6 a8 8 0 0 1 16 0 v6" fill="none" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>

      <style jsx>{`
        @keyframes hvFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes hvFloatStrong { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes hvBreathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
        @keyframes hvBarUp { 0% { transform: scaleY(0.35); } 60% { transform: scaleY(1.05); } 100% { transform: scaleY(1); } }
        @keyframes hvDraw { 0% { stroke-dasharray: 260; stroke-dashoffset: 260; } 100% { stroke-dasharray: 260; stroke-dashoffset: 0; } }
        @keyframes hvPing { 0% { transform: scale(0.9); opacity: .6; } 70%,100% { transform: scale(1.8); opacity: 0; } }
        .hv-orb { animation: hvFloat 4.5s ease-in-out infinite; transform-origin: center; }
        .hv-o1 { animation-delay: .2s; }
        .hv-o2 { animation-delay: .8s; }
        .hv-orb-strong { animation-name: hvFloatStrong; }
        .hv-breathe { animation: hvBreathe 5s ease-in-out infinite; transform-origin: center; }
        .hv-bars .hv-bar { transform-box: fill-box; transform-origin: bottom center; animation: hvBarUp 900ms ease-out both; }
        .hv-b1 { animation-delay: .12s; }
        .hv-b2 { animation-delay: .24s; }
        .hv-b3 { animation-delay: .36s; }
        .hv-b4 { animation-delay: .48s; }
        .hv-trend { animation: hvDraw 1200ms ease-out both; }
        .hv-ping { transform-origin: center; animation: hvPing 2.6s ease-out infinite; }
        .p2 { animation-delay: .8s; }

        @media (prefers-reduced-motion: reduce) {
          .hv-orb, .hv-breathe, .hv-bar, .hv-trend, .hv-ping { animation: none !important; }
        }
      `}</style>
    </div>
  )
}


