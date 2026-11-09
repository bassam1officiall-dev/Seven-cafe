import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MatchSection from './components/MatchSection';
import CategoryNav from './components/CategoryNav';
import MenuSection from './components/MenuSection';
import ItemCustomizerModal from './components/ItemCustomizerModal';
import CartDrawer from './components/CartDrawer';
import WaiterViewModal from './components/WaiterViewModal';
import ReservationModal from './components/ReservationModal';
import AdminDrawer from './components/AdminDrawer';
import Footer from './components/Footer';

import { 
  CATEGORIES, 
  INITIAL_MENU_ITEMS, 
  INITIAL_MATCH_INFO 
} from './data/menuData';

import { ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [lang, setLang] = useState('ar');
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('seven_view_mode') || 'cards';
  });

  // Items state with localStorage support for Admin price changes
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('seven_menu_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_MENU_ITEMS;
  });

  // Match info with localStorage support
  const [matchInfo, setMatchInfo] = useState(() => {
    const saved = localStorage.getItem('seven_match_info');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_MATCH_INFO;
  });

  // Cart state
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('seven_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  // Navigation and Search state
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState(null);
  const [waiterOrderData, setWaiterOrderData] = useState(null);

  // Auto-detect table query param (e.g. ?table=5)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const table = params.get('table');
    if (table) {
      localStorage.setItem('seven_default_table', table);
    }
  }, []);

  // Persist items
  useEffect(() => {
    localStorage.setItem('seven_menu_items', JSON.stringify(items));
  }, [items]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('seven_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Persist view mode
  useEffect(() => {
    localStorage.setItem('seven_view_mode', viewMode);
  }, [viewMode]);

  // Persist match info
  useEffect(() => {
    localStorage.setItem('seven_match_info', JSON.stringify(matchInfo));
  }, [matchInfo]);

  // Cart item count & total calculation
  const cartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const cartTotal = cartItems.reduce((acc, it) => {
    const p = it.calculatedPrice || it.price;
    return acc + p * it.quantity;
  }, 0);

  // Quick add item to cart directly with defaults
  const handleQuickAdd = (item) => {
    try {
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.85 }
      });
    } catch (e) {}

    const existingIndex = cartItems.findIndex(
      (ci) => ci.id === item.id && !ci.selectedSugar && (!ci.selectedAddons || ci.selectedAddons.length === 0)
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      const newItem = {
        ...item,
        cartItemId: `${item.id}-${Date.now()}`,
        quantity: 1,
        calculatedPrice: item.price,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  // Add customized item to cart
  const handleAddCustomizedItem = (customItem) => {
    try {
      confetti({
        particleCount: 45,
        spread: 50,
        origin: { y: 0.8 }
      });
    } catch (e) {}

    setCartItems([...cartItems, customItem]);
  };

  // Cart operations
  const handleUpdateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems(
      cartItems.map((ci) =>
        (ci.cartItemId || ci.id) === cartItemId ? { ...ci, quantity: newQty } : ci
      )
    );
  };

  const handleRemoveItem = (cartItemId) => {
    setCartItems(cartItems.filter((ci) => (ci.cartItemId || ci.id) !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Admin Price Update
  const handleUpdateItemPrice = (itemId, newPrice) => {
    setItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, price: newPrice } : it))
    );
  };

  const handleResetItems = () => {
    setItems(INITIAL_MENU_ITEMS);
    localStorage.removeItem('seven_menu_items');
  };

  // Items count by category map for pills
  const itemsCountByCategory = items.reduce((acc, it) => {
    acc[it.category] = (acc[it.category] || 0) + 1;
    return acc;
  }, {});

  const handleScrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-[#FFF8E7] flex flex-col selection:bg-[#D4AF37] selection:text-black">
      
      {/* Navbar */}
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        lang={lang}
        setLang={setLang}
      />

      {/* Hero Banner */}
      <Hero
        onOpenReservation={() => setIsReservationOpen(true)}
        onScrollToMenu={handleScrollToMenu}
        lang={lang}
      />

      {/* Outdoor Lounge & Live Match Section */}
      <MatchSection
        matchInfo={matchInfo}
        onOpenReservation={() => setIsReservationOpen(true)}
        lang={lang}
      />

      {/* Sticky Category Bar & Live Search */}
      <CategoryNav
        categories={CATEGORIES}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        itemsCountByCategory={itemsCountByCategory}
        lang={lang}
      />

      {/* Menu Categories & Items Section */}
      <MenuSection
        categories={CATEGORIES}
        items={items}
        activeCategory={activeCategory}
        viewMode={viewMode}
        searchQuery={searchQuery}
        onOpenCustomizer={(item) => setCustomizingItem(item)}
        onQuickAdd={handleQuickAdd}
        cartItems={cartItems}
        lang={lang}
      />

      {/* Footer Hub */}
      <Footer
        onOpenReservation={() => setIsReservationOpen(true)}
        lang={lang}
      />

      {/* Floating Cart Button (shows when items in cart) */}
      {cartCount > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 left-6 z-40 btn-gold text-xs px-4 py-2.5 rounded-full flex items-center gap-2 shadow-lg"
        >
          <ShoppingBag size={15} />
          <span className="font-bold">الطلب ({cartCount})</span>
          <span>•</span>
          <span>{cartTotal} ج.م</span>
        </button>
      )}

      {/* Item Customizer Modal */}
      {customizingItem && (
        <ItemCustomizerModal
          item={customizingItem}
          onClose={() => setCustomizingItem(null)}
          onAddToCart={handleAddCustomizedItem}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenWaiterView={(order) => setWaiterOrderData(order)}
      />

      {/* Show to Waiter Modal */}
      {waiterOrderData && (
        <WaiterViewModal
          orderData={waiterOrderData}
          onClose={() => setWaiterOrderData(null)}
        />
      )}

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Admin Drawer */}
      <AdminDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        items={items}
        onUpdateItemPrice={handleUpdateItemPrice}
        onResetItems={handleResetItems}
        matchInfo={matchInfo}
        onUpdateMatchInfo={setMatchInfo}
      />

    </div>
  );
}
