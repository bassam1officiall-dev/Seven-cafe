import React, { useState } from 'react';
import { 
  Coffee, 
  Flame, 
  GlassWater, 
  Citrus, 
  CupSoda, 
  Sparkles, 
  IceCream, 
  Pizza, 
  ChefHat, 
  Apple, 
  PlusCircle, 
  Wind,
  Plus,
  SlidersHorizontal,
  Check
} from 'lucide-react';

const ICON_MAP = {
  Coffee,
  Flame,
  GlassWater,
  Citrus,
  CupSoda,
  Sparkles,
  IceCream,
  Pizza,
  ChefHat,
  Apple,
  PlusCircle,
  Wind,
};

export default function MenuSection({
  categories,
  items,
  activeCategory,
  viewMode,
  searchQuery,
  onOpenCustomizer,
  onQuickAdd,
  cartItems
}) {
  const [feteerSubTab, setFeteerSubTab] = useState('all');

  const filteredCategories = categories.filter((cat) => {
    if (activeCategory !== 'all' && cat.id !== activeCategory) return false;
    return true;
  });

  return (
    <section className="py-6 sm:py-8" id="menu-section">
      <div className="container-custom">
        
        {filteredCategories.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || Coffee;

          let categoryItems = items.filter((item) => item.category === cat.id);
          
          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            categoryItems = categoryItems.filter(
              (item) =>
                item.nameAr.toLowerCase().includes(q) ||
                item.nameEn.toLowerCase().includes(q) ||
                (item.descAr && item.descAr.toLowerCase().includes(q))
            );
          }

          if (cat.id === 'feteer_pies' && feteerSubTab !== 'all') {
            categoryItems = categoryItems.filter((item) => item.subcategory === feteerSubTab);
          }

          if (categoryItems.length === 0) return null;

          return (
            <div key={cat.id} id={`cat-${cat.id}`} className="mb-12 scroll-mt-36">
              
              {/* Category Header - Crisp & Prominent */}
              <div className="mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] shrink-0">
                    <IconComponent size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#f5f5f7]">
                      {cat.nameAr}
                    </h2>
                    <span className="text-xs text-[#8e8e93] font-medium">
                      {cat.nameEn}
                    </span>
                  </div>
                </div>

                {cat.descriptionAr && (
                  <p className="text-xs sm:text-sm text-[#a1a1aa] mt-2">
                    {cat.descriptionAr}
                  </p>
                )}

                {/* Feteer Filter Tabs for Mobile */}
                {cat.id === 'feteer_pies' && (
                  <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-white/[0.08]">
                    <button
                      onClick={() => setFeteerSubTab('all')}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                        feteerSubTab === 'all'
                          ? 'bg-[#c5a059] text-black shadow-sm'
                          : 'bg-[#18181c] text-[#a1a1aa] border border-white/[0.08]'
                      }`}
                    >
                      الكل (33 صنف)
                    </button>
                    
                    <button
                      onClick={() => setFeteerSubTab('savory')}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                        feteerSubTab === 'savory'
                          ? 'bg-[#c5a059] text-black shadow-sm'
                          : 'bg-[#18181c] text-[#a1a1aa] border border-white/[0.08]'
                      }`}
                    >
                      الفطائر الحادقة (15)
                    </button>

                    <button
                      onClick={() => setFeteerSubTab('sweet')}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                        feteerSubTab === 'sweet'
                          ? 'bg-[#c5a059] text-black shadow-sm'
                          : 'bg-[#18181c] text-[#a1a1aa] border border-white/[0.08]'
                      }`}
                    >
                      الفطائر الحلوة (11)
                    </button>

                    <button
                      onClick={() => setFeteerSubTab('meshaltet')}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                        feteerSubTab === 'meshaltet'
                          ? 'bg-[#c5a059] text-black shadow-sm'
                          : 'bg-[#18181c] text-[#a1a1aa] border border-white/[0.08]'
                      }`}
                    >
                      المشلتت الفلاحي (2)
                    </button>
                  </div>
                )}
              </div>

              {/* View Mode 1: Cards View (Mobile Optimized: Large readable fonts) */}
              {viewMode === 'cards' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {categoryItems.map((item) => {
                    const inCartCount = cartItems
                      .filter((ci) => ci.id === item.id)
                      .reduce((sum, ci) => sum + ci.quantity, 0);

                    return (
                      <div
                        key={item.id}
                        className="chic-card p-4 sm:p-5 flex flex-col justify-between hover:border-[#c5a059]/40 transition"
                      >
                        <div>
                          {/* Item Name & Price (Big and Clear) */}
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div>
                              <h3 className="text-base sm:text-lg font-extrabold text-[#f5f5f7] leading-snug">
                                {item.nameAr}
                              </h3>
                              <div className="text-xs text-[#8e8e93] font-medium mt-0.5">
                                {item.nameEn}
                              </div>
                            </div>

                            <div className="shrink-0 text-left">
                              <span className="text-lg sm:text-xl font-black text-[#c5a059]">
                                {item.price}
                              </span>
                              <span className="text-xs text-[#8e8e93] font-bold mr-1">ج.م</span>
                            </div>
                          </div>

                          {/* Description with readable font */}
                          {item.descAr && (
                            <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed mb-4">
                              {item.descAr}
                            </p>
                          )}
                        </div>

                        {/* Card Actions: Big Touch Targets */}
                        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] mt-auto">
                          
                          {/* Customize Button */}
                          <button
                            onClick={() => onOpenCustomizer(item)}
                            className="flex items-center gap-1.5 py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-[#a1a1aa] hover:text-[#f5f5f7] transition"
                          >
                            <SlidersHorizontal size={14} className="text-[#c5a059]" />
                            <span>تخصيص</span>
                          </button>

                          {/* Big Add Button */}
                          <button
                            onClick={() => onQuickAdd(item)}
                            className="flex items-center gap-1.5 py-2 px-4 rounded-xl bg-[#c5a059] text-black font-extrabold text-xs sm:text-sm shadow-sm active:scale-95 transition"
                          >
                            <Plus size={16} strokeWidth={3} />
                            <span>طلب</span>
                            {inCartCount > 0 && (
                              <span className="w-5 h-5 rounded-full bg-black text-[#c5a059] text-xs flex items-center justify-center font-black mr-1">
                                {inCartCount}
                              </span>
                            )}
                          </button>

                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                /* View Mode 2: Clean Classic List View */
                <div className="chic-card p-4 sm:p-5">
                  <div className="divide-y divide-white/[0.06]">
                    {categoryItems.map((item) => {
                      const inCartCount = cartItems
                        .filter((ci) => ci.id === item.id)
                        .reduce((sum, ci) => sum + ci.quantity, 0);

                      return (
                        <div 
                          key={item.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between py-3 px-2 hover:bg-white/[0.02] rounded-xl transition"
                        >
                          <div className="flex items-center flex-grow">
                            <div className="text-right">
                              <span className="text-base font-extrabold text-[#f5f5f7]">
                                {item.nameAr}
                              </span>
                              <span className="hidden md:inline-block text-xs text-[#8e8e93] mr-2">
                                ({item.nameEn})
                              </span>
                            </div>

                            <div className="dotted-leader hidden sm:block"></div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-3 mt-1.5 sm:mt-0 shrink-0">
                            <div className="text-left font-black text-base sm:text-lg text-[#c5a059]">
                              <span>{item.price}</span>
                              <span className="text-xs text-[#8e8e93] font-bold mr-1">ج.م</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onOpenCustomizer(item)}
                                className="p-2 text-xs text-[#a1a1aa] hover:text-[#f5f5f7] rounded-xl bg-white/[0.04]"
                                title="تخصيص"
                              >
                                <SlidersHorizontal size={14} className="text-[#c5a059]" />
                              </button>

                              <button
                                onClick={() => onQuickAdd(item)}
                                className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl bg-[#c5a059] text-black font-extrabold text-xs transition"
                              >
                                <Plus size={14} strokeWidth={3} />
                                <span>طلب</span>
                                {inCartCount > 0 && (
                                  <span className="text-xs bg-black text-[#c5a059] px-1.5 py-0.2 rounded-full font-black">
                                    {inCartCount}
                                  </span>
                                )}
                              </button>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          );
        })}

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 chic-card max-w-sm mx-auto">
            <p className="text-base font-bold text-[#f5f5f7] mb-1">لا توجد نتائج مطابقة</p>
            <p className="text-xs text-[#8e8e93]">جرب البحث عن صنف آخر كالشاي أو اللاتيه أو الفطير</p>
          </div>
        )}

      </div>
    </section>
  );
}
