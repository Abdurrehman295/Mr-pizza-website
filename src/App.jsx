import { useState, useRef } from "react";
import Hero from "./components/Hero";
import BranchSelector from "./components/BranchSelector";
import MenuSection from "./components/MenuSection";
import CartDrawer from "./components/CartDrawer";
import CustomerForm from "./components/CustomerForm";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("");
  const menuRef = useRef(null);

  // Cart total
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // Add item to cart
  const handleAdd = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const handleIncrease = (id) => {
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty: i.qty + 1 } : i));
  };

  const handleDecrease = (id) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item.qty === 1) return prev.filter((i) => i.id !== id);
      return prev.map((i) => i.id === id ? { ...i, qty: i.qty - 1 } : i);
    });
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-black bg-opacity-90 backdrop-blur-sm border-b border-gray-900 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🍕</span>
          <span className="text-white font-black text-lg" style={{ fontFamily: "'Georgia', serif" }}>
            Mr <span className="text-red-600">Pizza</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={scrollToMenu}
            className="hidden sm:block text-gray-400 hover:text-white text-sm font-bold transition-colors"
          >
            Menu
          </button>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white font-black text-sm px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
          >
            <span>🛒</span>
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-red-700 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Page content offset for fixed nav */}
      <div className="pt-14">
        <Hero onOrderNow={scrollToMenu} />
        <BranchSelector selectedBranch={selectedBranch} onSelect={setSelectedBranch} />

        <div ref={menuRef}>
          <MenuSection cart={cart} onAdd={handleAdd} />
        </div>

        <CustomerForm
          cart={cart}
          total={total}
          selectedBranch={selectedBranch}
        />

        <Reviews />
        <Contact />
        <Footer />
      </div>

      {/* Fixed cart FAB on mobile */}
      {cartCount > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-30 bg-red-700 hover:bg-red-600 text-white font-black px-5 py-3 rounded-full shadow-2xl shadow-red-900 flex items-center gap-2 transition-all duration-200 hover:scale-110 sm:hidden"
        >
          <span>🛒</span>
          <span>{cartCount} items</span>
          <span className="text-red-300">·</span>
          <span>PKR {total.toLocaleString()}</span>
        </button>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onRemove={handleRemove}
        total={total}
        selectedBranch={selectedBranch}
      />
    </div>
  );
}
