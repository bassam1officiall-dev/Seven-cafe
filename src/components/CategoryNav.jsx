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
  itemsCountByCategory
}) {
  return (
    <div className="sticky top-16 z-40 bg-[#0d0d10]/95 backdrop-blur-md border-b border-white/[0.08] py-2.5">
      <div className="container-custom space-y-2">
        
        {/* Search Bar - Full Width, Clear, Big Font */}
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن مشروب، قهوة، فطيرة، بيتزا..."
            className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[#16161a] border border-white/[0.1] text-sm text-[#f5f5f7] placeholder-[#71717a] focus:outline-none focus:border-[#c5a059] transition"
          />
          <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#71717a]" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-[#71717a] hover:text-white"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Horizontal Category Navigation Scroll Pills */}
        <div className="category-scroll-container flex items-center gap-2 overflow-x-auto py-1">
          
          {/* All Items */}
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
              activeCategory === 'all'
                ? 'bg-[#c5a059] text-black shadow-sm'
                : 'bg-[#18181c] text-[#a1a1aa] hover:text-[#f5f5f7] border border-white/[0.06]'
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
                    const offset = 140;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = el.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    window.scrollTo({
                      top: elementPosition - offset,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
                  isActive
                    ? 'bg-[#c5a059] text-black shadow-sm'
                    : 'bg-[#18181c] text-[#a1a1aa] hover:text-[#f5f5f7] border border-white/[0.06]'
                }`}
              >
                <IconComponent size={15} className={isActive ? 'text-black' : 'text-[#c5a059]'} />
                <span>{cat.nameAr}</span>
                {count > 0 && (
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-md font-extrabold ${
                    isActive ? 'bg-black text-[#c5a059]' : 'bg-white/[0.08] text-[#8e8e93]'
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
  );
}
