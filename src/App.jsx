import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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

export default function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('seven_menu_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_MENU_ITEMS;
  });

  const [matchInfo, setMatchInfo] = useState(() => {
    const saved = localStorage.getItem('seven_match_info');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_MATCH_INFO;
  });

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('seven_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState(null);
  const [waiterOrderData, setWaiterOrderData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const table = params.get('table');
    if (table) {
      localStorage.setItem('seven_default_table', table);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('seven_menu_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('seven_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('seven_match_info', JSON.stringify(matchInfo));
  }, [matchInfo]);

  const cartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const cartTotal = cartItems.reduce((acc, it) => {
    const p = it.calculatedPrice || it.price;
    return acc + p * it.quantity;
  }, 0);

  const handleQuickAdd = (item) => {
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

  const handleAddCustomizedItem = (customItem) => {
    setCartItems([...cartItems, customItem]);
  };

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

  const handleUpdateItemPrice = (itemId, newPrice) => {
    setItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, price: newPrice } : it))
    );
  };

  const handleResetItems = () => {
    setItems(INITIAL_MENU_ITEMS);
    localStorage.removeItem('seven_menu_items');
  };

  return (
    <div className="min-h-screen bg-[#111112] text-[#f0eee9] flex flex-col">
      
      {/* 1. Minimal Header */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 2. Editorial Hero */}
      <Hero
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* 3. Text-Only Category Navigation (Underline active state) */}
      <CategoryNav
        categories={CATEGORIES}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 4. Editorial Menu Section (Two-column, no card backgrounds) */}
      <MenuSection
        categories={CATEGORIES}
        items={items}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onOpenCustomizer={(item) => setCustomizingItem(item)}
        onQuickAdd={handleQuickAdd}
        cartItems={cartItems}
      />

      {/* 5. Minimal Footer */}
      <Footer
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* 6. Sticky Minimal Order Tray (Only visible when items in cart) */}
      {cartCount > 0 && !isCartOpen && (
        <aside className="fixed bottom-0 inset-x-0 z-40 bg-[#171719]/96 backdrop-blur-md border-t border-white/[0.12] py-3.5 px-4">
          <div className="container-custom flex items-center justify-between gap-4">
            <div className="flex items-baseline gap-3">
              <span className="text-xs sm:text-sm text-[#88847c]">
                الطلب ({cartCount} أصناف)
              </span>
              <span className="font-body text-base sm:text-lg font-semibold text-[#c29d68]">
                {cartTotal} ج.م
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#c29d68] hover:bg-[#d4b07d] text-[#111112] font-semibold text-xs sm:text-sm py-2 px-5 rounded-sm transition"
            >
              إتمام الطلب عبر واتساب &larr;
            </button>
          </div>
        </aside>
      )}

      {/* Modals */}
      {customizingItem && (
        <ItemCustomizerModal
          item={customizingItem}
          onClose={() => setCustomizingItem(null)}
          onAddToCart={handleAddCustomizedItem}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenWaiterView={(order) => setWaiterOrderData(order)}
      />

      {waiterOrderData && (
        <WaiterViewModal
          orderData={waiterOrderData}
          onClose={() => setWaiterOrderData(null)}
        />
      )}

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

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
