import React, { useRef, useState, useEffect } from 'react';
import { X, Volume2, VolumeX, RotateCcw, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types/product';

interface VideoModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
  onAddToBag: (productId: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  product,
  onClose,
  onSelectProduct,
  onAddToBag,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Reset video on open
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [product]);

  if (!product || !product.video) return null;

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
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
        <div className="relative aspect-[3/4] w-full bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src={product.video}
            className="w-full h-full object-cover"
            playsInline
            loop
            muted={isMuted}
            autoPlay
            onTimeUpdate={handleTimeUpdate}
          />

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
            <div>
              <span className="text-[11px] font-bold text-myntra-pink tracking-wider uppercase block">
                {product.brand}
              </span>
              <h4 className="text-sm font-semibold text-white leading-tight truncate max-w-[220px]">
                {product.description}
              </h4>
            </div>
            <div className="text-right">
              <span className="text-base font-extrabold text-white">₹{product.price}</span>
              <span className="text-[11px] text-gray-400 line-through block">₹{product.mrp}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                onClose();
                onSelectProduct(product.id);
              }}
              className="flex-1 py-2 px-3 rounded-xl border border-white/20 hover:border-white/40 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-98"
            >
              <span>View Product</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => {
                onAddToBag(product.id);
                onClose();
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-myntra-pink hover:bg-myntra-pinkHover text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-98"
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
