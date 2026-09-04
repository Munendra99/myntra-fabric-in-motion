import React, { useState, useEffect } from 'react';
import { mockProducts } from './data/mockProducts';
import { Product } from './types/product';
import { WishlistPage } from './pages/WishlistPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { MobileContainer } from './components/MobileContainer';
import { VideoModal } from './components/VideoModal';
import { CheckoutModal } from './components/CheckoutModal';
import { DesktopNavbar } from './components/DesktopNavbar';
import { useViewMode } from './context/ViewModeContext';

export const App: React.FC = () => {
  const { isDesktop } = useViewMode();
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);

  const [modalVideoProduct, setModalVideoProduct] = useState<Product | null>(null);
  const [bagCount, setBagCount] = useState<number>(3);

  // Instant Checkout state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [checkoutSize, setCheckoutSize] = useState<string>('Free Size');

  // Sync hash routing for natural back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/product/')) {
        const id = hash.replace('#/product/', '');
        setCurrentProductId(id);
      } else {
        setCurrentProductId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectProduct = (productId: string) => {
    window.location.hash = `#/product/${productId}`;
    setCurrentProductId(productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToWishlist = () => {
    window.location.hash = '#/wishlist';
    setCurrentProductId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToBag = (_productId: string) => {
    setBagCount((prev) => prev + 1);
  };

  const handleInitiateBuy = (product: Product, size?: string) => {
    setCheckoutProduct(product);
    setCheckoutSize(size || product.sizes[0] || 'Free Size');
    setIsCheckoutOpen(true);
  };

  const currentProduct = mockProducts.find((p) => p.id === currentProductId);

  return (
    <MobileContainer>
      {/* Real Myntra Desktop Navbar (rendered only in desktop mode) */}
      {isDesktop && (
        <DesktopNavbar
          bagCount={bagCount}
          wishlistCount={mockProducts.length}
          onNavigateHome={handleBackToWishlist}
        />
      )}

      {/* Main View */}

      {currentProduct ? (
        <ProductDetailPage
          product={currentProduct}
          onBack={handleBackToWishlist}
          onAddToBag={handleAddToBag}
          onBuyNow={(prod, sz) => handleInitiateBuy(prod, sz)}
          bagCount={bagCount}
        />
      ) : (
        <WishlistPage
          products={mockProducts}
          onSelectProduct={handleSelectProduct}
          onWatchVideo={(product) => setModalVideoProduct(product)}
          bagCount={bagCount}
          onAddToBag={handleAddToBag}
        />
      )}

      {/* Instant Watch Video Modal */}
      <VideoModal
        product={modalVideoProduct}
        onClose={() => setModalVideoProduct(null)}
        onSelectProduct={handleSelectProduct}
        onAddToBag={handleAddToBag}
        onBuyNow={(prod) => handleInitiateBuy(prod)}
      />

      {/* Real Myntra Checkout Flow Drawer & Order Confirmation */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        product={checkoutProduct}
        selectedSize={checkoutSize}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={(_orderId) => {
          setBagCount((prev) => Math.max(0, prev - 1));
        }}
      />
    </MobileContainer>
  );
};

export default App;
