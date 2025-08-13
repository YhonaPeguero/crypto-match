"use client"

import dynamic from "next/dynamic"
import { HeroVisual } from "./hero-visual"

const HeroVisual3D = dynamic(() => import("./hero-visual-3d").then((m) => m.HeroVisual3D), {
  ssr: false,
})

export function HeroVisualClient() {
  return (
    <>
      <div className="hidden sm:block">
        <HeroVisual3D />
      </div>
      <div className="sm:hidden">
        <HeroVisual />
      </div>
    </>
  )
}


