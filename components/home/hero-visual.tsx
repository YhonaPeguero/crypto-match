"use client"

import React from "react"

export function HeroVisual() {
  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 720 420"
        className="w-full h-auto drop-shadow-[0_0_50px_rgba(34,211,238,0.15)]"
        role="img"
        aria-label="Futuristic trading interface visualization with crypto coins"
      >
        <defs>
          <linearGradient id="hv-g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
          <linearGradient id="hv-g2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--secondary))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </linearGradient>
          <linearGradient id="hv-dark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--card))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0.9" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Glows */}
        <circle cx="640" cy="40" r="120" fill="url(#hv-g1)" opacity="0.08" className="hv-pulse-slow" />
        <circle cx="360" cy="210" r="200" fill="url(#hv-g2)" opacity="0.05" className="hv-pulse-slow" style={{animationDelay: "-2s"}} />
        <circle cx="100" cy="380" r="150" fill="url(#hv-g1)" opacity="0.08" className="hv-pulse-slow" style={{animationDelay: "-4s"}} />

        {/* Device/Interface Container */}
        <g transform="translate(360,70)">
          {/* Glass Panel Background */}
          <rect x="0" y="0" width="280" height="240" rx="28" fill="url(#hv-dark)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <rect x="12" y="12" width="256" height="216" rx="18" fill="hsl(var(--background))" fillOpacity="0.8" />
          
          {/* Header Bar */}
          <rect x="120" y="24" width="40" height="4" rx="2" fill="hsl(var(--muted-foreground))" opacity="0.3" />

          {/* Chart Area */}
          <g className="hv-bars" transform="translate(42,70)">
            {/* Grid lines */}
            <line x1="0" y1="0" x2="200" y2="0" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
            <line x1="0" y1="40" x2="200" y2="40" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
            <line x1="0" y1="80" x2="200" y2="80" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />

            {/* Bars */}
            <rect className="hv-bar hv-b1" x="10" y="30" width="16" height="50" rx="4" fill="url(#hv-g1)" opacity="0.8" />
            <rect className="hv-bar hv-b2" x="40" y="15" width="16" height="65" rx="4" fill="url(#hv-g2)" opacity="0.7" />
            <rect className="hv-bar hv-b3" x="70" y="45" width="16" height="35" rx="4" fill="url(#hv-g1)" opacity="0.6" />
            <rect className="hv-bar hv-b4" x="100" y="25" width="16" height="55" rx="4" fill="url(#hv-g2)" opacity="0.9" />
            <rect className="hv-bar hv-b2" x="130" y="10" width="16" height="70" rx="4" fill="url(#hv-g1)" opacity="0.7" />
            
            {/* Trend Line (Neon) */}
            <path className="hv-trend" d="M10,30 C30,10 50,60 80,40 C110,20 140,50 170,10" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" filter="url(#glow)" />
          </g>
        </g>

        {/* Floating Crypto Assets (Abstracted) */}
        <g className="hv-orb hv-o1" transform="translate(300,100)">
          <circle className="hv-ping" r="28" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.4" strokeWidth="1" />
          <circle r="24" fill="hsl(var(--background))" stroke="url(#hv-g1)" strokeWidth="2" />
          <text y="7" textAnchor="middle" fontSize="18" fontWeight="700" fill="hsl(var(--primary))" style={{fontFamily: 'var(--font-mono)'}}>₿</text>
        </g>
        
        <g className="hv-orb hv-o2" transform="translate(610,130)">
          <circle r="20" fill="hsl(var(--background))" stroke="url(#hv-g2)" strokeWidth="2" />
          <text y="6" textAnchor="middle" fontSize="16" fontWeight="700" fill="hsl(var(--secondary))" style={{fontFamily: 'var(--font-mono)'}}>Ξ</text>
        </g>

        <g className="hv-orb hv-o3" transform="translate(280,320)">
           <circle r="16" fill="hsl(var(--background))" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeOpacity="0.5" />
           <circle r="4" fill="hsl(var(--muted-foreground))" opacity="0.5" />
        </g>

        {/* Security / Lock Badge (Modernized) */}
        <g transform="translate(580,290)" className="hv-float-slow">
          <rect x="-20" y="0" width="40" height="30" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeOpacity="0.6" filter="url(#glow)" />
          <path d="M-8,0 v-6 a8 8 0 0 1 16 0 v6" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <circle cx="0" cy="15" r="3" fill="hsl(var(--primary))" />
        </g>
      </svg>

      <style jsx>{`
        @keyframes hvFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes hvFloatSlow { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes hvPulseSlow { 0%,100% { transform: scale(1); opacity: 0.08; } 50% { transform: scale(1.1); opacity: 0.12; } }
        @keyframes hvBarUp { 0% { transform: scaleY(0); } 100% { transform: scaleY(1); } }
        @keyframes hvDraw { 0% { stroke-dasharray: 400; stroke-dashoffset: 400; } 100% { stroke-dasharray: 400; stroke-dashoffset: 0; } }
        @keyframes hvPing { 0% { transform: scale(0.9); opacity: 0.6; } 100% { transform: scale(2); opacity: 0; } }
        
        .hv-orb { animation: hvFloat 5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .hv-o1 { animation-delay: 0s; }
        .hv-o2 { animation-delay: 1.5s; }
        .hv-o3 { animation-delay: 2.5s; }
        
        .hv-float-slow { animation: hvFloatSlow 7s ease-in-out infinite; }
        .hv-pulse-slow { animation: hvPulseSlow 8s ease-in-out infinite; transform-origin: center; }
        
        .hv-bars .hv-bar { transform-box: fill-box; transform-origin: bottom center; animation: hvBarUp 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .hv-b1 { animation-delay: 0.1s; }
        .hv-b2 { animation-delay: 0.2s; }
        .hv-b3 { animation-delay: 0.3s; }
        .hv-b4 { animation-delay: 0.4s; }
        
        .hv-trend { animation: hvDraw 2s ease-out both; animation-delay: 0.6s; }
        .hv-ping { transform-origin: center; animation: hvPing 2.5s cubic-bezier(0, 0, 0.2, 1) infinite; }

        @media (prefers-reduced-motion: reduce) {
          .hv-orb, .hv-bar, .hv-trend, .hv-ping, .hv-float-slow, .hv-pulse-slow { animation: none !important; }
        }
      `}</style>
    </div>
  )
}


