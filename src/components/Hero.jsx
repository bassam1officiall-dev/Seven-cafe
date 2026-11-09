import React from 'react';

export default function Hero({ onOpenReservation }) {
  return (
    <section className="py-12 sm:py-16 border-b border-white/[0.08]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          
          <div className="max-w-xl">
            <div className="font-body text-xs uppercase tracking-[0.14em] text-[#c29d68] font-medium mb-3">
              Specialty Coffee & Kitchen
            </div>
            
            <h1 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-[#f0eee9] leading-[1.15] mb-3">
              أقوى قعدة أوت دور ومتابعة للمباريات
            </h1>

            <p className="text-sm sm:text-base text-[#88847c] leading-relaxed">
              مساحة خارجية هادئة في الهواء الطلق، شاشات عرض سينمائية مباشرة، ودفايات شتوية، مع تشكيلة من القهوة المختصة والفطائر والبيتزا.
            </p>
          </div>

          <div className="text-right text-xs text-[#88847c] space-y-1.5 border-r md:border-r-0 md:border-l border-white/[0.08] pr-4 md:pr-0 md:pl-6 shrink-0 w-full md:w-auto">
            <div>
              <span className="text-[#55524c]">الموقع:</span>{' '}
              <span className="text-[#f0eee9] font-medium">البدرشين، الجيزة</span>
            </div>
            <div>
              <span className="text-[#55524c]">المواعيد:</span>{' '}
              <span className="text-[#f0eee9] font-medium">09:00 ص – 02:00 ص</span>
            </div>
            <div>
              <span className="text-[#55524c]">الخدمة:</span>{' '}
              <span className="text-[#f0eee9] font-medium">جلسات خارجية • استلام</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
