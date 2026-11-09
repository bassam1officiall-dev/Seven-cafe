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
  SlidersHorizontal
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
  cartItems,
  lang
}) {
  const isAr = lang === 'ar';
  const [feteerSubTab, setFeteerSubTab] = useState('all');

  const filteredCategories = categories.filter((cat) => {
    if (activeCategory !== 'all' && cat.id !== activeCategory) return false;
    return true;
  });

  return (
    <section className="py-10" id="menu-section">
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
            <div key={cat.id} id={`cat-${cat.id}`} className="mb-14 scroll-mt-28">
              
              {/* Calm, Refined Category Header */}
              <div className="mb-6">
                
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/20 flex items-center justify-center text-[#c5a059]">
                    <IconComponent size={16} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#f5f5f7]">
                      {cat.nameAr}
                    </h3>
                  </div>
                  <span className="text-xs text-[#71717a] font-medium mr-2">
                    {cat.nameEn}
                  </span>
                </div>

                {cat.descriptionAr && (
                  <p className="text-xs text-[#a1a1aa] mt-1">
                    {cat.descriptionAr}
                  </p>
                )}

                {/* Feteer Filter Pills (Calm & Clean) */}
                {cat.id === 'feteer_pies' && (
                  <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-white/[0.05]">
                    <button
                      onClick={() => setFeteerSubTab('all')}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                        feteerSubTab === 'all'
                          ? 'bg-[#c5a059] text-[#0b0b0c]'
                          : 'bg-[#161619] text-[#a1a1aa] border border-white/[0.05]'
                      }`}
                    >
                      الكل (33 صنف)
                    </button>
                    
                    <button
                      onClick={() => setFeteerSubTab('savory')}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                        feteerSubTab === 'savory'
                          ? 'bg-[#c5a059] text-[#0b0b0c]'
                          : 'bg-[#161619] text-[#a1a1aa] border border-white/[0.05]'
                      }`}
                    >
                      الحادق (15)
                    </button>

                    <button
                      onClick={() => setFeteerSubTab('sweet')}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                        feteerSubTab === 'sweet'
                          ? 'bg-[#c5a059] text-[#0b0b0c]'
                          : 'bg-[#161619] text-[#a1a1aa] border border-white/[0.05]'
                      }`}
                    >
                      الحلو (11)
                    </button>

                    <button
                      onClick={() => setFeteerSubTab('meshaltet')}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                        feteerSubTab === 'meshaltet'
                          ? 'bg-[#c5a059] text-[#0b0b0c]'
                          : 'bg-[#161619] text-[#a1a1aa] border border-white/[0.05]'
                      }`}
                    >
                      المشلتت (2)
                    </button>
                  </div>
                )}

              </div>

              {/* View Mode 1: Clean Cards View */}
              {viewMode === 'cards' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {categoryItems.map((item) => {
                    const inCartCount = cartItems
                      .filter((ci) => ci.id === item.id)
                      .reduce((sum, ci) => sum + ci.quantity, 0);

                    return (
                      <div
                        key={item.id}
                        className="chic-card p-4 flex flex-col justify-between"
                      >
                        <div>
                          {/* Item Name & Price Row */}
                          <div className="flex items-start justify-between gap-3 mb-1.5">
                            <div>
                              <h4 className="text-sm sm:text-base font-bold text-[#f5f5f7]">
                                {item.nameAr}
                              </h4>
                              <div className="text-[11px] text-[#71717a]">
                                {item.nameEn}
                              </div>
                            </div>

                            <div className="shrink-0 text-left">
                              <span className="text-base font-extrabold text-[#c5a059]">
                                {item.price}
                              </span>
                              <span className="text-[11px] text-[#71717a] mr-1">ج.م</span>
                            </div>
                          </div>

                          {/* Description */}
                          {item.descAr && (
                            <p className="text-xs text-[#a1a1aa] leading-relaxed mb-4">
                              {item.descAr}
                            </p>
                          )}
                        </div>

                        {/* Card Actions */}
                        <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.05] mt-auto">
                          
                          {/* Customize */}
                          <button
                            onClick={() => onOpenCustomizer(item)}
                            className="flex items-center gap-1.5 text-xs text-[#a1a1aa] hover:text-[#f5f5f7] transition"
                          >
                            <SlidersHorizontal size={13} className="text-[#c5a059]" />
                            <span>تخصيص</span>
                          </button>

                          {/* Quick Add Button */}
                          <button
                            onClick={() => onQuickAdd(item)}
                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/[0.06] hover:bg-[#c5a059] hover:text-[#0b0b0c] text-[#f5f5f7] font-semibold text-xs border border-white/[0.08] transition"
                          >
                            <Plus size={13} />
                            <span>طلب</span>
                            {inCartCount > 0 && (
                              <span className="w-4 h-4 rounded-full bg-[#c5a059] text-[#0b0b0c] text-[10px] flex items-center justify-center font-bold">
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
                <div className="chic-card p-3 sm:p-5">
                  <div className="divide-y divide-white/[0.05]">
                    {categoryItems.map((item) => {
                      const inCartCount = cartItems
                        .filter((ci) => ci.id === item.id)
                        .reduce((sum, ci) => sum + ci.quantity, 0);

                      return (
                        <div 
                          key={item.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 px-2 hover:bg-white/[0.02] rounded-lg transition"
                        >
                          <div className="flex items-center flex-grow">
                            <div className="text-right">
                              <span className="text-sm font-bold text-[#f5f5f7]">
                                {item.nameAr}
                              </span>
                              <span className="hidden md:inline-block text-[11px] text-[#71717a] mr-2">
                                ({item.nameEn})
                              </span>
                            </div>

                            <div className="dotted-leader hidden sm:block"></div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-3 mt-1 sm:mt-0 shrink-0">
                            <div className="text-left font-bold text-sm text-[#c5a059]">
                              <span>{item.price}</span>
                              <span className="text-[11px] text-[#71717a] mr-1">ج.م</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => onOpenCustomizer(item)}
                                className="p-1.5 text-xs text-[#a1a1aa] hover:text-[#f5f5f7] rounded hover:bg-white/[0.05]"
                                title="تخصيص"
                              >
                                <SlidersHorizontal size={13} className="text-[#c5a059]" />
                              </button>

                              <button
                                onClick={() => onQuickAdd(item)}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-[#c5a059] hover:text-[#0b0b0c] text-[#f5f5f7] font-semibold text-xs border border-white/[0.08] transition"
                              >
                                <Plus size={12} />
                                <span>طلب</span>
                                {inCartCount > 0 && (
                                  <span className="text-[10px] bg-[#c5a059] text-[#0b0b0c] px-1 rounded-full font-bold">
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
            <p className="text-sm font-bold text-[#f5f5f7] mb-1">لا توجد نتائج مطابقة</p>
            <p className="text-xs text-[#71717a]">جرب البحث عن صنف آخر كالشاي أو اللاتيه أو الفطير</p>
          </div>
        )}

      </div>
    </section>
  );
}
