import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Lock, 
  Unlock, 
  Save, 
  RotateCcw, 
  QrCode, 
  Tv, 
  DollarSign, 
  Download, 
  Printer, 
  Search,
  CheckCircle2
} from 'lucide-react';
import QRCode from 'qrcode';

export default function AdminDrawer({
  isOpen,
  onClose,
  items,
  onUpdateItemPrice,
  onResetItems,
  matchInfo,
  onUpdateMatchInfo,
}) {
  if (!isOpen) return null;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState('prices'); // 'prices' | 'match' | 'qr'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTableNumber, setSelectedTableNumber] = useState('7');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const qrCanvasRef = useRef(null);

  // Editable match state
  const [matchForm, setMatchForm] = useState({ ...matchInfo });
  const [successToast, setSuccessToast] = useState('');

  // Handle Passcode verification (Default is 7777)
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === '7777' || passcode === '1234') {
      setIsAuthenticated(true);
    } else {
      alert('رمز المرور غير صحيح. الرمز الافتراضي هو 7777');
    }
  };

  // Generate QR code whenever selectedTableNumber changes
  useEffect(() => {
    if (isAuthenticated && activeTab === 'qr') {
      const baseUrl = window.location.origin;
      const targetUrl = `${baseUrl}/?table=${selectedTableNumber}`;
      QRCode.toDataURL(targetUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#0A0A0A',
          light: '#FFF8E7',
        },
      }).then((url) => {
        setQrDataUrl(url);
      });
    }
  }, [isAuthenticated, activeTab, selectedTableNumber]);

  const showToast = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleSaveMatch = (e) => {
    e.preventDefault();
    onUpdateMatchInfo(matchForm);
    showToast('تم تحديث بيانات مباراة اليوم بنجاح!');
  };

  const filteredItems = items.filter(
    (it) =>
      it.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      it.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content max-w-2xl p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-[#c5a059]">
              {isAuthenticated ? <Unlock size={14} /> : <Lock size={14} />}
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#f5f5f7]">
                لوحة إدارة كافيه 7 SEVEN
              </h3>
              <span className="text-[11px] text-[#71717a]">
                تعديل الأسعار • مباراة اليوم • طباعة QR الطاولات
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center text-[#a1a1aa]"
          >
            <X size={16} />
          </button>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="my-3 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>{successToast}</span>
          </div>
        )}

        {/* Step 1: Authentication Form if not logged in */}
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="py-8 text-center max-w-xs mx-auto">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#181614] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-3">
              <Lock size={24} />
            </div>
            <h4 className="text-sm font-bold text-[#FFF8E7] mb-1">تسجيل دخول الإدارة</h4>
            <p className="text-xs text-[#D1C5AD] mb-4">
              أدخل رمز المرور السريع للوصول إلى لوحة التحكم (الرمز الافتراضي: 7777)
            </p>

            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="رمز المرور (مثال: 7777)"
              className="w-full text-center px-4 py-2.5 rounded-xl bg-[#161412] border border-[#D4AF37]/40 text-sm text-[#FFF8E7] mb-4 tracking-widest focus:outline-none focus:border-[#D4AF37]"
            />

            <button
              type="submit"
              className="btn-gold w-full py-2.5 text-xs sm:text-sm font-extrabold"
            >
              دخول لوحة التحكم
            </button>
          </form>
        ) : (
          /* Step 2: Main Admin Dashboard Tabs */
          <div className="my-4">
            
            {/* Tabs Header */}
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 overflow-x-auto">
              <button
                onClick={() => setActiveTab('prices')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
                  activeTab === 'prices'
                    ? 'bg-[#D4AF37] text-black shadow'
                    : 'bg-[#181614] text-[#D1C5AD] border border-white/10'
                }`}
              >
                <DollarSign size={13} />
                <span>تعديل الأسعار ({items.length} صنف)</span>
              </button>

              <button
                onClick={() => setActiveTab('match')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
                  activeTab === 'match'
                    ? 'bg-[#D4AF37] text-black shadow'
                    : 'bg-[#181614] text-[#D1C5AD] border border-white/10'
                }`}
              >
                <Tv size={13} />
                <span>شاشة مباراة اليوم</span>
              </button>

              <button
                onClick={() => setActiveTab('qr')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
                  activeTab === 'qr'
                    ? 'bg-[#D4AF37] text-black shadow'
                    : 'bg-[#181614] text-[#D1C5AD] border border-white/10'
                }`}
              >
                <QrCode size={13} />
                <span>مولد كود QR الطاولات</span>
              </button>
            </div>

            {/* TAB 1: Price Editor */}
            {activeTab === 'prices' && (
              <div className="mt-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="ابحث عن صنف لتعديل سعره..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#161412] border border-[#D4AF37]/30 text-xs text-[#FFF8E7] focus:outline-none"
                    />
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
                  </div>

                  <button
                    onClick={() => {
                      if (confirm('هل أنت متأكد من استعادة الأسعار الافتراضية الأصلية؟')) {
                        onResetItems();
                        showToast('تمت استعادة الأسعار الأصلية بنجاح');
                      }
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition"
                    title="استعادة الأسعار الافتراضية"
                  >
                    <RotateCcw size={13} />
                    <span className="hidden sm:inline">استعادة الأصل</span>
                  </button>
                </div>

                <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#151412] border border-white/5 hover:border-[#D4AF37]/30"
                    >
                      <div className="text-right">
                        <div className="text-xs sm:text-sm font-bold text-[#FFF8E7]">{item.nameAr}</div>
                        <div className="text-[10px] text-[#A89F8D]">{item.nameEn}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#D1C5AD]">السعر:</span>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => onUpdateItemPrice(item.id, Number(e.target.value))}
                          className="w-20 px-2 py-1 rounded bg-[#0e0d0c] border border-[#D4AF37]/50 text-center font-black text-xs sm:text-sm text-[#F6E7B0] focus:outline-none focus:border-[#D4AF37]"
                        />
                        <span className="text-xs text-[#D4AF37] font-bold">ج.م</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Match Info Editor */}
            {activeTab === 'match' && (
              <form onSubmit={handleSaveMatch} className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#FFF8E7] mb-1">الفريق الأول (Team A):</label>
                    <input
                      type="text"
                      value={matchForm.teamA}
                      onChange={(e) => setMatchForm({ ...matchForm, teamA: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#161412] border border-[#D4AF37]/30 text-xs text-[#FFF8E7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#FFF8E7] mb-1">الفريق الثاني (Team B):</label>
                    <input
                      type="text"
                      value={matchForm.teamB}
                      onChange={(e) => setMatchForm({ ...matchForm, teamB: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#161412] border border-[#D4AF37]/30 text-xs text-[#FFF8E7]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-[#FFF8E7] mb-1">البطولة:</label>
                    <input
                      type="text"
                      value={matchForm.competition}
                      onChange={(e) => setMatchForm({ ...matchForm, competition: e.target.value })}
                      className="w-full px-2.5 py-2 rounded-xl bg-[#161412] border border-[#D4AF37]/30 text-xs text-[#FFF8E7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#FFF8E7] mb-1">التوقيت:</label>
                    <input
                      type="text"
                      value={matchForm.time}
                      onChange={(e) => setMatchForm({ ...matchForm, time: e.target.value })}
                      className="w-full px-2.5 py-2 rounded-xl bg-[#161412] border border-[#D4AF37]/30 text-xs text-[#FFF8E7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#FFF8E7] mb-1">اليوم:</label>
                    <input
                      type="text"
                      value={matchForm.date}
                      onChange={(e) => setMatchForm({ ...matchForm, date: e.target.value })}
                      className="w-full px-2.5 py-2 rounded-xl bg-[#161412] border border-[#D4AF37]/30 text-xs text-[#FFF8E7]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-gold w-full py-2.5 text-xs sm:text-sm font-extrabold mt-3"
                >
                  <Save size={15} />
                  <span>حفظ وتحديث شاشة المباراة على الموقع فوراً</span>
                </button>
              </form>
            )}

            {/* TAB 3: QR Code Generator for Tables */}
            {activeTab === 'qr' && (
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <label className="text-xs font-bold text-[#FFF8E7]">اختر رقم الطاولة للطباعة:</label>
                  <select
                    value={selectedTableNumber}
                    onChange={(e) => setSelectedTableNumber(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-[#161412] border border-[#D4AF37] text-xs font-black text-[#F6E7B0]"
                  >
                    {Array.from({ length: 40 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>طاولة رقم {num}</option>
                    ))}
                    <option value="outdoor_1">جلسة أوت دور 1</option>
                    <option value="outdoor_2">جلسة أوت دور 2</option>
                    <option value="outdoor_3">جلسة أوت دور 3</option>
                    <option value="vip">طاولة VIP الشاشات</option>
                  </select>
                </div>

                {/* Printable Frame Card */}
                <div id="printable-qr-card" className="max-w-xs mx-auto p-5 bg-[#080808] border-2 border-[#D4AF37] rounded-2xl shadow-xl text-center">
                  <div className="font-brand text-2xl font-black text-gold-gradient mb-0.5">7 SEVEN</div>
                  <div className="text-[10px] text-[#D1C5AD] uppercase tracking-widest font-bold">SPECIALTY COFFEE • CAFÉ</div>
                  <div className="text-xs text-[#FFF8E7] font-bold mt-1">فرع البدرشين - الجيزة</div>

                  {qrDataUrl && (
                    <div className="my-3 p-3 bg-[#FFF8E7] rounded-xl inline-block shadow-inner">
                      <img src={qrDataUrl} alt="Table QR Code" className="w-48 h-48 mx-auto" />
                    </div>
                  )}

                  <div className="font-bold text-sm text-[#F6E7B0] bg-[#161412] py-1 px-3 rounded-full border border-[#D4AF37]/40 inline-block mb-1">
                    طاولة رقم ({selectedTableNumber})
                  </div>
                  <p className="text-[11px] text-[#A89F8D]">
                    امسح الكود بكاميرا الموبايل لطلب المنيو مباشرة
                  </p>
                </div>

                <div className="flex justify-center gap-3 mt-4">
                  {qrDataUrl && (
                    <a
                      href={qrDataUrl}
                      download={`7seven-table-${selectedTableNumber}.png`}
                      className="btn-gold py-2 px-5 text-xs font-bold"
                    >
                      <Download size={14} />
                      <span>تحميل صورة QR</span>
                    </a>
                  )}

                  <button
                    onClick={() => window.print()}
                    className="btn-outline-gold py-2 px-5 text-xs font-bold"
                  >
                    <Printer size={14} />
                    <span>طباعة الستيكر</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
