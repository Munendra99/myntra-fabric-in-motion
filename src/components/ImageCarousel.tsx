import React, { useState, useRef, useEffect, TouchEvent, MouseEvent } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, RotateCcw, Sparkles, X } from 'lucide-react';
import { RatingBadge } from './RatingBadge';

interface ImageCarouselProps {
  images: string[];
  video: string | null;
  rating: number;
  ratingCount: string;
  ribbonBadge?: string;
  onClose?: () => void;
}

type Slide =
  | { type: 'image'; url: string; index: number }
  | { type: 'video'; url: string; index: number };

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  video,
  rating,
  ratingCount,
  ribbonBadge,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<number | null>(null);
  const [hasAutoAdvanced, setHasAutoAdvanced] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Drag state (Touch + Mouse)
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const carouselContainerRef = useRef<HTMLDivElement | null>(null);

  // Build slide array: insert video as slide 2 (index 1) if available
  const slides: Slide[] = React.useMemo(() => {
    if (!video || images.length === 0) {
      return images.map((url, i) => ({ type: 'image' as const, url, index: i }));
    }

    const items: Slide[] = [];
    items.push({ type: 'image', url: images[0], index: 0 });
    items.push({ type: 'video', url: video, index: 1 });
    for (let i = 1; i < images.length; i++) {
      items.push({ type: 'image', url: images[i], index: i + 1 });
    }
    return items;
  }, [images, video]);

  const hasVideoSlide = slides.some((s) => s.type === 'video');

  // Automatic move from Photo 0 to Video 1 after 1.8 seconds on initial view
  useEffect(() => {
    if (hasVideoSlide && !hasAutoAdvanced && currentIndex === 0) {
      const timer = window.setTimeout(() => {
        setCurrentIndex(1); // Auto slide to video
        setHasAutoAdvanced(true);
      }, 1800);

      setAutoAdvanceTimer(timer);

      return () => {
        window.clearTimeout(timer);
      };
    }
  }, [hasVideoSlide, hasAutoAdvanced, currentIndex]);

  // Cancel auto-advance if user manually navigates
  const handleUserNavigate = (newIndex: number) => {
    if (autoAdvanceTimer) {
      window.clearTimeout(autoAdvanceTimer);
      setAutoAdvanceTimer(null);
    }
    setHasAutoAdvanced(true);
    setCurrentIndex(newIndex);
  };

  // Video autoplay & timeupdate tracking
  useEffect(() => {
    const currentSlide = slides[currentIndex];
    if (currentSlide && currentSlide.type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.log('Autoplay prevented:', err);
            setIsPlaying(false);
          });
      }
    } else if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [currentIndex, slides]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const prog = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(prog);
    }
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleRestartVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Drag / Swipe handlers for both Touch and Mouse
  const getPositionX = (e: TouchEvent | MouseEvent) => {
    return 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
  };

  const handleDragStart = (e: TouchEvent | MouseEvent) => {
    isDragging.current = true;
    startX.current = getPositionX(e);
    prevTranslate.current = -currentIndex * 100;
    if (autoAdvanceTimer) {
      window.clearTimeout(autoAdvanceTimer);
      setAutoAdvanceTimer(null);
      setHasAutoAdvanced(true);
    }
  };

  const handleDragMove = (e: TouchEvent | MouseEvent) => {
    if (!isDragging.current) return;
    const currentX = getPositionX(e);
    const diff = currentX - startX.current;
    currentTranslate.current = diff;
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = currentTranslate.current;
    const threshold = 35; // minimum drag px

    if (diff < -threshold && currentIndex < slides.length - 1) {
      handleUserNavigate(currentIndex + 1);
    } else if (diff > threshold && currentIndex > 0) {
      handleUserNavigate(currentIndex - 1);
    }
    currentTranslate.current = 0;
  };

  return (
    <div className="w-full flex flex-col bg-white select-none">
      {/* Main Carousel Viewport */}
      <div
        ref={carouselContainerRef}
        className="relative w-full aspect-[3/4] bg-neutral-100 overflow-hidden cursor-grab active:cursor-grabbing"
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        {/* Slides Track */}
        <div
          className="flex w-full h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0 relative">
              {slide.type === 'image' ? (
                <div className="w-full h-full relative">
                  <img
                    src={slide.url}
                    alt={`Product view ${idx + 1}`}
                    className="w-full h-full object-cover object-top pointer-events-none"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />

                  {/* Auto-advance notification prompt on Slide 0 if video exists */}
                  {idx === 0 && hasVideoSlide && !hasAutoAdvanced && (
                    <div className="absolute bottom-12 left-3 right-3 z-20 pointer-events-auto flex items-center justify-between bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-[11px] shadow-lg border border-white/15 animate-pulse">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-myntra-pink" />
                        <span>Auto-moving to Real Fabric Video...</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUserNavigate(1);
                        }}
                        className="bg-myntra-pink hover:bg-myntra-pinkHover font-bold text-[10px] px-2 py-0.5 rounded-full uppercase transition-all active:scale-95"
                      >
                        Watch Now
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Video Slide */
                <div
                  className="relative w-full h-full bg-black flex items-center justify-center cursor-pointer"
                  onClick={togglePlay}
                >
                  <video
                    ref={videoRef}
                    src={slide.url}
                    className="w-full h-full object-cover"
                    playsInline
                    loop
                    muted={isMuted}
                    autoPlay
                    onTimeUpdate={handleTimeUpdate}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />

                  {/* Centered Play Button when Paused */}
                  {!isPlaying && (
                    <div className="absolute inset-0 z-15 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[1px]">
                      <div className="w-14 h-14 rounded-full bg-myntra-pink text-white flex items-center justify-center shadow-2xl pl-1 transform scale-100 hover:scale-110 active:scale-95 transition-transform border border-white/20">
                        <Play className="w-7 h-7 fill-white" />
                      </div>
                      <span className="mt-2 text-white/90 text-[11px] font-semibold tracking-wide bg-black/60 px-3 py-1 rounded-full border border-white/10">
                        Tap to Resume Playback
                      </span>
                    </div>
                  )}

                  {/* Top-Left: Fabric Video Pill */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow border border-white/15 pointer-events-none">
                    <Play className="w-3 h-3 fill-myntra-pink text-myntra-pink" />
                    <span>Real Fabric Video</span>
                  </div>

                  {/* Top-Right: Video Actions (Play/Pause + Replay + Mute) */}
                  <div
                    className="absolute top-3 right-3 z-20 flex items-center gap-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Play / Pause Toggle Button */}
                    <button
                      type="button"
                      onClick={togglePlay}
                      title={isPlaying ? 'Pause Video' : 'Play Video'}
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      className="p-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md text-white shadow border border-white/15 transition-transform active:scale-90"
                    >
                      {isPlaying ? (
                        <Pause className="w-3.5 h-3.5 text-white/90 fill-white/90" />
                      ) : (
                        <Play className="w-3.5 h-3.5 text-myntra-pink fill-myntra-pink ml-0.5" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleRestartVideo}
                      title="Replay Video"
                      aria-label="Replay video"
                      className="p-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md text-white shadow border border-white/15 transition-transform active:scale-90"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-white/90" />
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      className="p-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md text-white shadow border border-white/15 transition-transform active:scale-90"
                    >
                      {isMuted ? (
                        <VolumeX className="w-3.5 h-3.5 text-white/90" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-myntra-pink" />
                      )}
                    </button>
                  </div>

                  {/* Bottom Video Quality Feature Bar */}
                  <div className="absolute bottom-11 left-3 right-3 z-10 pointer-events-none">
                    <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg border border-white/15 shadow flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5 font-medium">
                        <span className="w-2 h-2 rounded-full bg-myntra-teal animate-ping" />
                        <span>Genuine Drape & Texture Verification</span>
                      </div>
                      <span className="text-[10px] text-gray-300 font-mono">1080p Daylight</span>
                    </div>
                  </div>

                  {/* Thin Video Scrub/Progress Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10">
                    <div
                      className="h-full bg-myntra-pink transition-all duration-100"
                      style={{ width: `${videoProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Purple Ribbon Badge (Screenshot 2: 30Day BestPrice) */}
        {ribbonBadge && (
          <div className="absolute top-3 left-3 z-30 bg-[#7B1FA2] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-sm shadow-md flex items-center gap-1">
            <span>{ribbonBadge}</span>
          </div>
        )}

        {/* Circular Close Button (Screenshot 2: top-right X) */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center shadow transition-transform active:scale-90"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Slide Counter Overlay (Positioned neatly) */}
        <div className={`absolute ${onClose ? 'top-13 right-3' : 'top-3 right-3'} z-20 pointer-events-none`}>
          {slides[currentIndex]?.type !== 'video' && (
            <div className="bg-black/55 backdrop-blur-md text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow border border-white/10">
              {currentIndex + 1} / {slides.length}
            </div>
          )}
        </div>

        {/* Always-Visible Navigation Chevrons */}
        {currentIndex > 0 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleUserNavigate(currentIndex - 1);
            }}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-md backdrop-blur-sm transition-transform active:scale-90"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 -ml-0.5" />
          </button>
        )}
        {currentIndex < slides.length - 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleUserNavigate(currentIndex + 1);
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-md backdrop-blur-sm transition-transform active:scale-90"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 -mr-0.5" />
          </button>
        )}

        {/* Pagination Dots (Round dots vs. Brand-Pink Pill for Video) */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/35 backdrop-blur-md">
          {slides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            const isVideo = slide.type === 'video';

            if (isVideo) {
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleUserNavigate(idx)}
                  aria-label={`Go to fabric video slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                    isActive
                      ? 'w-7 h-2 bg-myntra-pink shadow-sm ring-1 ring-white'
                      : 'w-4 h-2 bg-myntra-pink/70 hover:bg-myntra-pink'
                  }`}
                  title="Fabric Video Slide"
                />
              );
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleUserNavigate(idx)}
                aria-label={`Go to photo slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-2 h-2 bg-white scale-110 shadow-sm'
                    : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            );
          })}
        </div>

        {/* Rating Badge Overlay - Bottom Right */}
        <div className="absolute bottom-3 right-3 z-20">
          <RatingBadge rating={rating} ratingCount={ratingCount} size="sm" />
        </div>
      </div>

      {/* Full Carousel Horizontal Thumbnail Strip (Shows Full Carousel At A Glance) */}
      <div className="w-full bg-gray-50 border-b border-gray-200 px-3 py-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            All Views ({slides.length})
          </span>
          {hasVideoSlide && (
            <button
              type="button"
              onClick={() => handleUserNavigate(1)}
              className="text-[11px] font-bold text-myntra-pink hover:underline flex items-center gap-1"
            >
              <Play className="w-2.5 h-2.5 fill-myntra-pink text-myntra-pink" />
              <span>Watch Fabric Video</span>
            </button>
          )}
        </div>

        {/* Horizontal Scrollable Thumbnails */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {slides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            const isVideo = slide.type === 'video';

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleUserNavigate(idx)}
                className={`relative flex-shrink-0 w-12 h-16 rounded overflow-hidden border-2 transition-all ${
                  isActive
                    ? 'border-myntra-pink ring-2 ring-myntra-pink/30 scale-105 shadow-sm'
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                {isVideo ? (
                  <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center text-white relative">
                    <video
                      src={slide.url}
                      className="w-full h-full object-cover opacity-60"
                      muted
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-myntra-pink flex items-center justify-center shadow">
                        <Play className="w-2.5 h-2.5 fill-white text-white ml-0.5" />
                      </div>
                      <span className="text-[8px] font-bold uppercase tracking-tighter mt-1 text-white">
                        VIDEO
                      </span>
                    </div>
                  </div>
                ) : (
                  <img
                    src={slide.url}
                    alt={`Thumb ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
