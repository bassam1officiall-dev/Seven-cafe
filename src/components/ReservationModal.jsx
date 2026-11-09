import React, { useState } from 'react';
import { X, CalendarDays, Users, Clock, Flame, Tv, Trees, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const SEATING_ZONES = [
  { id: 'match_screen', nameAr: 'أمام شاشة العرض العملاقة للمباريات', icon: Tv },
  { id: 'outdoor_garden', nameAr: 'جلسة الحديقة المفتوحة والنجيل الأخضر', icon: Trees },
  { id: 'winter_heaters', nameAr: 'الجلسة الشتوية الدافئة بجوار الدفايات', icon: Flame },
  { id: 'indoor', nameAr: 'الجلسة الداخلية الهادئة', icon: CalendarDays },
];

export default function ReservationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guestsCount, setGuestsCount] = useState('2');
  const [date, setDate] = useState('اليوم');
  const [time, setTime] = useState('08:00 مساءً');
  const [selectedZone, setSelectedZone] = useState('match_screen');
  const [notes, setNotes] = useState('');

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      alert('من فضلك أدخل الاسم ورقم الهاتف لإتمام الحجز');
      return;
    }

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    const zoneObj = SEATING_ZONES.find(z => z.id === selectedZone);

    let msg = `*طلب حجز طاولة في كافيه 7 SEVEN* 🌿⚽\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📍 *الفرع:* فرع البدرشين - البدرشين - الجيزة\n`;
    msg += `👤 *الاسم:* ${name.trim()}\n`;
    msg += `📞 *الهاتف:* ${phone.trim()}\n`;
    msg += `👥 *عدد الأفراد:* ${guestsCount} أفراد\n`;
    msg += `📅 *الموعد:* ${date} (${time})\n`;
    msg += `🪑 *الجلسة:* ${zoneObj ? zoneObj.nameAr : selectedZone}\n`;
    if (notes.trim()) {
      msg += `📝 *ملاحظات:* ${notes.trim()}\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `_أرجو تأكيد الحجز وتجهيز الطاولة_`;

    const encoded = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/201128586856?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content max-w-md p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} className="text-[#c5a059]" />
            <h3 className="text-sm sm:text-base font-bold text-[#f5f5f7]">
              حجز طاولة - كافيه 7 SEVEN
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center text-[#a1a1aa]"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleBookingSubmit} className="space-y-3.5 my-4">
          
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-[#a1a1aa] mb-1">الاسم:</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسمك الكريم"
                className="w-full px-3 py-1.5 rounded-xl bg-[#161619] border border-white/[0.08] text-xs text-[#f5f5f7] focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#a1a1aa] mb-1">الهاتف:</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01128586856"
                className="w-full px-3 py-1.5 rounded-xl bg-[#161619] border border-white/[0.08] text-xs text-[#f5f5f7] focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-[#a1a1aa] mb-1">العدد:</label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(e.target.value)}
                className="w-full px-2 py-1.5 rounded-xl bg-[#161619] border border-white/[0.08] text-xs text-[#f5f5f7] focus:outline-none focus:border-[#c5a059]"
              >
                <option value="1">1 فرد</option>
                <option value="2">2 أفراد</option>
                <option value="3-4">3 إلى 4</option>
                <option value="5-8">5 إلى 8</option>
                <option value="10+">10+ أفراد</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#a1a1aa] mb-1">اليوم:</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-2 py-1.5 rounded-xl bg-[#161619] border border-white/[0.08] text-xs text-[#f5f5f7] focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#a1a1aa] mb-1">الساعة:</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-2 py-1.5 rounded-xl bg-[#161619] border border-white/[0.08] text-xs text-[#f5f5f7] focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#a1a1aa] mb-1.5">
              مكان الجلسة:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {SEATING_ZONES.map((zone) => {
                const Icon = zone.icon;
                const isSelected = selectedZone === zone.id;

                return (
                  <div
                    key={zone.id}
                    onClick={() => setSelectedZone(zone.id)}
                    className={`p-2 rounded-xl border cursor-pointer transition flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#c5a059]/10 border-[#c5a059]'
                        : 'bg-[#161619] border-white/[0.05] hover:border-white/[0.12]'
                    }`}
                  >
                    <Icon size={14} className={isSelected ? 'text-[#c5a059]' : 'text-[#71717a]'} />
                    <span className="text-xs text-[#f5f5f7] truncate">
                      {zone.nameAr}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#a1a1aa] mb-1">ملاحظة:</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="مثال: مقاعد بالقرب من الشاشة لمتابعة المباراة"
              className="w-full px-3 py-1.5 rounded-xl bg-[#161619] border border-white/[0.08] text-xs text-[#f5f5f7] focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <button
            type="submit"
            className="btn-gold w-full py-2.5 text-xs font-bold"
          >
            <MessageCircle size={15} />
            <span>تأكيد الحجز عبر واتساب (01128586856)</span>
          </button>

        </form>

      </div>
    </div>
  );
}
