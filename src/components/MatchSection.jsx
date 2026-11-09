import React from 'react';
import { Tv, Trophy, Clock, ArrowLeft, Flame } from 'lucide-react';

export default function MatchSection({ matchInfo, onOpenReservation, lang }) {
  if (!matchInfo || !matchInfo.active) return null;

  return (
    <section className="py-8 border-b border-white/[0.06]">
      <div className="container-custom">
        <div className="chic-card p-5 sm:p-7 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Match Heading & Teams */}
            <div className="flex-1 text-center md:text-right">
              
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#c5a059] bg-[#c5a059]/10 px-3 py-1 rounded-full mb-3">
                <Trophy size={13} />
                <span>{matchInfo.competition || "مباراة الليلة"}</span>
                <span className="text-[#71717a]">•</span>
                <span className="text-[#a1a1aa]">{matchInfo.date}</span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4 my-2">
                <span className="text-lg sm:text-xl font-black text-[#f5f5f7]">
                  {matchInfo.teamA}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-white/[0.08] text-[#a1a1aa] font-bold">
                  VS
                </span>
                <span className="text-lg sm:text-xl font-black text-[#f5f5f7]">
                  {matchInfo.teamB}
                </span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3 text-xs text-[#a1a1aa] mt-2">
                <span className="flex items-center gap-1 text-[#d8b772]">
                  <Clock size={13} />
                  <span>{matchInfo.time}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Tv size={13} className="text-[#c5a059]" />
                  <span>شاشة العرض الأوت دور</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-400/90">
                  <Flame size={13} />
                  <span>دفايات شتوية متوفرة</span>
                </span>
              </div>

            </div>

            {/* Quick Booking CTA */}
            <div className="shrink-0">
              <button
                onClick={onOpenReservation}
                className="btn-gold text-xs sm:text-sm px-5 py-2.5"
              >
                <span>احجز طاولة للمباراة</span>
                <ArrowLeft size={14} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
