'use client';

import { useEffect, useRef } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export function FarcasterSDKInitializer({ children }: { children: React.ReactNode }) {
  const readyCalled = useRef(false);

  useEffect(() => {
    // Llamar ready() después de que el contenido esté completamente cargado
    if (typeof window !== 'undefined' && !readyCalled.current) {
      // Usar requestAnimationFrame para asegurar que el DOM esté renderizado
      requestAnimationFrame(() => {
        setTimeout(async () => {
          try {
            console.log('[Farcaster SDK] Calling ready()...');
            
            if (sdk && sdk.actions && typeof sdk.actions.ready === 'function') {
              await sdk.actions.ready();
              readyCalled.current = true;
              console.log('[Farcaster SDK] ✅ ready() called successfully');
            } else {
              console.warn('[Farcaster SDK] ⚠️ SDK not available');
            }
          } catch (error) {
            console.error('[Farcaster SDK] ❌ Error calling ready():', error);
          }
        }, 100); // Pequeño delay para asegurar que el contenido esté renderizado
      });
    }
  }, []); // Solo ejecutar una vez

  return <>{children}</>;
}
