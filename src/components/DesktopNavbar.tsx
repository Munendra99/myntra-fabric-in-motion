import React from 'react';
import { Search, User, Heart, ShoppingBag } from 'lucide-react';

interface DesktopNavbarProps {
  bagCount: number;
  wishlistCount: number;
  onNavigateHome: () => void;
}

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  bagCount,
  wishlistCount,
  onNavigateHome,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-xs w-full hidden md:block">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Myntra Logo & Nav Categories */}
        <div className="flex items-center gap-8 lg:gap-10">
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 focus:outline-none group"
          >
            <div className="w-11 h-9 bg-gradient-to-tr from-[#FF3E6C] via-[#FF5722] to-[#FF905A] rounded-lg flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xl tracking-tighter italic">M</span>
            </div>
          </button>

          {/* Nav Categories */}
          <nav className="flex items-center gap-6 lg:gap-8 text-[13px] font-bold tracking-wider text-gray-800">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-myntra-pink py-6 border-b-4 border-transparent hover:border-myntra-pink transition-all"
            >
              MEN
            </button>
            <button
              type="button"
              onClick={onNavigateHome}
              className="text-myntra-pink py-6 border-b-4 border-myntra-pink transition-all"
            >
              WOMEN
            </button>
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-myntra-pink py-6 border-b-4 border-transparent hover:border-myntra-pink transition-all"
            >
              KIDS
            </button>
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-myntra-pink py-6 border-b-4 border-transparent hover:border-myntra-pink transition-all"
            >
              HOME & LIVING
            </button>
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-myntra-pink py-6 border-b-4 border-transparent hover:border-myntra-pink transition-all"
            >
              BEAUTY
            </button>
            <div className="relative py-6">
              <button
                type="button"
                onClick={onNavigateHome}
                className="hover:text-myntra-pink border-b-4 border-transparent hover:border-myntra-pink transition-all"
              >
                STUDIO
              </button>
              <span className="absolute top-3.5 -right-5 bg-myntra-pink text-white text-[9px] font-bold px-1 rounded-full uppercase">
                NEW
              </span>
            </div>
          </nav>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md mx-6 lg:mx-10">
          <div className="relative flex items-center bg-gray-100 hover:bg-gray-50 focus-within:bg-white focus-within:ring-1 focus-within:ring-gray-300 rounded-md px-3.5 py-2.5 transition-all">
            <Search className="w-4 h-4 text-gray-500 mr-2.5 shrink-0" />
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full bg-transparent text-xs text-gray-800 placeholder-gray-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Right: User Actions (Profile, Wishlist, Bag) */}
        <div className="flex items-center gap-7 text-gray-700">
          <button
            type="button"
            className="flex flex-col items-center gap-1 hover:text-myntra-pink transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="text-[11px] font-bold">Profile</span>
          </button>

          <button
            type="button"
            onClick={onNavigateHome}
            className="flex flex-col items-center gap-1 text-myntra-pink hover:text-myntra-pinkHover transition-colors relative"
          >
            <div className="relative">
              <Heart className="w-5 h-5 fill-myntra-pink text-myntra-pink" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-myntra-pink text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="text-[11px] font-bold">Wishlist</span>
          </button>

          <button
            type="button"
            className="flex flex-col items-center gap-1 hover:text-myntra-pink transition-colors relative"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-gray-800" />
              {bagCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-myntra-pink text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {bagCount}
                </span>
              )}
            </div>
            <span className="text-[11px] font-bold">Bag</span>
          </button>
        </div>
      </div>
    </header>
  );
};
