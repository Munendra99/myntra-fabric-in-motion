import React from 'react';
import { Play, ShoppingBag, Trash2, Plus, Share2, Sparkles, X } from 'lucide-react';
import { Product } from '../types/product';
import { RatingBadge } from './RatingBadge';
import { useViewMode } from '../context/ViewModeContext';

interface WishlistCardProps {
  product: Product;
  onSelect: (productId: string) => void;
  onWatchVideo?: (product: Product) => void;
  onQuickAdd?: (e: React.MouseEvent, productId: string) => void;
  onDelete?: (e: React.MouseEvent, productId: string) => void;
  onShare?: (e: React.MouseEvent, productId: string) => void;
}

export const WishlistCard: React.FC<WishlistCardProps> = ({
  product,
  onSelect,
  onWatchVideo,
  onQuickAdd,
  onDelete,
  onShare,
}) => {
  const { isDesktop } = useViewMode();
  const hasVideo = Boolean(product.video);


  const handleCardClick = () => {
    onSelect(product.id);
  };

  const handleWatchVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onWatchVideo) {
      onWatchVideo(product);
    } else {
      onSelect(product.id);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group flex flex-col bg-white border border-gray-100 md:border-gray-200 rounded-lg overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer relative"
    >
      {/* Desktop Delete Cross (Top Right on desktop) */}
      {isDesktop && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) onDelete(e, product.id);
          }}
          className="absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-red-500 flex items-center justify-center shadow-xs transition-colors"
          title="Remove from wishlist"
        >
          <X className="w-4 h-4" />
        </button>
      )}


      {/* Thumbnail Container */}
      <div className="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden">
        {/* Photo by Default */}
        <img
          src={product.images[0]}
          alt={product.brand}
          className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />

        {/* 'Watch Video' / ▶ Video Interaction Button */}
        {hasVideo && (
          <button
            type="button"
            onClick={handleWatchVideoClick}
            className="absolute top-2 left-2 z-10 flex items-center gap-1.5 bg-black/80 hover:bg-black text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md border border-white/20 hover:scale-105 active:scale-95 transition-all"
            title="Watch product video in motion"
            aria-label="Watch video"
          >
            <span className="w-4 h-4 rounded-full bg-myntra-pink flex items-center justify-center">
              <Play className="w-2.5 h-2.5 fill-white text-white ml-0.5" />
            </span>
            <span>Watch Video</span>
          </button>
        )}

        {/* Rating Badge (Bottom-Left Overlay) */}
        <div className="absolute bottom-2 left-2 z-10">
          <RatingBadge rating={product.rating} size="sm" />
        </div>

        {/* Mobile 'Add' Button (Bottom-Right Overlay on mobile) */}
        {!isDesktop && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onQuickAdd) onQuickAdd(e, product.id);
            }}
            className="absolute bottom-2 right-2 z-10 bg-white/95 hover:bg-pink-50 text-myntra-pink border border-myntra-pink text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 active:scale-95 transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-myntra-pink" />
            <span>Add</span>
          </button>
        )}
      </div>

      {/* Product Details */}
      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-[13px] md:text-sm tracking-wide uppercase truncate leading-tight">
              {product.brand}
            </h3>
            {hasVideo && (
              <span className="text-[10px] text-myntra-pink font-semibold flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Motion</span>
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 truncate mt-1 leading-tight">
            {product.description}
          </p>
        </div>

        {/* Price Row: ₹399 69% OFF ₹1299 */}
        <div className="mt-2.5 flex items-baseline gap-2 flex-wrap">
          <span className="font-extrabold text-sm md:text-base text-gray-900">
            ₹{product.price}
          </span>
          <span className="text-xs font-bold text-myntra-pink">
            {product.discountPercent}% OFF
          </span>
          <span className="line-through text-xs text-gray-400 font-normal">
            ₹{product.mrp}
          </span>
        </div>
      </div>

      {/* Desktop Card Action Button: MOVE TO BAG (Real Myntra desktop style) */}
      {isDesktop && (
        <div className="border-t border-gray-100 p-2.5 bg-white">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onQuickAdd) onQuickAdd(e, product.id);
            }}
            className="w-full py-2.5 px-3 bg-white hover:bg-pink-50 text-myntra-pink border border-myntra-pink font-extrabold text-xs uppercase rounded-md tracking-wider flex items-center justify-center gap-2 shadow-2xs transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-myntra-pink" />
            <span>Move to Bag</span>
          </button>
        </div>
      )}

      {/* Mobile 3-icon Action Row (Visible only in mobile mode) */}
      {!isDesktop && (
        <div className="border-t border-gray-100 grid grid-cols-3 py-1.5 bg-gray-50/60 text-gray-500 text-xs">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onDelete) onDelete(e, product.id);
            }}
            className="flex items-center justify-center p-1 hover:text-red-500 transition-colors border-r border-gray-100"
            title="Remove from wishlist"
            aria-label="Remove"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onQuickAdd) onQuickAdd(e, product.id);
            }}
            className="flex items-center justify-center p-1 hover:text-myntra-pink transition-colors border-r border-gray-100"
            title="Add to bag"
            aria-label="Add to bag"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onShare) onShare(e, product.id);
            }}
            className="flex items-center justify-center p-1 hover:text-gray-900 transition-colors"
            title="Share"
            aria-label="Share"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>

  );
};
