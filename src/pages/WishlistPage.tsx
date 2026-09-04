import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  MapPin,
  ChevronDown,
  Layers,
  Package,
  Edit3,
  Sparkles,
} from 'lucide-react';
import { Product } from '../types/product';
import { WishlistCard } from '../components/WishlistCard';

interface WishlistPageProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
  onWatchVideo?: (product: Product) => void;
  bagCount: number;
  onAddToBag: (productId: string) => void;
  onRemoveItem?: (productId: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  products,
  onSelectProduct,
  onWatchVideo,
  bagCount,
  onAddToBag,
  onRemoveItem,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'video_only'>('all');

  const filteredProducts = products.filter((p) => {
    if (filterType === 'video_only') return Boolean(p.video);
    return true;
  });

  const videoCount = products.filter((p) => Boolean(p.video)).length;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header (Matching Screenshot 1: Wishlist, 22 items, Edit icon, Bag with red badge) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="p-1 -ml-1 text-gray-800 hover:text-myntra-pink transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-[15px] font-bold text-gray-900 leading-tight">
              Wishlist
            </h1>
            <p className="text-[11px] font-medium text-gray-500">
              {products.length} items
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Edit list"
            title="Edit list"
          >
            <Edit3 className="w-5 h-5 text-gray-700" />
          </button>

          {/* Bag Icon with Red Badge (From Screenshot 1) */}
          <div className="relative">
            <button
              type="button"
              className="text-gray-800 hover:text-myntra-pink transition-colors"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 text-gray-800" />
            </button>
            {bagCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-myntra-pink text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {bagCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* 2. Delivery Address Bar (Directly from Screenshot 1) */}
      <div className="bg-[#FAF8FC] border-b border-gray-100 px-4 py-2 flex items-center justify-between text-xs cursor-pointer hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-2 overflow-hidden mr-2">
          <MapPin className="w-3.5 h-3.5 text-myntra-pink flex-shrink-0" />
          <span className="truncate text-gray-800">
            <strong className="font-bold text-gray-900">John Doe</strong> - Brigade towers, 29, Financial District
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-600 flex-shrink-0" />
      </div>

      {/* 3. Action Pills: Collections & Out of Stock (Directly from Screenshot 1) */}
      <div className="px-4 pt-3 pb-2 flex items-center gap-2.5">
        <button
          type="button"
          className="flex-1 py-2 px-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs hover:border-gray-300"
        >
          <Layers className="w-4 h-4 text-gray-600" />
          <span>Collections</span>
        </button>

        <button
          type="button"
          className="flex-1 py-2 px-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs hover:border-gray-300"
        >
          <Package className="w-4 h-4 text-gray-600" />
          <span>Out of Stock</span>
        </button>
      </div>

      {/* 6. Contextual Real Fabric Drape Video Filter Toggle */}
      <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 border-y border-pink-100 px-4 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-gray-800 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-myntra-pink" />
          <span>
            <strong className="text-myntra-pink font-bold">{videoCount} items</strong> have verified fabric drape videos
          </span>
        </div>
        <button
          type="button"
          onClick={() => setFilterType((prev) => (prev === 'all' ? 'video_only' : 'all'))}
          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border transition-all ${
            filterType === 'video_only'
              ? 'bg-myntra-pink text-white border-myntra-pink shadow-xs'
              : 'bg-white text-gray-700 border-gray-300 hover:border-myntra-pink hover:text-myntra-pink'
          }`}
        >
          {filterType === 'video_only' ? 'Show All' : 'Video Only'}
        </button>
      </div>

      {/* 7. 2-Column Product Grid */}
      <main className="flex-1 p-3 bg-gray-50">
        <div className="grid grid-cols-2 gap-2.5">
          {filteredProducts.map((product) => (
            <WishlistCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onWatchVideo={onWatchVideo}
              onQuickAdd={(_, id) => onAddToBag(id)}
              onDelete={(_, id) => onRemoveItem && onRemoveItem(id)}
              onShare={() => {
                if (navigator.share) {
                  navigator.share({ title: product.brand, text: product.description, url: window.location.href });
                }
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
};
