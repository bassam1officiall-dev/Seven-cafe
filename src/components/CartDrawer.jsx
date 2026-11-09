import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  Eye, 
  ShoppingBag,
  MapPin,
  Utensils
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart,
  onOpenWaiterView
}) {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState('dine_in');
  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const totalAmount = cartItems.reduce((sum, item) => {
    const itemPrice = item.calculatedPrice || item.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  const handleWhatsAppCheckout = () => {
    if (orderType === 'dine_in' && !tableNumber.trim()) {
      alert('من فضلك أدخل رقم الطاولة داخل الكافيه');
      return;
    }

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 }
      });
    } catch (e) {}

    let message = `*طلب جديد من منيو 7 SEVEN الديجيتال* ☕✨\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📍 *الفرع:* فرع البدرشين - البدرشين - الجيزة\n`;
    message += `📋 *نوع الطلب:* ${orderType === 'dine_in' ? `داخل الكافيه - طاولة رقم (${tableNumber})` : 'تيك أواي / دليفري'}\n`;
    
    if (customerName.trim()) {
      message += `👤 *العميل:* ${customerName.trim()}\n`;
    }
    if (customerPhone.trim()) {
      message += `📞 *الهاتف:* ${customerPhone.trim()}\n`;
    }
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*تفاصيل الأصناف:*\n\n`;

    cartItems.forEach((item, idx) => {
      const price = item.calculatedPrice || item.price;
      message += `${idx + 1}. *${item.nameAr}* (${item.quantity}×) — ${price * item.quantity} ج.م\n`;
      
      if (item.selectedSugar) {
        const sugarMap = {
          none: 'بدون سكر (سادة)',
          light: 'سكر خفيف',
          medium: 'مظبوط',
          sweet: 'سكر زيادة'
        };
        message += `   • السكر: ${sugarMap[item.selectedSugar] || item.selectedSugar}\n`;
      }
      if (item.selectedFlavor) {
        message += `   • النكهة: ${item.selectedFlavor}\n`;
      }
      if (item.selectedAddons && item.selectedAddons.length > 0) {
        const addonsText = item.selectedAddons.map(a => `${a.nameAr} (+${a.price}ج)`).join(', ');
        message += `   • إضافات: ${addonsText}\n`;
      }
      if (item.specialNotes) {
        message += `   • ملاحظة: ${item.specialNotes}\n`;
      }
      message += `\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *الإجمالي الكلي:* *${totalAmount} جنيه مصري*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `_تم الإرسال عبر المنيو الإلكتروني لكافيه 7 SEVEN_`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/201128586856?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content max-w-md p-5 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#c5a059]" />
            <h3 className="text-sm sm:text-base font-bold text-[#f5f5f7]">
              سلة الطلب ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} صنف)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 px-2 py-0.5 rounded hover:bg-white/[0.04]"
              >
                <Trash2 size={12} />
                <span>مسح</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center text-[#a1a1aa]"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Empty state */}
        {cartItems.length === 0 ? (
          <div className="py-14 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#161619] border border-white/[0.08] flex items-center justify-center text-[#a1a1aa] mb-2.5">
              <ShoppingBag size={20} />
            </div>
            <h4 className="text-sm font-semibold text-[#f5f5f7] mb-1">السلة فارغة</h4>
            <p className="text-xs text-[#71717a]">
              أضف ما تحب من أصناف المنيو للبدء
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto my-3 space-y-2.5 pr-1">
            {cartItems.map((item) => {
              const itemPrice = item.calculatedPrice || item.price;

              return (
                <div
                  key={item.cartItemId || item.id}
                  className="p-3 rounded-xl bg-[#161619] border border-white/[0.05] flex flex-col gap-1.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#f5f5f7]">{item.nameAr}</h4>
                      <span className="text-[10px] text-[#71717a]">{item.nameEn}</span>
                    </div>

                    <span className="text-xs sm:text-sm font-bold text-[#c5a059]">
                      {itemPrice * item.quantity} ج.م
                    </span>
                  </div>

                  {/* Customizations tags */}
                  {(item.selectedSugar || item.selectedFlavor || (item.selectedAddons && item.selectedAddons.length > 0) || item.specialNotes) && (
                    <div className="flex flex-wrap gap-1 text-[10px] text-[#a1a1aa]">
                      {item.selectedSugar && (
                        <span className="bg-white/[0.05] px-1.5 py-0.5 rounded">
                          سكر: {item.selectedSugar === 'medium' ? 'مظبوط' : item.selectedSugar}
                        </span>
                      )}
                      {item.selectedFlavor && (
                        <span className="bg-white/[0.05] px-1.5 py-0.5 rounded">
                          نكهة: {item.selectedFlavor}
                        </span>
                      )}
                      {item.selectedAddons && item.selectedAddons.map((addon) => (
                        <span key={addon.id} className="bg-[#c5a059]/10 text-[#c5a059] px-1.5 py-0.5 rounded">
                          +{addon.nameAr}
                        </span>
                      ))}
                      {item.specialNotes && (
                        <span className="bg-white/[0.05] text-[#d8b772] px-1.5 py-0.5 rounded italic">
                          "{item.specialNotes}"
                        </span>
                      )}
                    </div>
                  )}

                  {/* Quantity and Remove */}
                  <div className="flex items-center justify-between pt-1.5 border-t border-white/[0.04]">
                    <button
                      onClick={() => onRemoveItem(item.cartItemId || item.id)}
                      className="text-[11px] text-[#71717a] hover:text-red-400"
                    >
                      حذف
                    </button>

                    <div className="flex items-center gap-2 bg-[#0b0b0c] border border-white/[0.08] rounded-full px-2 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId || item.id, item.quantity - 1)}
                        className="w-4 h-4 flex items-center justify-center text-[#a1a1aa] hover:text-white"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="w-4 text-center text-xs font-semibold text-[#f5f5f7]">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId || item.id, item.quantity + 1)}
                        className="w-4 h-4 flex items-center justify-center text-[#a1a1aa] hover:text-white"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Order Setup */}
        {cartItems.length > 0 && (
          <div className="pt-3 border-t border-white/[0.08] space-y-3">
            
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('dine_in')}
                className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition border ${
                  orderType === 'dine_in'
                    ? 'bg-[#c5a059] text-[#0b0b0c] border-[#c5a059]'
                    : 'bg-[#161619] text-[#a1a1aa] border-white/[0.05]'
                }`}
              >
                <Utensils size={13} />
                <span>داخل الكافيه</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition border ${
                  orderType === 'takeaway'
                    ? 'bg-[#c5a059] text-[#0b0b0c] border-[#c5a059]'
                    : 'bg-[#161619] text-[#a1a1aa] border-white/[0.05]'
                }`}
              >
                <MapPin size={13} />
                <span>تيك أواي / خارجي</span>
              </button>
            </div>

            {orderType === 'dine_in' ? (
              <div>
                <label className="block text-[11px] font-semibold text-[#a1a1aa] mb-1">
                  رقم الطاولة:
                </label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="مثال: 7 أو قعدة الأوت دور"
                  className="w-full px-3 py-1.5 rounded-xl bg-[#161619] border border-white/[0.08] text-xs text-[#f5f5f7] focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="اسم العميل"
                  className="px-3 py-1.5 rounded-xl bg-[#161619] border border-white/[0.08] text-xs text-[#f5f5f7] focus:outline-none focus:border-[#c5a059]"
                />
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="رقم الهاتف"
                  className="px-3 py-1.5 rounded-xl bg-[#161619] border border-white/[0.08] text-xs text-[#f5f5f7] focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            )}

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#161619] border border-white/[0.05]">
              <span className="text-xs font-semibold text-[#a1a1aa]">الإجمالي:</span>
              <span className="text-base font-bold text-[#c5a059]">{totalAmount} ج.م</span>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleWhatsAppCheckout}
                className="btn-gold w-full py-2.5 text-xs font-bold"
              >
                <MessageCircle size={15} />
                <span>إرسال الطلب لواتساب الكافيه (01128586856)</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenWaiterView({
                    items: cartItems,
                    total: totalAmount,
                    table: tableNumber || "طاولة الضيف",
                    type: orderType
                  });
                }}
                className="btn-outline-gold w-full py-2 text-xs"
              >
                <Eye size={13} className="text-[#c5a059]" />
                <span>عرض الطلب للكابتن (Show to Waiter)</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
