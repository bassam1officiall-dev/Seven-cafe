import React from 'react';
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
  Search,
  X
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

export default function CategoryNav({ 
  categories, 
  activeCategory, 
  setActiveCategory, 
  searchQuery, 
  setSearchQuery,
  itemsCountByCategory,
  lang 
}) {
  const isAr = lang === 'ar';

  return (
    <div className="sticky top-[57px] z-40 bg-[#0b0b0cf2] backdrop-blur-md border-b border-white/[0.08] py-3 shadow-sm">
      <div className="container-custom">
        
        {/* Search input + Category Pills in one balanced row on desktop */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Calm Search Bar */}
          <div className="relative w-full sm:w-64 shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن مشروب أو أكلة..."
              className="w-full pl-8 pr-9 py-2 rounded-full bg-[#161619] border border-white/[0.08] text-xs text-[#f5f5f7] placeholder-[#71717a] focus:outline-none focus:border-[#c5a059]/60 transition"
            />
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717a]" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a] hover:text-white"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Horizontal Category Navigation Scroll Pills */}
          <div className="category-scroll-container flex items-center gap-1.5 w-full py-0.5">
            
            {/* All Items */}
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-[#c5a059] text-[#0b0b0c]'
                  : 'bg-[#161619] text-[#a1a1aa] hover:text-[#f5f5f7] border border-white/[0.05]'
              }`}
            >
              الكل
            </button>

            {categories.map((cat) => {
              const IconComponent = ICON_MAP[cat.icon] || Coffee;
              const count = itemsCountByCategory[cat.id] || 0;
              const isActive = activeCategory === cat.id;

              return (
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition shrink-0 ${
                    isActive
                      ? 'bg-[#c5a059] text-[#0b0b0c]'
                      : 'bg-[#161619] text-[#a1a1aa] hover:text-[#f5f5f7] border border-white/[0.05]'
                  }`}
                >
                  <IconComponent size={13} className={isActive ? 'text-[#0b0b0c]' : 'text-[#c5a059]'} />
                  <span>{cat.nameAr}</span>
                  {count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-[#0b0b0c] text-[#c5a059]' : 'bg-white/[0.06] text-[#a1a1aa]'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}

          </div>

        </div>

      </div>
    </div>
  );
}
