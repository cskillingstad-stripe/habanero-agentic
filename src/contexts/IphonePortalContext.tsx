'use client';

import { createContext, useContext, useRef, type RefObject } from 'react';

const IphonePortalContext = createContext<RefObject<HTMLDivElement | null> | null>(
  null
);

export function useIphonePortalTarget() {
  return useContext(IphonePortalContext);
}

export function IphonePortalProvider({
  children,
  portalRef,
}: {
  children: React.ReactNode;
  portalRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <IphonePortalContext.Provider value={portalRef}>
      {children}
    </IphonePortalContext.Provider>
  );
}
