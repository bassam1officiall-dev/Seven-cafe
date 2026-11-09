import React, { useState } from 'react';

export default function MenuSection({
  categories,
  items,
  activeCategory,
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
    <section className="py-12" id="menu-section">
      <div className="container-custom">
        
        {filteredCategories.map((cat) => {
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
            <div key={cat.id} id={`cat-${cat.id}`} className="mb-16 scroll-mt-32">
              
              {/* Editorial Category Header */}
              <div className="flex items-baseline justify-between border-b border-white/[0.14] pb-3 mb-6">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-wide text-[#f0eee9]">
                    {cat.nameAr}
                  </h2>
                </div>
                <span className="font-body text-xs uppercase tracking-[0.1em] text-[#88847c]">
                  {cat.nameEn}
                </span>
              </div>

              {cat.descriptionAr && (
                <p className="text-xs sm:text-sm text-[#88847c] mb-6 leading-relaxed">
                  {cat.descriptionAr}
                </p>
              )}

              {/* Minimal Text Subtabs for Feteer */}
              {cat.id === 'feteer_pies' && (
                <div className="flex gap-4 mb-6 border-b border-white/[0.06] pb-2 text-xs">
                  <button
                    onClick={() => setFeteerSubTab('all')}
                    className={`pb-1 border-b transition ${
                      feteerSubTab === 'all'
                        ? 'text-[#f0eee9] font-semibold border-[#c29d68]'
                        : 'text-[#88847c] border-transparent hover:text-[#f0eee9]'
                    }`}
                  >
                    الكل (33 صنف)
                  </button>
                  <button
                    onClick={() => setFeteerSubTab('savory')}
                    className={`pb-1 border-b transition ${
                      feteerSubTab === 'savory'
                        ? 'text-[#f0eee9] font-semibold border-[#c29d68]'
                        : 'text-[#88847c] border-transparent hover:text-[#f0eee9]'
                    }`}
                  >
                    الحادق (15)
                  </button>
                  <button
                    onClick={() => setFeteerSubTab('sweet')}
                    className={`pb-1 border-b transition ${
                      feteerSubTab === 'sweet'
                        ? 'text-[#f0eee9] font-semibold border-[#c29d68]'
                        : 'text-[#88847c] border-transparent hover:text-[#f0eee9]'
                    }`}
                  >
                    الحلو (11)
                  </button>
                  <button
                    onClick={() => setFeteerSubTab('meshaltet')}
                    className={`pb-1 border-b transition ${
                      feteerSubTab === 'meshaltet'
                        ? 'text-[#f0eee9] font-semibold border-[#c29d68]'
                        : 'text-[#88847c] border-transparent hover:text-[#f0eee9]'
                    }`}
                  >
                    المشلتت الفلاحي (2)
                  </button>
                </div>
              )}

              {/* Editorial Two-Column List (No Card Backgrounds) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {categoryItems.map((item) => {
                  const inCartCount = cartItems
                    .filter((ci) => ci.id === item.id)
                    .reduce((sum, ci) => sum + ci.quantity, 0);

                  return (
                    <article key={item.id} className="menu-item-row">
                      
                      {/* Name + Price on the same line */}
                      <div className="flex items-baseline justify-between gap-4 mb-1">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <h3 className="item-name-heading">
                            {item.nameAr}
                          </h3>
                          <span className="item-name-latin">
                            {item.nameEn}
                          </span>
                        </div>

                        <div className="item-price-tag">
                          <span>{item.price}</span>
                          <span className="text-[11px] font-normal text-[#88847c] mr-1">ج.م</span>
                        </div>
                      </div>

                      {/* Description below (max 2 lines) */}
                      {item.descAr && (
                        <p className="text-xs text-[#88847c] leading-relaxed mb-2 line-clamp-2">
                          {item.descAr}
                        </p>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-end gap-3 mt-1">
                        <button
                          onClick={() => onOpenCustomizer(item)}
                          className="text-[11px] text-[#88847c] hover:text-[#f0eee9] transition underline decoration-dotted"
                        >
                          تخصيص
                        </button>

                        <button
                          onClick={() => onQuickAdd(item)}
                          className="btn-editorial-add flex items-center gap-1.5"
                        >
                          <span>إضافة</span>
                          {inCartCount > 0 && (
                            <span className="text-[#c29d68] font-mono font-bold">
                              ({inCartCount})
                            </span>
                          )}
                        </button>
                      </div>

                    </article>
                  );
                })}
              </div>

            </div>
          );
        })}

        {filteredCategories.length === 0 && (
          <div className="text-center py-16 border-t border-white/[0.08]">
            <p className="text-sm text-[#88847c]">لا توجد أصناف مطابقة لبحثك.</p>
          </div>
        )}

      </div>
    </section>
  );
}
