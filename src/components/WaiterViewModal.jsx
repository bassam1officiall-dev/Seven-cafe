import React from 'react';
import { X, CheckCircle, Hash } from 'lucide-react';

export default function WaiterViewModal({ orderData, onClose }) {
  if (!orderData) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content max-w-sm p-5 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 text-right">
            <span className="font-brand text-lg font-bold text-[#f5f5f7]">7 SEVEN</span>
            <span className="text-[11px] text-[#71717a]">فرع البدرشين</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full bg-white/[0.05] text-[#a1a1aa]">
            <X size={15} />
          </button>
        </div>

        <div className="my-2 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
          <div className="text-[11px] text-[#71717a]">رقم الطاولة</div>
          <div className="text-xl font-bold text-[#f5f5f7] flex items-center justify-center gap-1 mt-0.5">
            <Hash size={18} className="text-[#c5a059]" />
            <span>{orderData.table || "طاولة الضيف"}</span>
          </div>
          <div className="text-[10px] text-[#a1a1aa] mt-0.5">
            {orderData.type === 'dine_in' ? 'داخل الكافيه / أوت دور' : 'طلب خارجي'}
          </div>
        </div>

        {/* Itemized list for Waiter */}
        <div className="my-3 text-right space-y-2 max-h-56 overflow-y-auto pr-1">
          {orderData.items.map((it, idx) => (
            <div key={idx} className="p-2.5 bg-[#161619] rounded-xl border border-white/[0.04] flex items-start justify-between">
              <div>
                <div className="text-xs font-bold text-[#f5f5f7]">
                  {it.quantity}× {it.nameAr}
                </div>
                {it.selectedSugar && (
                  <div className="text-[10px] text-[#c5a059]">
                    سكر: {it.selectedSugar === 'medium' ? 'مظبوط' : it.selectedSugar}
                  </div>
                )}
                {it.selectedFlavor && (
                  <div className="text-[10px] text-[#71717a]">نكهة: {it.selectedFlavor}</div>
                )}
                {it.selectedAddons && it.selectedAddons.length > 0 && (
                  <div className="text-[10px] text-[#c5a059]">
                    +{it.selectedAddons.map(a => a.nameAr).join(', ')}
                  </div>
                )}
                {it.specialNotes && (
                  <div className="text-[10px] text-[#d8b772] italic">"{it.specialNotes}"</div>
                )}
              </div>
              <div className="text-xs font-semibold text-[#f5f5f7]">
                {(it.calculatedPrice || it.price) * it.quantity} ج.م
              </div>
            </div>
          ))}
        </div>

        {/* Grand Total */}
        <div className="p-2.5 bg-white/[0.03] rounded-xl border border-white/[0.06] flex justify-between items-center mb-4">
          <span className="text-xs text-[#a1a1aa]">المطلوب:</span>
          <span className="text-base font-bold text-[#c5a059]">{orderData.total} ج.م</span>
        </div>

        <button
          onClick={onClose}
          className="btn-gold w-full py-2 text-xs font-bold"
        >
          <CheckCircle size={14} />
          <span>تم إبلاغ الكابتن</span>
        </button>
      </div>
    </div>
  );
}
