'use client';

import { useEffect, useRef } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export function FarcasterSDKInitializer({ children }: { children: React.ReactNode }) {
  const renderCount = useRef(0);
  const readyCalled = useRef(false);

  useEffect(() => {
    renderCount.current += 1;
    console.log('[LOCAL-DEBUG] FarcasterSDKInitializer Render #:', renderCount.current, 'timestamp:', Date.now());
    
    // Detectar si hay demasiados renders (posible loop)
    if (renderCount.current > 10) {
      console.warn('[LOCAL-DEBUG] ⚠️ POSIBLE LOOP: Más de 10 renders detectados!');
    }
  });

  useEffect(() => {
    // Llamar ready() UNA SOLA VEZ según las mejores prácticas
    if (typeof window !== 'undefined' && !readyCalled.current) {
      try {
        console.log('[LOCAL-DEBUG] 🚀 ready() llamado - timestamp:', Date.now());
        
        if (sdk && sdk.actions && typeof sdk.actions.ready === 'function') {
          sdk.actions.ready();
          readyCalled.current = true;
          console.log('[LOCAL-DEBUG] ✅ Farcaster SDK ready() llamado correctamente');
        } else {
          console.warn('[LOCAL-DEBUG] ⚠️ Farcaster SDK no disponible');
        }
      } catch (error) {
        console.error('[LOCAL-DEBUG] ❌ Error inicializando Farcaster SDK:', error);
      }
    }
  }, []); // Solo ejecutar una vez

  return <>{children}</>;
}
