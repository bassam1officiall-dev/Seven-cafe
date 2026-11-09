import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  CalendarDays, 
  ShoppingBag, 
  LayoutGrid, 
  List,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

export default function Navbar({ 
  viewMode, 
  setViewMode, 
  cartCount, 
  cartTotal, 
  onOpenCart, 
  onOpenReservation, 
  onOpenAdmin 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0d0d10]/95 backdrop-blur-md border-b border-white/[0.08]">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#18181c] border border-[#c5a059]/40 flex items-center justify-center shrink-0">
              <span className="font-brand text-xl font-black text-[#c5a059] leading-none">7</span>
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="font-brand text-lg font-black tracking-wider text-[#f5f5f7]">
                  SEVEN
                </span>
                <span className="text-[11px] font-bold text-[#c5a059] px-2 py-0.5 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/20">
                  البدرشين
                </span>
              </div>
              <div className="text-[10px] text-[#8e8e93] font-medium tracking-wide">
                SPECIALTY COFFEE • CAFÉ
              </div>
            </div>
          </div>

          {/* Right Action Controls (Mobile Optimized: No overlapping) */}
          <div className="flex items-center gap-2">
            
            {/* View Mode Toggle (Cards / List) */}
            <div className="flex items-center bg-[#18181c] border border-white/[0.08] rounded-full p-1">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-full transition ${
                  viewMode === 'cards'
                    ? 'bg-[#c5a059] text-black shadow-sm'
                    : 'text-[#8e8e93] hover:text-[#f5f5f7]'
                }`}
                title="عرض البطاقات"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setViewMode('classic')}
                className={`p-1.5 rounded-full transition ${
                  viewMode === 'classic'
                    ? 'bg-[#c5a059] text-black shadow-sm'
                    : 'text-[#8e8e93] hover:text-[#f5f5f7]'
                }`}
                title="عرض القائمة"
              >
                <List size={15} />
              </button>
            </div>

            {/* Quick WhatsApp Link */}
            <a
              href="https://wa.me/201128586856"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-[#18181c] border border-white/[0.08] flex items-center justify-center text-emerald-400 hover:border-emerald-500/40 transition shrink-0"
              title="واتساب الكافيه"
            >
              <MessageCircle size={16} />
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="h-9 px-3 rounded-full bg-[#c5a059] text-black font-extrabold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition shrink-0"
            >
              <ShoppingBag size={15} />
              <span>الطلب</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-black text-[#c5a059] text-xs flex items-center justify-center font-black">
                  {cartCount}
                </span>
              )}
            </button>

            {/* More Menu Toggle (Mobile) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-full bg-[#18181c] border border-white/[0.08] flex items-center justify-center text-[#8e8e93] hover:text-[#f5f5f7] transition shrink-0"
            >
              {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>

          </div>

        </div>

        {/* Dropdown Mobile Menu for Extra Tools */}
        {mobileMenuOpen && (
          <div className="py-3 px-2 border-t border-white/[0.08] bg-[#121215] rounded-b-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1c1c22] border border-white/[0.08] text-[#f5f5f7] font-bold"
              >
                <CalendarDays size={15} className="text-[#c5a059]" />
                <span>حجز طاولة للمباريات</span>
              </button>

              <a
                href="tel:01128586856"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1c1c22] border border-white/[0.08] text-[#f5f5f7] font-bold"
              >
                <Phone size={15} className="text-[#c5a059]" />
                <span>اتصال: 01128586856</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="col-span-2 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/[0.03] text-[#8e8e93] text-[11px]"
              >
                <ShieldCheck size={14} />
                <span>لوحة تحكم وتعديل أسعار الكافيه (Admin)</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
