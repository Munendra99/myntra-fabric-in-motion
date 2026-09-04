import React from 'react';
import { Play, ShoppingBag, Trash2, Plus, Share2, Sparkles } from 'lucide-react';
import { Product } from '../types/product';
import { RatingBadge } from './RatingBadge';

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
      className="group flex flex-col bg-white border border-gray-100 rounded-lg overflow-hidden shadow-card hover:shadow-lg transition-all cursor-pointer relative"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden">
        {/* Photo by Default */}
        <img
          src={product.images[0]}
          alt={product.brand}
          className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
          loading="lazy"
        />

        {/* 'Watch Video' / ▶ Video Interaction Button (Directly from User Requirement) */}
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

        {/* 'Add' Button (Bottom-Right Overlay) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onQuickAdd) onQuickAdd(e, product.id);
          }}
          className="absolute bottom-2 right-2 z-10 bg-white/95 hover:bg-pink-50 text-myntra-pink border border-myntra-pink text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 active:scale-95 transition-all"
        >
          <ShoppingBag className="w-3 h-3 text-myntra-pink" />
          <span>Add</span>
        </button>
      </div>

      {/* Product Details */}
      <div className="p-2.5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-[13px] tracking-wide uppercase truncate leading-tight">
              {product.brand}
            </h3>
            {hasVideo && (
              <span className="text-[10px] text-myntra-pink font-semibold flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Motion</span>
              </span>
            )}
          </div>
          <p className="text-[12px] text-gray-600 truncate mt-0.5 leading-tight">
            {product.description}
          </p>
        </div>

        {/* Price Row: ₹399 69% OFF ₹1299 */}
        <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
          <span className="font-bold text-[14px] text-gray-900">
            ₹{product.price}
          </span>
          <span className="text-[11px] font-bold text-myntra-teal">
            {product.discountPercent}% OFF
          </span>
          <span className="line-through text-[11px] text-gray-400 font-normal">
            ₹{product.mrp}
          </span>
        </div>
      </div>

      {/* Bottom 3-icon Action Row */}
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
    </div>
  );
};
