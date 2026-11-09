import React from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  CalendarDays 
} from 'lucide-react';

function FacebookIcon({ size = 15, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

export default function Footer({ onOpenReservation }) {
  return (
    <footer className="bg-[#09090a] border-t border-white/[0.06] pt-12 pb-8">
      <div className="container-custom">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          
          {/* Brand & Vibe */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-brand text-2xl font-black text-[#f5f5f7]">
                7 SEVEN
              </span>
              <span className="text-[11px] text-[#c5a059] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
                فرع البدرشين
              </span>
            </div>
            <div className="text-[11px] uppercase tracking-widest text-[#71717a] font-medium mb-3">
              SPECIALTY COFFEE • CAFÉ
            </div>
            <p className="text-xs text-[#a1a1aa] leading-relaxed max-w-sm">
              أقوى قعدة أوت دور ومتابعة للمباريات في البدرشين. مساحات خضراء مفتوحة، شاشات عرض سينمائية، دفايات شتوية، وأشهى المشروبات والمأكولات.
            </p>
          </div>

          {/* Official Contacts */}
          <div>
            <h4 className="text-xs font-bold text-[#f5f5f7] uppercase tracking-wider mb-3">
              بيانات التواصل الرسمية
            </h4>

            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="tel:01128586856"
                  className="flex items-center gap-2 text-[#a1a1aa] hover:text-[#c5a059] transition"
                >
                  <Phone size={14} className="text-[#c5a059]" />
                  <span>اتصال: <strong className="text-[#f5f5f7]" dir="ltr">01128586856</strong></span>
                </a>
              </li>

              <li>
                <a
                  href="https://wa.me/201128586856"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[#a1a1aa] hover:text-emerald-400 transition"
                >
                  <MessageCircle size={14} className="text-emerald-400" />
                  <span>واتساب: <strong className="text-[#f5f5f7]" dir="ltr">+201128586856</strong></span>
                </a>
              </li>

              <li>
                <a
                  href="mailto:sevencafe2026@gmail.com"
                  className="flex items-center gap-2 text-[#a1a1aa] hover:text-[#c5a059] transition"
                >
                  <Mail size={14} className="text-[#c5a059]" />
                  <span>sevencafe2026@gmail.com</span>
                </a>
              </li>

              <li>
                <a
                  href="https://www.facebook.com/share/p/1A1eoMz9SZ/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[#a1a1aa] hover:text-blue-400 transition"
                >
                  <FacebookIcon size={14} className="text-blue-400" />
                  <span>فيسبوك: Seven cafe</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Reservation */}
          <div>
            <h4 className="text-xs font-bold text-[#f5f5f7] uppercase tracking-wider mb-3">
              الموقع وساعات العمل
            </h4>

            <div className="space-y-2.5 text-xs text-[#a1a1aa]">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-red-400 shrink-0 mt-0.5" />
                <span>📍 البدرشين - محافظة الجيزة</span>
              </div>

              <div className="flex items-start gap-2">
                <Clock size={14} className="text-[#c5a059] shrink-0 mt-0.5" />
                <span>يومياً: 09:00 صباحاً – 02:00 بعد منتصف الليل</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenReservation}
                  className="btn-outline-gold py-1.5 px-3.5 text-xs"
                >
                  <CalendarDays size={13} className="text-[#c5a059]" />
                  <span>احجز طاولة في القعدة الأوت دور</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#71717a]">
          <div>
            © {new Date().getFullYear()} 7 SEVEN CAFÉ • فرع البدرشين. جميع الحقوق محفوظة.
          </div>
          <div>
            Good Coffee, Great Vibes
          </div>
        </div>

      </div>
    </footer>
  );
}
