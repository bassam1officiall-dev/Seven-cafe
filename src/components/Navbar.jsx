import React from 'react';
import { 
  Phone, 
  MessageCircle, 
  CalendarDays, 
  ShoppingBag, 
  LayoutGrid, 
  List,
  ShieldCheck
} from 'lucide-react';

export default function Navbar({ 
  viewMode, 
  setViewMode, 
  cartCount, 
  cartTotal, 
  onOpenCart, 
  onOpenReservation, 
  onOpenAdmin,
  lang 
}) {
  const isAr = lang === 'ar';

  return (
    <header className="sticky top-0 z-50 bg-[#0b0b0cd9] backdrop-blur-md border-b border-white/[0.08]">
      <div className="container-custom">
        <div className="flex items-center justify-between py-3.5">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#c5a059]/40 bg-[#161619] flex items-center justify-center shadow-sm">
              <span className="font-brand text-xl font-black text-[#c5a059]">7</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-brand text-lg sm:text-xl font-bold tracking-wider text-[#f5f5f7]">
                  SEVEN
                </span>
                <span className="text-[11px] text-[#a1a1aa] px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08]">
                  فرع البدرشين
                </span>
              </div>
              <div className="text-[10px] tracking-widest text-[#71717a] uppercase font-medium">
                SPECIALTY COFFEE • CAFÉ
              </div>
            </div>
          </div>

          {/* Actions & Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* View Mode Switcher */}
            <div className="flex items-center bg-[#161619] border border-white/[0.08] rounded-full p-0.5">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 sm:px-2.5 sm:py-1 rounded-full text-xs transition ${
                  viewMode === 'cards'
                    ? 'bg-[#27272a] text-[#f5f5f7] font-bold'
                    : 'text-[#71717a] hover:text-[#a1a1aa]'
                }`}
                title="عرض البطاقات"
              >
                <LayoutGrid size={14} />
              </button>
              <button
                onClick={() => setViewMode('classic')}
                className={`p-1.5 sm:px-2.5 sm:py-1 rounded-full text-xs transition ${
                  viewMode === 'classic'
                    ? 'bg-[#27272a] text-[#f5f5f7] font-bold'
                    : 'text-[#71717a] hover:text-[#a1a1aa]'
                }`}
                title="عرض القائمة الكلاسيكي"
              >
                <List size={14} />
              </button>
            </div>

            {/* Quick Reservation Pill */}
            <button
              onClick={onOpenReservation}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#f5f5f7] bg-white/[0.04] border border-white/[0.08] hover:border-[#c5a059]/40 transition"
            >
              <CalendarDays size={13} className="text-[#c5a059]" />
              <span>حجز طاولة</span>
            </button>

            {/* WhatsApp */}
            <a
              href="https://wa.me/201128586856"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-emerald-500/40 flex items-center justify-center text-[#a1a1aa] hover:text-emerald-400 transition"
              title="واتساب: 01128586856"
            >
              <MessageCircle size={15} />
            </a>

            {/* Phone Call */}
            <a
              href="tel:01128586856"
              className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-[#c5a059]/40 flex items-center justify-center text-[#a1a1aa] hover:text-[#c5a059] transition"
              title="اتصال: 01128586856"
            >
              <Phone size={14} />
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#c5a059] text-[#0b0b0c] font-bold text-xs hover:bg-[#d8b772] transition"
            >
              <ShoppingBag size={14} />
              <span>الطلب</span>
              {cartCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#0b0b0c] text-[#c5a059] text-[10px] flex items-center justify-center font-black">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Key */}
            <button
              onClick={onOpenAdmin}
              className="w-8 h-8 rounded-full border border-white/[0.06] flex items-center justify-center text-[#71717a] hover:text-[#c5a059] transition"
              title="لوحة الإدارة"
            >
              <ShieldCheck size={14} />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
