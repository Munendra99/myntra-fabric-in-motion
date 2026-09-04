import React, { useState } from 'react';
import { Smartphone, Monitor, Info, Sparkles } from 'lucide-react';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={`min-h-screen ${viewMode === 'mobile' ? 'bg-neutral-900 md:py-6' : 'bg-gray-100'} flex flex-col items-center justify-start selection:bg-pink-100 selection:text-myntra-pink transition-colors duration-300`}>
      {/* Top Device Switcher Header (Visible on desktop/tablets) */}
      <div className={`hidden md:flex items-center justify-between px-4 py-2 mb-2 text-xs transition-all ${
        viewMode === 'mobile' ? 'w-full max-w-[430px] text-neutral-400' : 'w-full max-w-5xl text-gray-600'
      }`}>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 font-bold text-myntra-pink">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Myntra Real Fabric MVP</span>
          </div>

          {/* Flexible Mode Switcher */}
          <div className="flex items-center bg-black/20 backdrop-blur-sm p-0.5 rounded-lg border border-white/10 ml-2">
            <button
              type="button"
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                viewMode === 'mobile'
                  ? 'bg-myntra-pink text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>Mobile (430px)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                viewMode === 'desktop'
                  ? 'bg-myntra-pink text-white shadow-xs'
                  : 'text-neutral-400 hover:text-gray-900'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>Desktop Fluid</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowInfo(!showInfo)}
          className="text-[11px] hover:text-myntra-pink flex items-center gap-1 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Feature Info</span>
        </button>
      </div>

      {showInfo && (
        <div className={`hidden md:block mb-3 p-3.5 rounded-xl text-xs shadow-lg transition-all animate-fadeIn ${
          viewMode === 'mobile'
            ? 'w-full max-w-[430px] bg-neutral-800 border border-neutral-700 text-neutral-300'
            : 'w-full max-w-5xl bg-white border border-gray-200 text-gray-700'
        }`}>
          <p className="font-bold text-myntra-pink mb-1">
            🎯 Genuine Fabric Video MVP Experiment
          </p>
          <p className="leading-relaxed text-[11px] text-gray-400">
            This prototype demonstrates genuine fabric/drape video integration inside the product image carousel. It helps users verify real material feel and flow before purchasing, reducing wishlist drop-offs.
          </p>
        </div>
      )}

      {/* Main Container: Seamlessly switches between Phone Frame and Responsive Desktop Canvas */}
      <div
        className={`w-full bg-white flex flex-col relative transition-all duration-300 ${
          viewMode === 'mobile'
            ? 'md:max-w-[430px] min-h-screen md:min-h-[850px] md:h-[90vh] md:rounded-[36px] overflow-hidden shadow-2xl md:border-[8px] md:border-neutral-800'
            : 'max-w-4xl min-h-screen shadow-lg md:rounded-2xl overflow-hidden border border-gray-200 my-2'
        }`}
      >
        {/* Mobile Speaker / Camera Notch Simulator (Only in Mobile Frame Mode) */}
        {viewMode === 'mobile' && (
          <div className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-neutral-800 rounded-b-xl z-50 items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-neutral-900 border border-neutral-700/50 mr-2" />
            <div className="w-10 h-1 bg-neutral-700 rounded-full" />
          </div>
        )}

        {/* Inner Scrollable Viewport */}
        <div className="w-full h-full overflow-y-auto no-scrollbar relative flex flex-col bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};
