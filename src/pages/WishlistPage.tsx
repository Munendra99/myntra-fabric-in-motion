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
import { useViewMode } from '../context/ViewModeContext';

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
  const { isDesktop } = useViewMode();
  const [filterType, setFilterType] = useState<'all' | 'video_only'>('all');

  const filteredProducts = products.filter((p) => {
    if (filterType === 'video_only') return Boolean(p.video);
    return true;
  });

  const videoCount = products.filter((p) => Boolean(p.video)).length;

  return (
    <div className="flex flex-col min-h-screen bg-white w-full">
      {/* ========================================================================= */}
      {/* 1. MOBILE HEADER & ADDRESS BAR (Rendered in mobile mode)                  */}
      {/* ========================================================================= */}
      {!isDesktop && (
        <div>
          {/* Mobile Sticky Header */}

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
              <h1 className="text-[15px] font-bold text-gray-900 leading-tight">Wishlist</h1>
              <p className="text-[11px] font-medium text-gray-500">{filteredProducts.length} items</p>
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

        {/* Mobile Delivery Address Bar */}
        <div className="bg-[#FAF8FC] border-b border-gray-100 px-4 py-2 flex items-center justify-between text-xs cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-2 overflow-hidden mr-2">
            <MapPin className="w-3.5 h-3.5 text-myntra-pink shrink-0" />
            <span className="truncate text-gray-800">
              <strong className="font-bold text-gray-900">John Doe</strong> - Brigade towers, 29, Financial District
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-600 shrink-0" />
        </div>

        {/* Mobile Action Pills: Collections & Out of Stock */}
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

        {/* Contextual Fabric Drape Banner */}
        <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 border-y border-pink-100 px-4 py-1.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-gray-800 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-myntra-pink" />
            <span>
              <strong className="text-myntra-pink font-bold">{videoCount} items</strong> have motion videos
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
      </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DESKTOP WISHLIST HEADER (Visible when isDesktop is true)               */}
      {/* ========================================================================= */}
      {isDesktop && (
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-4 w-full">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
            <span>Home</span>
            <span>/</span>
            <span>My</span>
            <span>/</span>
            <span className="font-bold text-gray-800">My Wishlist</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-4">
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
              <span className="text-base font-normal text-gray-500">{filteredProducts.length} items</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFilterType((prev) => (prev === 'all' ? 'video_only' : 'all'))}
                className={`text-xs font-bold px-4 py-2 rounded-full border flex items-center gap-1.5 transition-all ${
                  filterType === 'video_only'
                    ? 'bg-myntra-pink text-white border-myntra-pink shadow-xs'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-myntra-pink hover:text-myntra-pink'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {filterType === 'video_only'
                    ? `Showing Video Verified (${videoCount})`
                    : `Filter by Motion Videos (${videoCount})`}
                </span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. PRODUCT GRID (2-col on mobile, 4-col on desktop)                       */}
      {/* ========================================================================= */}
      <main className={`flex-1 w-full ${isDesktop ? 'p-6 bg-white' : 'p-3 bg-gray-50'}`}>
        <div className={isDesktop ? 'max-w-7xl mx-auto' : 'w-full'}>
          <div className={`grid gap-3 ${isDesktop ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6' : 'grid-cols-2'}`}>

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
                    navigator.share({
                      title: product.brand,
                      text: product.description,
                      url: window.location.href,
                    });
                  }
                }}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
