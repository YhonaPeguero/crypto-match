'use client';

import { useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export function MiniAppProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Inicializar el SDK de Farcaster cuando la aplicación esté lista
    if (typeof window !== 'undefined') {
      // Llamar ready() para ocultar la pantalla de splash
      sdk.actions.ready();
    }
  }, []);

  return <>{children}</>;
}
