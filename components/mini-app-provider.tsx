'use client';

import { useEffect } from 'react';

export function MiniAppProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Inicializar el SDK de Base Mini Apps cuando la aplicación esté lista
    if (typeof window !== 'undefined') {
      // Verificar si estamos en un contexto de Base Mini App
      if (window.parent !== window) {
        // Estamos en un iframe, notificar que la app está lista
        window.parent.postMessage({ type: 'ready' }, '*');
      }
    }
  }, []);

  return <>{children}</>;
}
