'use client';

import { useEffect, useRef } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export function FarcasterSDKInitializer({ children }: { children: React.ReactNode }) {
  const readyCalled = useRef(false);

  useEffect(() => {
    const callReady = async () => {
      if (readyCalled.current) return;
      readyCalled.current = true;

      try {
        console.log('[Farcaster SDK] Calling ready()...');
        await sdk.actions.ready();
        console.log('[Farcaster SDK] ✅ ready() called successfully');
      } catch (error) {
        console.error('[Farcaster SDK] ❌ Error calling ready():', error);
        // Reset flag to allow retry
        readyCalled.current = false;
      }
    };

    // Solo ejecutar en el cliente después de que el contenido esté listo
    if (typeof window !== 'undefined') {
      // Esperar a que el DOM esté completamente cargado
      if (document.readyState === 'complete') {
        callReady();
      } else {
        window.addEventListener('load', callReady);
        return () => window.removeEventListener('load', callReady);
      }
    }
  }, []);

  return <>{children}</>;
}

