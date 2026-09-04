import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Heart,
  Share2,
  Layers,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Product } from '../types/product';
import { ImageCarousel } from '../components/ImageCarousel';
import { SizeSelector } from '../components/SizeSelector';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToBag: (productId: string, size: string) => void;
  bagCount: number;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToBag,
  bagCount,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [isWishlisted, setIsWishlisted] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.brand} - ${product.description}`,
          url: window.location.href,
        });
      } catch (err) {
        // Ignored if cancelled
      }
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    showToast(!isWishlisted ? 'Saved to Wishlist' : 'Removed from Wishlist');
  };

  const handleAddAction = () => {
    onAddToBag(product.id, selectedSize);
    showToast(`Added to Bag (Size ${selectedSize})`);
  };

  const handleBuyNow = () => {
    onAddToBag(product.id, selectedSize);
    showToast(`Proceeding to instant checkout for Size ${selectedSize}...`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white relative pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900/90 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <Check className="w-3.5 h-3.5 text-green-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-3.5 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="p-1 -ml-1 text-gray-800 hover:text-myntra-pink transition-colors"
            aria-label="Back to Wishlist"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar Placeholder */}
        <div className="flex-1 mx-3">
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 text-xs text-gray-400 gap-2">
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">Search for brands, products...</span>
          </div>
        </div>

        {/* Header Actions: Wishlist Heart & Bag */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggleWishlist}
            className="p-1 transition-transform active:scale-90"
            aria-label="Wishlist"
          >
            <Heart
              className={`w-5 h-5 ${
                isWishlisted
                  ? 'fill-myntra-pink text-myntra-pink'
                  : 'text-gray-700'
              }`}
            />
          </button>

          <div className="relative">
            <button
              type="button"
              className="text-gray-800 hover:text-myntra-pink transition-colors"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            {bagCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-myntra-pink text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {bagCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Swipeable Image & Fabric Video Carousel */}
      <ImageCarousel
        images={product.images}
        video={product.video}
        rating={product.rating}
        ratingCount={product.ratingCount}
        ribbonBadge="30Day BestPrice"
        onClose={onBack}
      />

      {/* Icon Row Below Carousel (3 equal-width tap targets with dividers) */}
      <div className="grid grid-cols-3 border-b border-gray-200 bg-white py-2.5 text-gray-700">
        <button
          type="button"
          onClick={() => showToast('Visual comparison view')}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold hover:text-myntra-pink transition-colors border-r border-gray-200"
        >
          <Layers className="w-4 h-4" />
          <span>SIMILAR</span>
        </button>

        <button
          type="button"
          onClick={handleToggleWishlist}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold hover:text-myntra-pink transition-colors border-r border-gray-200"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted
                ? 'fill-myntra-pink text-myntra-pink'
                : 'text-gray-600'
            }`}
          />
          <span className={isWishlisted ? 'text-myntra-pink font-bold' : ''}>
            {isWishlisted ? 'WISHLISTED' : 'WISHLIST'}
          </span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold hover:text-myntra-pink transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>SHARE</span>
        </button>
      </div>

      {/* Product Details Section */}
      <div className="p-4 bg-white divide-y divide-gray-100">
        {/* Brand & Title (Directly from Screenshot 2) */}
        <div className="pb-3">
          <h2 className="text-base font-extrabold text-gray-900 tracking-wide uppercase">
            {product.brand}
          </h2>
          <p className="text-sm text-gray-700 font-medium mt-0.5 leading-snug">
            {product.description}
          </p>

          {/* Price Row (Screenshot 2: MRP ₹2,499 ₹299 (88% OFF)) */}
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-xs text-gray-500 line-through font-medium">
              MRP ₹{product.mrp}
            </span>
            <span className="text-2xl font-extrabold text-gray-900">
              ₹{product.price}
            </span>
            <span className="text-sm font-extrabold text-[#FF5722]">
              ({product.discountPercent}% OFF)
            </span>
          </div>

          {/* 30Day BestPrice Tag (From Screenshot 2) */}
          <p className="text-xs text-[#FF5722] font-bold mt-1.5 flex items-center gap-1">
            <span>30Day BestPrice</span>
          </p>
        </div>

        {/* Video Quality Assurance Banner if video exists */}
        {product.video && (
          <div className="py-3">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-pink-50/70 border border-pink-100">
              <Sparkles className="w-4 h-4 text-myntra-pink flex-shrink-0 mt-0.5" />
              <div className="text-xs text-gray-800">
                <span className="font-bold text-myntra-pink">
                  Verified Fabric Drape Video Available
                </span>
                <p className="text-gray-600 text-[11px] mt-0.5">
                  Swipe slide 2 in the carousel above to view real weave transparency, daylight drape, and motion.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Select Size Section */}
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSelectSize={(size) => setSelectedSize(size)}
        />

        {/* Fabric Specifications Section */}
        {product.fabricSpecs && (
          <div className="py-3.5">
            <h4 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-2">
              FABRIC & MATERIAL DETAILS
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-50 p-2 rounded">
                <span className="text-gray-400 text-[10px] uppercase block">Material</span>
                <span className="font-semibold text-gray-800">{product.fabricSpecs.material}</span>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <span className="text-gray-400 text-[10px] uppercase block">Weave / Knit</span>
                <span className="font-semibold text-gray-800">{product.fabricSpecs.weave}</span>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <span className="text-gray-400 text-[10px] uppercase block">Transparency</span>
                <span className="font-semibold text-gray-800">{product.fabricSpecs.transparency}</span>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <span className="text-gray-400 text-[10px] uppercase block">Handfeel</span>
                <span className="font-semibold text-gray-800">{product.fabricSpecs.feel}</span>
              </div>
            </div>
          </div>
        )}

        {/* Delivery & Services */}
        <div className="py-3.5 space-y-2">
          <div className="flex items-center gap-2.5 text-xs text-gray-700">
            <Truck className="w-4 h-4 text-myntra-teal" />
            <span>Get it by <strong className="text-gray-900">Tomorrow</strong>, Free Shipping</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-gray-700">
            <ShieldCheck className="w-4 h-4 text-myntra-teal" />
            <span>14 Days Easy Return & Exchange Guarantee</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Row (Directly from Screenshot 2) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-2.5 shadow-lg max-w-md mx-auto">
        <div className="flex items-center gap-3">
          {/* Buy Now: Outline Pill with Bag Icon */}
          <button
            type="button"
            onClick={handleBuyNow}
            className="flex-1 py-2.5 px-3 rounded-xl border border-myntra-pink text-myntra-pink font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-pink-50 active:scale-98 transition-all text-center shadow-xs"
          >
            <ShoppingBag className="w-4 h-4 text-myntra-pink" />
            <span>Buy Now</span>
          </button>

          {/* Add to Bag: Solid Pill with Bag Icon */}
          <button
            type="button"
            onClick={handleAddAction}
            className="flex-1 py-2.5 px-3 rounded-xl bg-myntra-pink hover:bg-myntra-pinkHover text-white font-bold text-[13px] flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
