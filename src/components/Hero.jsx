import React from 'react';
import { 
  Tv, 
  Flame, 
  Trees, 
  Coffee, 
  CalendarDays,
  UtensilsCrossed
} from 'lucide-react';

export default function Hero({ onOpenReservation, onScrollToMenu, lang }) {
  return (
    <section className="pt-10 pb-12 sm:pt-16 sm:pb-16 text-center border-b border-white/[0.06]">
      <div className="container-custom max-w-3xl mx-auto">
        
        {/* Subtle Campaign Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-[#d8b772] mb-6">
          <Flame size={14} className="text-amber-400" />
          <span className="font-semibold">🔥 الشتاء في Seven له حكاية تانية 🔥</span>
          <span className="text-[#71717a] hidden sm:inline">• دفايات خارجية وأجواء دافئة</span>
        </div>

        {/* Brand Main Title */}
        <h1 className="font-brand text-4xl sm:text-6xl font-black tracking-wider text-[#f5f5f7] mb-2">
          7 SEVEN
        </h1>
        <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#c5a059] font-semibold mb-4">
          SPECIALTY COFFEE • OUTDOOR CAFÉ
        </p>

        {/* Slogan */}
        <h2 className="text-xl sm:text-3xl font-extrabold text-[#f5f5f7] mb-3 leading-snug">
          "أقوى قعدة أوت دور ومتابعة للمباريات"
        </h2>
        
        <p className="text-xs sm:text-sm text-[#a1a1aa] max-w-lg mx-auto leading-relaxed mb-8">
          أجواء هادئة في الهواء الطلق، مساحات خضراء، شاشات عرض عملاقة لأقوى المباريات، مع منيو متكامل يضم أكثر من 100 صنف من القهوة المختصة، الفطائر والبيتزا.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onScrollToMenu}
            className="btn-gold px-6 py-2.5 text-xs sm:text-sm"
          >
            <UtensilsCrossed size={16} />
            <span>تصفح المنيو واطلب</span>
          </button>

          <button
            onClick={onOpenReservation}
            className="btn-outline-gold px-5 py-2.5 text-xs sm:text-sm"
          >
            <CalendarDays size={16} className="text-[#c5a059]" />
            <span>حجز طاولة</span>
          </button>
        </div>

        {/* Minimal Feature Pills (Calm & Uncluttered) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-8 pt-6 border-t border-white/[0.05] text-xs text-[#a1a1aa]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.05]">
            <Tv size={13} className="text-[#c5a059]" />
            <span>شاشات عرض عملاقة</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.05]">
            <Trees size={13} className="text-emerald-400" />
            <span>قعدة أوت دور ونجيل أخضر</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.05]">
            <Flame size={13} className="text-amber-400" />
            <span>دفايات شتوية Patio Heaters</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.05]">
            <Coffee size={13} className="text-[#c5a059]" />
            <span>بن مختص وفطائر طازجة</span>
          </span>
        </div>

      </div>
    </section>
  );
}
