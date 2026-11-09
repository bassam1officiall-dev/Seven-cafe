import React from 'react';
import { 
  Tv, 
  Flame, 
  CalendarDays,
  Sparkles,
  Trophy,
  ArrowLeft
} from 'lucide-react';

export default function Hero({ matchInfo, onOpenReservation, onScrollToMenu }) {
  return (
    <section className="pt-4 pb-2">
      <div className="container-custom">
        
        {/* Compact, Luxury Mobile-First Banner */}
        <div className="chic-card p-4 sm:p-6 bg-gradient-to-b from-[#18181c] to-[#121215] border border-white/[0.08] relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Title & Slogan */}
            <div className="text-center md:text-right w-full md:w-auto">
              
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/25 text-[11px] font-bold text-[#c5a059] mb-2">
                <Flame size={12} className="text-amber-400" />
                <span>🔥 الشتاء في Seven له حكاية تانية • دفايات خارجية</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-[#f5f5f7] leading-tight">
                أقوى قعدة أوت دور ومتابعة للمباريات ⚽🌿
              </h1>

              <p className="text-xs text-[#a1a1aa] mt-1 leading-relaxed max-w-lg">
                استمتع بالقهوة المختصة وأشهى الفطائر والبيتزا مع شاشات عرض عملاقة في الهواء الطلق.
              </p>

            </div>

            {/* Tonight Match Quick Card (Compact Pill on Mobile) */}
            {matchInfo && matchInfo.active && (
              <div 
                onClick={onOpenReservation}
                className="w-full md:w-auto p-3 rounded-xl bg-black/40 border border-[#c5a059]/30 hover:border-[#c5a059] transition cursor-pointer flex items-center justify-between gap-3 shrink-0"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] shrink-0">
                    <Trophy size={15} />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#c5a059] font-bold">
                      {matchInfo.competition} • {matchInfo.time}
                    </div>
                    <div className="text-xs sm:text-sm font-black text-[#f5f5f7]">
                      {matchInfo.teamA} <span className="text-[#8e8e93] font-normal">vs</span> {matchInfo.teamB}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="px-3 py-1.5 rounded-full bg-[#c5a059] text-black text-xs font-extrabold flex items-center gap-1 shrink-0"
                >
                  <span>حجز طاولة</span>
                  <ArrowLeft size={12} />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
