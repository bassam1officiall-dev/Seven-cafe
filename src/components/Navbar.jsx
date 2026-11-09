import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  onOpenReservation, 
  onOpenAdmin 
}) {
  return (
    <header className="sticky top-0 z-50 bg-[#111112]/95 backdrop-blur-md border-b border-white/[0.08] h-16">
      <div className="container-custom h-full flex items-center justify-between">
        
        {/* Brand Wordmark */}
        <div className="flex items-baseline gap-2.5">
          <span className="font-display text-2xl font-semibold tracking-wider text-[#f0eee9]">
            7 SEVEN
          </span>
          <span className="text-xs text-[#88847c] font-medium hidden sm:inline">
            فرع البدرشين
          </span>
        </div>

        {/* Minimal Navigation & Actions */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
          <a 
            href="tel:01128586856" 
            className="text-[#88847c] hover:text-[#f0eee9] transition hidden sm:inline"
            dir="ltr"
          >
            01128586856
          </a>

          <button
            onClick={onOpenReservation}
            className="text-[#88847c] hover:text-[#f0eee9] transition"
          >
            حجز طاولة
          </button>

          <button
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 py-1.5 px-3 border border-white/[0.18] hover:border-[#c29d68] transition rounded-sm text-xs font-semibold"
          >
            <span>الطلب</span>
            <span className="text-[#c29d68] font-mono font-bold">
              {cartCount}
            </span>
          </button>

          <button
            onClick={onOpenAdmin}
            className="text-[#55524c] hover:text-[#88847c] text-xs transition hidden md:inline"
            title="الإدارة"
          >
            إدارة
          </button>
        </div>

      </div>
    </header>
  );
}
