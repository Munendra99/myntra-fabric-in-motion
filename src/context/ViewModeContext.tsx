import React, { createContext, useContext, useState } from 'react';

export type ViewMode = 'mobile' | 'desktop';

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isDesktop: boolean;
}

const ViewModeContext = createContext<ViewModeContextType>({
  viewMode: 'mobile',
  setViewMode: () => {},
  isDesktop: false,
});

export const ViewModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mobile is the first/default view as requested by user
  const [viewMode, setViewMode] = useState<ViewMode>('mobile');

  return (
    <ViewModeContext.Provider
      value={{
        viewMode,
        setViewMode,
        isDesktop: viewMode === 'desktop',
      }}
    >
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = () => useContext(ViewModeContext);
