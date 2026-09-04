import React, { useState, useEffect } from 'react';
import { mockProducts } from './data/mockProducts';
import { Product } from './types/product';
import { WishlistPage } from './pages/WishlistPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { MobileContainer } from './components/MobileContainer';
import { VideoModal } from './components/VideoModal';

export const App: React.FC = () => {
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [modalVideoProduct, setModalVideoProduct] = useState<Product | null>(null);
  const [bagCount, setBagCount] = useState<number>(3); // Matches 3 on screenshot shopping bag badge

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
    handleHashChange(); // check on initial mount

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectProduct = (productId: string) => {
    window.location.hash = `#/product/${productId}`;
    setCurrentProductId(productId);
  };

  const handleBackToWishlist = () => {
    window.location.hash = '#/wishlist';
    setCurrentProductId(null);
  };

  const handleAddToBag = (_productId: string) => {
    setBagCount((prev) => prev + 1);
  };

  const currentProduct = mockProducts.find((p) => p.id === currentProductId);

  return (
    <MobileContainer>
      {currentProduct ? (
        <ProductDetailPage
          product={currentProduct}
          onBack={handleBackToWishlist}
          onAddToBag={handleAddToBag}
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

      {/* Instant Watch Video Modal (Directly fulfills user MVP requirement) */}
      <VideoModal
        product={modalVideoProduct}
        onClose={() => setModalVideoProduct(null)}
        onSelectProduct={handleSelectProduct}
        onAddToBag={handleAddToBag}
      />
    </MobileContainer>
  );
};

export default App;
