import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';
import { useViewMode } from '../context/ViewModeContext';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  const { setViewMode, isDesktop } = useViewMode();


  return (
    <div className="min-h-screen flex flex-col w-full bg-slate-100 text-gray-900 selection:bg-pink-100 selection:text-myntra-pink">
      {/* Top Mode Switcher Bar */}
      <div className="sticky top-0 z-50 bg-slate-900 text-white px-4 py-2 flex items-center justify-between border-b border-slate-800 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-myntra-pink animate-pulse" />
          <span className="text-xs font-bold tracking-wide text-slate-200 hidden sm:inline">
            Myntra
          </span>
        </div>


        {/* Mode Switcher Buttons */}
        <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700">
          <button
            type="button"
            onClick={() => setViewMode('mobile')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
              !isDesktop
                ? 'bg-myntra-pink text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile 430px</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('desktop')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
              isDesktop
                ? 'bg-myntra-pink text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop Fluid</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isDesktop ? (
        <div className="w-full min-h-screen bg-white flex flex-col flex-1">
          {children}
        </div>
      ) : (
        <div className="flex-1 flex justify-center w-full py-0 md:py-4">
          <div className="w-full max-w-[430px] min-h-[calc(100vh-48px)] md:min-h-[850px] bg-white md:rounded-2xl md:shadow-2xl md:border md:border-gray-200 flex flex-col overflow-hidden relative">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

