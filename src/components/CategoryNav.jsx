import React from 'react';

export default function CategoryNav({ 
  categories, 
  activeCategory, 
  setActiveCategory, 
  searchQuery, 
  setSearchQuery 
}) {
  return (
    <div className="sticky top-16 z-40 bg-[#111112]/95 backdrop-blur-md border-b border-white/[0.08]">
      <div className="container-custom">
        <div className="flex items-center justify-between gap-4">
          
          {/* Minimal Text-Only Underline Tabs (Zero Icons, Zero Emojis) */}
          <nav className="flex items-center gap-6 overflow-x-auto scrollbar-none py-0 h-12" aria-label="أقسام المنيو">
            <button
              onClick={() => setActiveCategory('all')}
              className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
            >
              الكل
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  const el = document.getElementById(`cat-${cat.id}`);
                  if (el) {
                    const offset = 120;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = el.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    window.scrollTo({
                      top: elementPosition - offset,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
              >
                <span>{cat.nameAr}</span>
                <span className="font-body text-[11px] text-[#88847c] mr-1 hidden sm:inline">
                  {cat.nameEn}
                </span>
              </button>
            ))}
          </nav>

          {/* Minimal Inline Search */}
          <div className="shrink-0 hidden lg:block">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث في المنيو..."
              className="bg-transparent border-b border-white/[0.12] focus:border-[#c29d68] py-1 text-xs text-[#f0eee9] placeholder-[#55524c] outline-none w-36 transition"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
