import React, { useRef, useState, useEffect } from 'react';
import { X, Volume2, VolumeX, RotateCcw, ShoppingBag, ArrowRight, Sparkles, Play, Pause } from 'lucide-react';
import { Product } from '../types/product';

interface VideoModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
  onAddToBag: (productId: string) => void;
  onBuyNow: (product: Product) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  product,
  onClose,
  onSelectProduct,
  onAddToBag,
  onBuyNow,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Reset video on open
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [product]);

  if (!product || !product.video) return null;

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
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

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-3 flex items-center justify-between text-white">
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-myntra-pink" />
            <span>See in Motion</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center shadow backdrop-blur-md border border-white/10 transition-transform active:scale-90"
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 text-white fill-white" />
              ) : (
                <Play className="w-3.5 h-3.5 text-myntra-pink fill-myntra-pink ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={handleRestart}
              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center shadow backdrop-blur-md border border-white/10 transition-transform active:scale-90"
              title="Replay"
              aria-label="Replay"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center shadow backdrop-blur-md border border-white/10 transition-transform active:scale-90"
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-myntra-pink" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center shadow backdrop-blur-md transition-transform active:scale-90 ml-1"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div
          className="relative aspect-[3/4] w-full bg-black flex items-center justify-center overflow-hidden cursor-pointer"
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src={product.video}
            className="w-full h-full object-cover"
            playsInline
            loop
            muted={isMuted}
            autoPlay
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Center Play Button Overlay when Paused */}
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

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10">
            <div
              className="h-full bg-myntra-pink transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Product Bottom Action Card */}
        <div className="p-3.5 bg-neutral-900 border-t border-white/10 text-white flex flex-col gap-2.5">
          <div className="flex items-baseline justify-between">
            <button
              type="button"
              className="text-left group flex-1 pr-2 hover:opacity-90 transition-opacity"
              onClick={() => {
                onClose();
                onSelectProduct(product.id);
              }}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-myntra-pink tracking-wider uppercase block">
                  {product.brand}
                </span>
                <span className="text-[10px] text-gray-400 group-hover:text-white flex items-center transition-colors">
                  • View Full PDP <ArrowRight className="w-2.5 h-2.5 ml-0.5" />
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white leading-tight truncate">
                {product.description}
              </h4>
            </button>
            <div className="text-right shrink-0">
              <span className="text-base font-extrabold text-white">₹{product.price}</span>
              <span className="text-[11px] text-gray-400 line-through block">₹{product.mrp}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {/* Buy Now: Matching PDP styling */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onBuyNow(product);
              }}
              className="py-2.5 px-3 rounded-xl border border-myntra-pink bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-98 shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-myntra-pink" />
              <span>Buy Now</span>
            </button>

            {/* Add to Bag: Solid Pink Pill */}
            <button
              type="button"
              onClick={() => {
                onAddToBag(product.id);
                onClose();
              }}
              className="py-2.5 px-3 rounded-xl bg-myntra-pink hover:bg-myntra-pinkHover text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-98"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
