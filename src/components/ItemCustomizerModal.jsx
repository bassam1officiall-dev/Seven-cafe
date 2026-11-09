import React, { useState } from 'react';
import { X, Plus, Minus, Check } from 'lucide-react';
import { ADDONS_LIST } from '../data/menuData';

const SUGAR_OPTIONS = [
  { id: 'none', label: 'بدون سكر (سادة)' },
  { id: 'light', label: 'سكر خفيف (على الريحة)' },
  { id: 'medium', label: 'مظبوط' },
  { id: 'sweet', label: 'سكر زيادة' },
];

const FLAVOR_OPTIONS = [
  { id: 'none', label: 'بدون نكهة' },
  { id: 'caramel', label: 'كراميل' },
  { id: 'vanilla', label: 'فانيليا' },
  { id: 'chocolate', label: 'شوكولاتة' },
  { id: 'hazelnut', label: 'بندق' },
];

export default function ItemCustomizerModal({ item, onClose, onAddToCart }) {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSugar, setSelectedSugar] = useState('medium');
  const [selectedFlavor, setSelectedFlavor] = useState('none');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [specialNotes, setSpecialNotes] = useState('');

  const isDrink = ['hot_drinks', 'winter_special', 'cold_drinks', 'frappe', 'milkshakes', 'fresh_juices', 'smoothies'].includes(item.category);
  const isCoffee = ['hot_drinks', 'cold_drinks', 'frappe'].includes(item.category);

  const toggleAddon = (addon) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = item.price + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    const customItem = {
      ...item,
      cartItemId: `${item.id}-${Date.now()}`,
      quantity,
      selectedSugar: isDrink ? selectedSugar : null,
      selectedFlavor: isCoffee && selectedFlavor !== 'none' ? selectedFlavor : null,
      selectedAddons,
      specialNotes: specialNotes.trim(),
      calculatedPrice: unitPrice,
      totalPrice,
    };
    onAddToCart(customItem);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content max-w-md p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-white/[0.08]">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#f5f5f7]">
              {item.nameAr}
            </h3>
            <span className="text-xs text-[#71717a]">
              {item.nameEn}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center text-[#a1a1aa]"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4 my-4">
          
          {/* Sugar level selector for drinks */}
          {isDrink && (
            <div>
              <label className="block text-xs font-semibold text-[#a1a1aa] mb-2">
                درجة السكر:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SUGAR_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedSugar(opt.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-right transition border ${
                      selectedSugar === opt.id
                        ? 'bg-[#c5a059] text-[#0b0b0c] border-[#c5a059]'
                        : 'bg-[#161619] border-white/[0.06] text-[#a1a1aa] hover:border-white/[0.15]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Flavor options for coffee/cold drinks */}
          {isCoffee && (
            <div>
              <label className="block text-xs font-semibold text-[#a1a1aa] mb-2">
                نكهة إضافية (اختياري):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {FLAVOR_OPTIONS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedFlavor(f.id)}
                    className={`py-1.5 px-3 rounded-full text-xs font-medium transition border ${
                      selectedFlavor === f.id
                        ? 'bg-[#c5a059] text-[#0b0b0c] font-bold border-[#c5a059]'
                        : 'bg-[#161619] border-white/[0.06] text-[#a1a1aa] hover:border-white/[0.15]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons selection */}
          <div>
            <label className="block text-xs font-semibold text-[#a1a1aa] mb-2">
              إضافات اختيارية:
            </label>

            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {ADDONS_LIST.map((addon) => {
                const isChecked = selectedAddons.some((a) => a.id === addon.id);

                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition ${
                      isChecked
                        ? 'bg-[#c5a059]/10 border-[#c5a059]'
                        : 'bg-[#161619] border-white/[0.05] hover:border-white/[0.12]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isChecked ? 'bg-[#c5a059] border-[#c5a059] text-[#0b0b0c]' : 'border-white/[0.2]'
                      }`}>
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span className="text-xs text-[#f5f5f7]">
                        {addon.nameAr}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-[#c5a059]">
                      +{addon.price} ج.م
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Special Notes */}
          <div>
            <label className="block text-xs font-semibold text-[#a1a1aa] mb-1.5">
              ملاحظة للكابتن:
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="مثال: بدون ثلج، تسوية مقرمشة..."
              className="w-full px-3 py-2 rounded-xl bg-[#161619] border border-white/[0.08] text-xs text-[#f5f5f7] placeholder-[#71717a] focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          {/* Quantity Controls & Confirmation */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
            
            <div className="flex items-center gap-2 bg-[#161619] border border-white/[0.08] rounded-full p-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-6 h-6 rounded-full bg-white/[0.05] flex items-center justify-center text-[#f5f5f7]"
              >
                <Minus size={12} />
              </button>
              <span className="w-5 text-center font-bold text-xs text-[#f5f5f7]">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-6 h-6 rounded-full bg-white/[0.05] flex items-center justify-center text-[#f5f5f7]"
              >
                <Plus size={12} />
              </button>
            </div>

            <button
              onClick={handleConfirm}
              className="btn-gold flex-1 py-2 text-xs font-bold"
            >
              <span>إضافة للطلب</span>
              <span>•</span>
              <span>{totalPrice} ج.م</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
