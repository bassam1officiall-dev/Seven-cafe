import React from 'react';

export default function Footer({ onOpenReservation }) {
  return (
    <footer className="border-t border-white/[0.08] py-12 text-xs text-[#88847c]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          <div>
            <div className="font-display text-lg text-[#f0eee9] font-medium mb-1">
              7 SEVEN
            </div>
            <p className="leading-relaxed text-[#88847c] max-w-xs">
              Specialty Coffee & Kitchen. فرع البدرشين، الجيزة. مساحة خارجية في الهواء الطلق ومتابعة للمباريات.
            </p>
          </div>

          <div>
            <div className="font-medium text-[#f0eee9] uppercase tracking-wider text-[11px] mb-3">
              الاتصال والفرع
            </div>
            <ul className="space-y-1.5 leading-loose">
              <li>
                <a href="tel:01128586856" className="hover:text-[#f0eee9] transition" dir="ltr">
                  01128586856
                </a>
              </li>
              <li>
                <a href="https://wa.me/201128586856" target="_blank" rel="noreferrer" className="hover:text-[#f0eee9] transition">
                  واتساب الطلبات والحجز
                </a>
              </li>
              <li>
                <a href="mailto:sevencafe2026@gmail.com" className="hover:text-[#f0eee9] transition">
                  sevencafe2026@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-medium text-[#f0eee9] uppercase tracking-wider text-[11px] mb-3">
              روابط
            </div>
            <ul className="space-y-1.5 leading-loose">
              <li>
                <a href="https://www.facebook.com/share/p/1A1eoMz9SZ/" target="_blank" rel="noreferrer" className="hover:text-[#f0eee9] transition">
                  Facebook Page
                </a>
              </li>
              <li>
                <button onClick={onOpenReservation} className="hover:text-[#f0eee9] transition underline decoration-dotted">
                  حجز طاولة للقعدة الخارجية
                </button>
              </li>
              <li>
                <span>مواعيد العمل: 09:00 ص – 02:00 ص</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#55524c]">
          <span>7 SEVEN Specialty Coffee & Kitchen</span>
          <span>El-Badrashein, Giza</span>
        </div>
      </div>
    </footer>
  );
}
