'use client';

import { useEffect, useRef } from 'react';

// Sistema global de monitoreo de performance
let globalRenderCount = 0;
let lastLogTime = Date.now();

export function PerformanceMonitor() {
  const componentRenderCount = useRef(0);

  useEffect(() => {
    globalRenderCount += 1;
    componentRenderCount.current += 1;
    
    const now = Date.now();
    const timeSinceLastLog = now - lastLogTime;
    
    // Log cada segundo para evitar spam
    if (timeSinceLastLog > 1000) {
      console.log('[LOCAL-DEBUG] 📊 PERFORMANCE MONITOR:', {
        globalRenders: globalRenderCount,
        componentRenders: componentRenderCount.current,
        timestamp: now,
        rendersPerSecond: Math.round(globalRenderCount / (now / 1000))
      });
      
      // Detectar posibles loops
      if (globalRenderCount > 50) {
        console.warn('[LOCAL-DEBUG] ⚠️ ALTO NÚMERO DE RENDERS DETECTADO:', globalRenderCount);
      }
      
      lastLogTime = now;
    }
  });

  return null; // Este componente no renderiza nada
}
