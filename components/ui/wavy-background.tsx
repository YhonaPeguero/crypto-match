"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: unknown;
}) => {
  const noise = useMemo(() => createNoise3D(), []);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const ntRef = useRef<number>(0);

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const waveColors = useMemo(() => colors ?? [
    "#00d4ff",  // Bright cyan
    "#00b4d8",  // Teal
    "#c77dff",  // Bright magenta/purple
    "#e040fb",  // Pink magenta
    "#7c3aed",  // Deep purple
  ], [colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = window.innerWidth;
    let h = window.innerHeight;
    
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    const drawWave = (n: number) => {
      ntRef.current += getSpeed();
      
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 50;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        
        const points: { x: number; y: number }[] = [];
        
        for (let x = 0; x <= w + 40; x += 10) {
          const noiseVal = noise(x / 800, 0.3 * i, ntRef.current);
          const y = noiseVal * 100;
          points.push({ x, y: y + h * 0.5 });
        }
        
        if (points.length > 0) {
          ctx.moveTo(points[0].x, points[0].y);
          
          for (let j = 1; j < points.length - 2; j++) {
            const xc = (points[j].x + points[j + 1].x) / 2;
            const yc = (points[j].y + points[j + 1].y) / 2;
            ctx.quadraticCurveTo(points[j].x, points[j].y, xc, yc);
          }
          
          if (points.length > 2) {
            const lastIdx = points.length - 1;
            ctx.quadraticCurveTo(
              points[lastIdx - 1].x,
              points[lastIdx - 1].y,
              points[lastIdx].x,
              points[lastIdx].y
            );
          }
        }
        
        ctx.stroke();
      }
    };

    const render = () => {
      ctx.globalAlpha = 1;
      ctx.fillStyle = backgroundFill || "black";
      ctx.fillRect(0, 0, w, h);
      
      // Plasma / Blue Fire effect
      ctx.shadowBlur = 25;
      ctx.shadowColor = "rgba(0, 200, 255, 0.6)";
      ctx.globalAlpha = waveOpacity;
      
      // Overlap layers for density
      drawWave(4);
      
      ctx.shadowBlur = 35;
      ctx.shadowColor = "rgba(100, 50, 255, 0.4)";
      drawWave(3);
      
      ctx.shadowBlur = 0;
      
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [blur, backgroundFill, waveOpacity, waveWidth, waveColors, noise, speed]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0 pointer-events-none"
        ref={canvasRef}
        id="wavy-canvas"
        style={{
          opacity: waveOpacity,
          ...(isSafari ? { WebkitFilter: `blur(${blur / 2}px)` } : {}),
        }}
      />
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
