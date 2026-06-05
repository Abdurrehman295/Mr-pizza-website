import { useEffect } from "react";

export default function CartDrawer({ isOpen, onClose, cart, onIncrease, onDecrease, onRemove, total, selectedBranch }) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${isOpen ? "opacity-60 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-gray-950 border-l border-red-900 z-50 flex flex-col transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <h2 className="text-white font-black text-lg" style={{ fontFamily: "'Georgia', serif" }}>
            🛒 Your Cart
            {cart.length > 0 && (
              <span className="ml-2 bg-red-700 text-white text-xs font-bold px-2 py-0.5 rounded-full">{cart.length}</span>
            )}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl transition-colors">✕</button>
        </div>

        {/* Branch indicator */}
        {selectedBranch && (
          <div className="mx-5 mt-3 bg-red-900 bg-opacity-40 border border-red-800 text-red-400 text-xs font-bold px-3 py-2 rounded-lg">
            📍 {selectedBranch}
          </div>
        )}

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🍕</div>
              <p className="text-gray-600 font-bold">Your cart is empty</p>
              <p className="text-gray-700 text-sm mt-1">Add some delicious pizzas!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm">{item.name}</p>
                    <p className="text-red-500 font-black text-sm">PKR {(item.price * item.qty).toLocaleString()}</p>
                    <p className="text-gray-600 text-xs">PKR {item.price.toLocaleString()} each</p>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-gray-600 hover:text-red-500 text-lg transition-colors"
                  >
                    🗑
                  </button>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => onDecrease(item.id)}
                    className="w-8 h-8 rounded-full bg-gray-800 hover:bg-red-800 text-white font-black transition-colors flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-white font-black w-6 text-center">{item.qty}</span>
                  <button
                    onClick={() => onIncrease(item.id)}
                    className="w-8 h-8 rounded-full bg-gray-800 hover:bg-red-800 text-white font-black transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer total */}
        {cart.length > 0 && (
          <div className="px-5 py-5 border-t border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 font-bold">Total</span>
              <span className="text-red-500 font-black text-xl">PKR {total.toLocaleString()}</span>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-red-700 hover:bg-red-600 text-white font-black py-3 rounded-full transition-all duration-200 hover:scale-105"
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
