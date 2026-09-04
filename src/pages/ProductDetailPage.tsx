import React, { useState, useRef } from 'react';
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
  Volume2,
  VolumeX,
  RotateCcw,
  Play,
  Pause,
} from 'lucide-react';
import { Product } from '../types/product';
import { ImageCarousel } from '../components/ImageCarousel';
import { SizeSelector } from '../components/SizeSelector';
import { useViewMode } from '../context/ViewModeContext';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToBag: (productId: string, size: string) => void;
  onBuyNow?: (product: Product, size: string) => void;
  bagCount: number;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToBag,
  onBuyNow,
  bagCount,
}) => {
  const { isDesktop } = useViewMode();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Free Size');

  const [isWishlisted, setIsWishlisted] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [desktopVideoMuted, setDesktopVideoMuted] = useState<boolean>(true);
  const [desktopVideoPlaying, setDesktopVideoPlaying] = useState<boolean>(true);
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.brand} - ${product.description}`,
          url: window.location.href,
        });
      } catch {
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
    if (onBuyNow) {
      onBuyNow(product, selectedSize);
    } else {
      showToast(`Proceeding to instant checkout for Size ${selectedSize}...`);
    }
  };

  const toggleDesktopPlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (desktopVideoRef.current) {
      if (desktopVideoRef.current.paused) {
        desktopVideoRef.current
          .play()
          .then(() => setDesktopVideoPlaying(true))
          .catch(() => {});
      } else {
        desktopVideoRef.current.pause();
        setDesktopVideoPlaying(false);
      }
    }
  };

  const handleReplayDesktopVideo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (desktopVideoRef.current) {
      desktopVideoRef.current.currentTime = 0;
      desktopVideoRef.current
        .play()
        .then(() => setDesktopVideoPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white relative pb-20 md:pb-12 w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900/90 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <Check className="w-3.5 h-3.5 text-green-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. MOBILE VIEW (Rendered in mobile mode)                                  */}
      {/* ========================================================================= */}
      {!isDesktop && (
        <div>
          {/* Mobile Sticky Header */}

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
                  isWishlisted ? 'fill-myntra-pink text-myntra-pink' : 'text-gray-700'
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
                <span className="absolute -top-1.5 -right-2 bg-myntra-pink text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
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

        {/* Icon Row Below Carousel */}
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
                isWishlisted ? 'fill-myntra-pink text-myntra-pink' : 'text-gray-600'
              }`}
            />
            <span>{isWishlisted ? 'WISHLISTED' : 'WISHLIST'}</span>
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

        {/* Mobile Product Meta Details */}
        <div className="px-4 py-3 divide-y divide-gray-100">
          <div className="pb-3">
            <h1 className="text-base font-extrabold text-gray-900 tracking-wide uppercase">
              {product.brand}
            </h1>
            <p className="text-xs text-gray-600 font-normal mt-0.5 leading-snug">
              {product.description}
            </p>

            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-gray-900">₹{product.price}</span>
              <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
              <span className="text-xs font-bold text-myntra-pink">
                ({product.discountPercent}% OFF)
              </span>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
              inclusive of all taxes
            </span>
          </div>

          <div className="py-3">
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
            />
          </div>

          {product.fabricSpecs && (
            <div className="py-3">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4 text-myntra-pink" />
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Fabric & Drape Specification
                </span>
              </div>
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
                  <span className="font-semibold text-gray-800">
                    {product.fabricSpecs.transparency}
                  </span>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <span className="text-gray-400 text-[10px] uppercase block">Handfeel</span>
                  <span className="font-semibold text-gray-800">{product.fabricSpecs.feel}</span>
                </div>
              </div>
            </div>
          )}

          <div className="py-3.5 space-y-2">
            <div className="flex items-center gap-2.5 text-xs text-gray-700">
              <Truck className="w-4 h-4 text-myntra-teal" />
              <span>
                Get it by <strong className="text-gray-900">Tomorrow</strong>, Free Shipping
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-gray-700">
              <ShieldCheck className="w-4 h-4 text-myntra-teal" />
              <span>14 Days Easy Return & Exchange Guarantee</span>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Bottom Action Row */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-2.5 shadow-lg max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex-1 py-3 px-3 rounded-xl border border-myntra-pink text-myntra-pink font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-pink-50 active:scale-98 transition-all text-center shadow-2xs"
            >
              <ShoppingBag className="w-4 h-4 text-myntra-pink" />
              <span>Buy Now</span>
            </button>

            <button
              type="button"
              onClick={handleAddAction}
              className="flex-1 py-3 px-3 rounded-xl bg-myntra-pink hover:bg-myntra-pinkHover text-white font-bold text-[13px] flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DESKTOP VIEW (Visible when isDesktop is true)                          */}
      {/* ========================================================================= */}
      {isDesktop && (
        <div className="max-w-7xl mx-auto px-6 py-6 w-full">

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <button type="button" onClick={onBack} className="hover:text-myntra-pink">
            Home
          </button>
          <span>/</span>
          <button type="button" onClick={onBack} className="hover:text-myntra-pink">
            Clothing
          </button>
          <span>/</span>
          <button type="button" onClick={onBack} className="hover:text-myntra-pink">
            Women Ethnic Wear
          </button>
          <span>/</span>
          <span className="font-bold text-gray-800">{product.brand} Sarees</span>
        </div>

        {/* 2-Column PDP Grid */}
        <div className="grid grid-cols-12 gap-10">
          {/* Left Column: 2-Column Media Grid (Photos + Video Player) */}
          <div className="col-span-7">
            <div className="grid grid-cols-2 gap-4">
              {/* Image 1 */}
              <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden border border-gray-100 shadow-2xs">
                <img
                  src={product.images[0]}
                  alt={product.description}
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
                />
              </div>

              {/* Dedicated High-Definition Fabric in Motion Video Card */}
              {product.video && (
                <div
                  className="aspect-[3/4] bg-black rounded-lg overflow-hidden relative border border-gray-200 shadow-md flex flex-col justify-center items-center group cursor-pointer"
                  onClick={toggleDesktopPlay}
                >
                  <video
                    ref={desktopVideoRef}
                    src={product.video}
                    className="w-full h-full object-cover"
                    playsInline
                    loop
                    autoPlay
                    muted={desktopVideoMuted}
                    onPlay={() => setDesktopVideoPlaying(true)}
                    onPause={() => setDesktopVideoPlaying(false)}
                  />

                  {/* Centered Play Button when Paused */}
                  {!desktopVideoPlaying && (
                    <div className="absolute inset-0 z-15 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[1px]">
                      <div className="w-14 h-14 rounded-full bg-myntra-pink text-white flex items-center justify-center shadow-2xl pl-1 transform scale-100 hover:scale-110 active:scale-95 transition-transform border border-white/20">
                        <Play className="w-7 h-7 fill-white" />
                      </div>
                      <span className="mt-2 text-white/90 text-[11px] font-semibold tracking-wide bg-black/60 px-3 py-1 rounded-full border border-white/10">
                        Click to Resume Video
                      </span>
                    </div>
                  )}

                  {/* Header Overlay */}
                  <div
                    className="absolute top-3 left-3 right-3 flex items-center justify-between z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow pointer-events-none">
                      <Sparkles className="w-3.5 h-3.5 text-myntra-pink" />
                      <span>Fabric in Motion</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      {/* Desktop Play/Pause Button */}
                      <button
                        type="button"
                        onClick={toggleDesktopPlay}
                        className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-transform active:scale-90"
                        title={desktopVideoPlaying ? 'Pause' : 'Play'}
                        aria-label={desktopVideoPlaying ? 'Pause video' : 'Play video'}
                      >
                        {desktopVideoPlaying ? (
                          <Pause className="w-3 h-3 text-white fill-white" />
                        ) : (
                          <Play className="w-3 h-3 text-myntra-pink fill-myntra-pink ml-0.5" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleReplayDesktopVideo}
                        className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-transform active:scale-90"
                        title="Replay"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDesktopVideoMuted(!desktopVideoMuted)}
                        className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-transform active:scale-90"
                        title={desktopVideoMuted ? 'Unmute' : 'Mute'}
                      >
                        {desktopVideoMuted ? (
                          <VolumeX className="w-3 h-3" />
                        ) : (
                          <Volume2 className="w-3 h-3 text-myntra-pink" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Bottom Assurance Tag */}
                  <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-t from-black/80 to-transparent p-2 rounded text-white text-[11px] font-semibold text-center pointer-events-none">
                    Authentic 360° Drape & Sheen Verification
                  </div>
                </div>
              )}

              {/* Remaining Images */}
              {product.images.slice(1).map((imgSrc, idx) => (
                <div
                  key={idx}
                  className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden border border-gray-100 shadow-2xs"
                >
                  <img
                    src={imgSrc}
                    alt={`${product.brand} view ${idx + 2}`}
                    className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sticky Product Buy Panel */}
          <div className="col-span-5 sticky top-24 self-start space-y-6">
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-wide uppercase">
                {product.brand}
              </h1>
              <p className="text-base text-gray-500 font-normal mt-1 leading-relaxed">
                {product.description}
              </p>

              {/* Rating Pill */}
              <div className="mt-3 inline-flex items-center gap-1.5 border border-gray-300 px-3 py-1 rounded text-xs font-bold text-gray-800">
                <span>{product.rating}</span>
                <span className="text-myntra-teal">★</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500 font-normal">{product.ratingCount} Ratings</span>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Price Section */}
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-gray-900">₹{product.price}</span>
                <span className="text-base text-gray-400 line-through">MRP ₹{product.mrp}</span>
                <span className="text-base font-bold text-[#FF905A]">
                  ({product.discountPercent}% OFF)
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-700 block mt-1">
                inclusive of all taxes
              </span>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Select Size
                </span>
                <span className="text-xs font-bold text-myntra-pink cursor-pointer hover:underline">
                  Size Chart
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`h-11 px-5 rounded-full text-xs font-bold border transition-all ${
                      selectedSize === size
                        ? 'border-myntra-pink text-myntra-pink bg-pink-50 shadow-xs'
                        : 'border-gray-300 text-gray-800 hover:border-gray-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons (Desktop Side-by-Side: Add to Bag & Buy Now) */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddAction}
                className="flex-1 min-h-[52px] py-3.5 px-6 bg-myntra-pink hover:bg-myntra-pinkHover text-white font-extrabold text-sm tracking-wider uppercase flex items-center justify-center gap-2 rounded-lg shadow-md cursor-pointer active:scale-98 transition-all"
              >
                <ShoppingBag className="w-5 h-5 text-white" />
                <span>ADD TO BAG</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 min-h-[52px] py-3.5 px-6 border-2 border-myntra-pink bg-white text-myntra-pink hover:bg-pink-50 font-extrabold text-sm tracking-wider uppercase flex items-center justify-center gap-2 rounded-lg cursor-pointer active:scale-98 transition-all shadow-2xs"
              >
                <span>BUY NOW</span>
              </button>

              <button
                type="button"
                onClick={handleToggleWishlist}
                className={`min-h-[52px] px-4 border rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'border-myntra-pink text-myntra-pink bg-pink-50'
                    : 'border-gray-300 text-gray-700 hover:border-gray-900'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-myntra-pink' : ''}`} />
              </button>
            </div>

            {/* Delivery & Pincode Checker */}
            <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50/50">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-bold text-gray-900 uppercase tracking-wider">
                  <Truck className="w-4 h-4 text-myntra-pink" />
                  <span>Delivery Options</span>
                </div>
              </div>

              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                <input
                  type="text"
                  placeholder="Enter pincode"
                  defaultValue="560032"
                  className="flex-1 px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
                />
                <button
                  type="button"
                  className="text-xs font-bold text-myntra-pink px-4 py-2 hover:bg-pink-50 border-l border-gray-200 uppercase"
                >
                  Check
                </button>
              </div>

              <ul className="text-xs text-gray-600 space-y-2 pt-1">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Get it by <strong className="text-gray-900">Tomorrow</strong>, Free Shipping</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pay on delivery available</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Easy 14 days return & exchange available</span>
                </li>
              </ul>
            </div>

            {/* Fabric Specification Section */}
            {product.fabricSpecs && (
              <div className="border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-myntra-pink" />
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Tactile Fabric Specifications
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-gray-50 p-2.5 rounded-lg">
                    <span className="text-gray-400 text-[10px] uppercase font-bold block">Material</span>
                    <span className="font-bold text-gray-900">{product.fabricSpecs.material}</span>
                  </div>
                  <div className="bg-gray-50 p-2.5 rounded-lg">
                    <span className="text-gray-400 text-[10px] uppercase font-bold block">Weave / Knit</span>
                    <span className="font-bold text-gray-900">{product.fabricSpecs.weave}</span>
                  </div>
                  <div className="bg-gray-50 p-2.5 rounded-lg">
                    <span className="text-gray-400 text-[10px] uppercase font-bold block">Transparency</span>
                    <span className="font-bold text-gray-900">{product.fabricSpecs.transparency}</span>
                  </div>
                  <div className="bg-gray-50 p-2.5 rounded-lg">
                    <span className="text-gray-400 text-[10px] uppercase font-bold block">Drape / Feel</span>
                    <span className="font-bold text-gray-900">{product.fabricSpecs.feel}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
};


