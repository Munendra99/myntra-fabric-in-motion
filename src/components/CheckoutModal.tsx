import React, { useState } from 'react';
import {
  X,
  MapPin,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  CreditCard,
  Banknote,
  Smartphone,
  ChevronRight,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { Product } from '../types/product';

interface CheckoutModalProps {
  isOpen: boolean;
  product: Product | null;
  selectedSize?: string;
  onClose: () => void;
  onOrderSuccess?: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  product,
  selectedSize = 'Free Size',
  onClose,
  onOrderSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState<'checkout' | 'processing' | 'success'>('checkout');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('cod');
  const [activeSize, setActiveSize] = useState<string>(selectedSize);
  const [orderId, setOrderId] = useState<string>('');

  // Update active size if selectedSize changes
  React.useEffect(() => {
    if (product) {
      setActiveSize(selectedSize || product.sizes[0] || 'Free Size');
      setCurrentStep('checkout');
    }
  }, [product, selectedSize, isOpen]);

  if (!isOpen || !product) return null;

  const discountAmount = product.mrp - product.price;

  const handlePlaceOrder = () => {
    setCurrentStep('processing');
    const generatedId = `MYN-${Math.floor(10000000 + Math.random() * 90000000)}`;
    setOrderId(generatedId);

    setTimeout(() => {
      setCurrentStep('success');
      if (onOrderSuccess) {
        onOrderSuccess(generatedId);
      }
    }, 1200);
  };

  const handleResetAndClose = () => {
    setCurrentStep('checkout');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn"
      onClick={handleResetAndClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================================= */}
        {/* STEP 1: CHECKOUT & ORDER SUMMARY                                          */}
        {/* ========================================================================= */}
        {currentStep === 'checkout' && (
          <>
            {/* Header */}
            <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-3.5 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="p-1 -ml-1 text-gray-700 hover:text-myntra-pink transition-colors"
                  aria-label="Back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h3 className="text-sm font-extrabold text-gray-900 tracking-wide uppercase">
                    Order Summary
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                    <ShieldCheck className="w-3 h-3" />
                    <span>100% Verified Secure Checkout</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Checkout Content */}
            <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-3.5 divide-y divide-gray-100 text-gray-800">
              {/* Delivery Address Card */}
              <div className="pt-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 uppercase tracking-wider">
                    <MapPin className="w-4 h-4 text-myntra-pink" />
                    <span>Deliver to</span>
                  </div>
                  <span className="text-[10px] font-bold text-myntra-pink bg-pink-50 border border-pink-200 px-2 py-0.5 rounded-full">
                    DEFAULT HOME
                  </span>
                </div>

                <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-3 flex items-start justify-between">
                  <div className="text-xs space-y-0.5 pr-2">
                    <p className="font-bold text-gray-900">John Doe • 9876543210</p>
                    <p className="text-gray-600 leading-snug">
                      Brigade Towers, 29 Financial District, Gachibowli
                    </p>
                    <p className="text-gray-500 font-medium">Hyderabad, Telangana - 560032</p>
                  </div>
                  <button
                    type="button"
                    className="text-[11px] font-bold text-myntra-pink border border-myntra-pink hover:bg-pink-50 px-2.5 py-1 rounded-lg shrink-0 transition-colors uppercase"
                  >
                    Change
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-2 px-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 rounded-lg py-1.5 px-2.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    Guaranteed Delivery by <strong className="font-bold">Tomorrow, 11:00 AM</strong>
                  </span>
                </div>
              </div>

              {/* Product Item Summary */}
              <div className="pt-3.5">
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-2">
                  Item Details (1 Item)
                </span>

                <div className="flex gap-3 bg-white border border-gray-100 rounded-xl p-2.5 shadow-xs">
                  <div className="w-20 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0 relative">
                    <img
                      src={product.images[0]}
                      alt={product.description}
                      className="w-full h-full object-cover"
                    />
                    {product.video && (
                      <span className="absolute bottom-1 left-1 bg-black/70 backdrop-blur-xs text-[9px] font-bold text-white px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-myntra-pink" />
                        Video
                      </span>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <span className="text-[11px] font-bold text-gray-900 uppercase tracking-wider block">
                        {product.brand}
                      </span>
                      <p className="text-xs text-gray-600 line-clamp-2 leading-tight">
                        {product.description}
                      </p>
                    </div>

                    {/* Size Selector in Checkout */}
                    <div className="flex items-center gap-3 my-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-700">
                        <span className="text-gray-400 text-[11px]">Size:</span>
                        <div className="flex items-center gap-1">
                          {product.sizes.map((sz) => (
                            <button
                              key={sz}
                              type="button"
                              onClick={() => setActiveSize(sz)}
                              className={`px-2 py-0.5 text-[11px] font-bold rounded border transition-colors ${
                                activeSize === sz
                                  ? 'bg-gray-900 text-white border-gray-900 shadow-xs'
                                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">• Qty: 1</span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-extrabold text-gray-900">₹{product.price}</span>
                      <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
                      <span className="text-[11px] font-bold text-emerald-600">
                        ({product.discountPercent}% OFF)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fabric Verification Assurance */}
                <div className="mt-2 flex items-center justify-between text-[11px] text-gray-600 bg-pink-50/60 border border-pink-100 rounded-lg py-1.5 px-2.5">
                  <span className="flex items-center gap-1 font-semibold text-myntra-pink">
                    <Check className="w-3.5 h-3.5" /> Fabric Verified in Motion
                  </span>
                  <span className="text-gray-500">14 Days Easy Returns</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="pt-3.5">
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-2">
                  Select Payment Option
                </span>

                <div className="space-y-2">
                  <label
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-myntra-pink bg-pink-50/40 shadow-xs'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Banknote className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-gray-900">Cash on Delivery</span>
                          <span className="text-[10px] font-bold bg-emerald-600 text-white px-1.5 py-0.2 rounded">
                            POPULAR
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500">Pay cash or UPI at your doorstep</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-myntra-pink w-4 h-4"
                    />
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'border-myntra-pink bg-pink-50/40 shadow-xs'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-900 block">Instant UPI</span>
                        <p className="text-[11px] text-gray-500">Google Pay, PhonePe, Paytm</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-myntra-pink w-4 h-4"
                    />
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-myntra-pink bg-pink-50/40 shadow-xs'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-900 block">Credit / Debit Card</span>
                        <p className="text-[11px] text-gray-500">Visa, MasterCard, RuPay</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-myntra-pink w-4 h-4"
                    />
                  </label>
                </div>
              </div>

              {/* Price Details Breakdown */}
              <div className="pt-3.5 pb-2">
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-2">
                  Price Details (1 Item)
                </span>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Total MRP</span>
                    <span>₹{product.mrp}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount on MRP</span>
                    <span className="text-emerald-600 font-bold">-₹{discountAmount}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Convenience Fee</span>
                    <span className="text-emerald-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping Fee</span>
                    <div className="flex items-center gap-1">
                      <span className="line-through text-gray-400">₹99</span>
                      <span className="text-emerald-600 font-bold">FREE</span>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-gray-300 pt-2 flex justify-between font-extrabold text-sm text-gray-900">
                    <span>Total Amount</span>
                    <span className="text-base text-gray-950">₹{product.price}</span>
                  </div>
                </div>

                <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-center text-xs font-bold text-emerald-800">
                  🎉 You are saving ₹{discountAmount} on this order!
                </div>
              </div>
            </div>

            {/* Sticky Bottom Place Order CTA */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between shadow-lg">
              <div>
                <span className="text-lg font-extrabold text-gray-900 block leading-none">
                  ₹{product.price}
                </span>
                <span className="text-[10px] font-bold text-myntra-pink uppercase tracking-wide">
                  View Bill Breakup
                </span>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="py-3 px-8 rounded-xl bg-myntra-pink hover:bg-myntra-pinkHover text-white font-extrabold text-sm tracking-wide flex items-center gap-2 shadow-md shadow-pink-500/25 transition-transform active:scale-98"
              >
                <span>PLACE ORDER</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: PROCESSING ORDER ANIMATION                                        */}
        {/* ========================================================================= */}
        {currentStep === 'processing' && (
          <div className="py-20 px-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-pink-100 animate-ping opacity-50" />
              <div className="w-16 h-16 rounded-full border-4 border-t-myntra-pink border-r-transparent border-b-myntra-pink border-l-transparent animate-spin" />
              <ShoppingBag className="w-6 h-6 text-myntra-pink absolute" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-gray-900">Processing Your Order...</h4>
              <p className="text-xs text-gray-500">
                Confirming with Myntra fulfillment for {product.brand}
              </p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: ORDER CONFIRMED SUCCESS SCREEN                                    */}
        {/* ========================================================================= */}
        {currentStep === 'success' && (
          <div className="p-6 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
            {/* Success Checkmark */}
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-4 border-emerald-50 text-emerald-600 flex items-center justify-center shadow-md animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Order Placed Successfully
              </span>
              <h3 className="text-lg font-extrabold text-gray-900 pt-1">
                Thank you, John Doe!
              </h3>
              <p className="text-xs text-gray-500 font-mono">
                Order ID: <strong className="text-gray-800">{orderId}</strong>
              </p>
            </div>

            {/* Order Card Preview */}
            <div className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-left flex items-center gap-3">
              <img
                src={product.images[0]}
                alt={product.description}
                className="w-14 h-18 object-cover rounded-lg border border-gray-200"
              />
              <div className="flex-1 text-xs space-y-0.5">
                <span className="font-bold text-gray-900 uppercase block">{product.brand}</span>
                <p className="text-gray-600 truncate max-w-[200px]">{product.description}</p>
                <div className="flex items-center gap-2 pt-1 font-semibold text-gray-800">
                  <span>Size: {activeSize}</span>
                  <span>•</span>
                  <span>Amount: ₹{product.price}</span>
                </div>
              </div>
            </div>

            {/* Delivery Tracking Timeline */}
            <div className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-left shadow-xs">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-wide block mb-3">
                Delivery Timeline
              </span>
              <div className="space-y-3 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-400">
                <div className="relative">
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-xs flex items-center justify-center text-white text-[9px]">
                    ✓
                  </span>
                  <p className="text-xs font-bold text-gray-900">Order Confirmed</p>
                  <p className="text-[10px] text-gray-500">Today, Just now</p>
                </div>

                <div className="relative">
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow-xs" />
                  <p className="text-xs font-bold text-gray-900">Packed & Shipped</p>
                  <p className="text-[10px] text-gray-500">Expected by 8:00 PM today</p>
                </div>

                <div className="relative">
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-gray-300 border-2 border-white shadow-xs" />
                  <p className="text-xs font-bold text-gray-800">Out for Delivery</p>
                  <p className="text-[10px] text-gray-500">Tomorrow morning</p>
                </div>

                <div className="relative">
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-gray-300 border-2 border-white shadow-xs" />
                  <p className="text-xs font-bold text-gray-800">Delivery</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">Tomorrow by 11:00 AM</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="w-full pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-3 rounded-xl bg-myntra-pink hover:bg-myntra-pinkHover text-white font-bold text-xs tracking-wider uppercase transition-transform active:scale-98 shadow-md"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
