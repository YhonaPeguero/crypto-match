'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export function MiniAppProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Inicializar el SDK de Farcaster cuando la aplicación esté lista
    if (typeof window !== 'undefined') {
      try {
        console.log('Inicializando Farcaster MiniApp SDK...');
        
        // Verificar si el SDK está disponible
        if (sdk && sdk.actions && typeof sdk.actions.ready === 'function') {
          // Llamar ready() para ocultar la pantalla de splash
          sdk.actions.ready();
          console.log('✅ Farcaster MiniApp SDK inicializado correctamente');
          setIsInitialized(true);
        } else {
          console.warn('⚠️ Farcaster MiniApp SDK no está disponible');
          setHasError(true);
        }
      } catch (error) {
        console.error('❌ Error inicializando Farcaster MiniApp SDK:', error);
        setHasError(true);
      }
    }
  }, []);

  // Si hay error, mostrar mensaje de debug en desarrollo
  if (hasError && process.env.NODE_ENV === 'development') {
    console.warn('Farcaster MiniApp SDK no disponible - ejecutando en modo desarrollo');
  }

  return <>{children}</>;
}
