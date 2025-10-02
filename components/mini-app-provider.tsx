'use client';

import { useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export function MiniAppProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Inicializar el SDK de Farcaster cuando la aplicación esté lista
    if (typeof window !== 'undefined') {
      sdk.actions.ready();
    }
  }, []);

  return <>{children}</>;
}
